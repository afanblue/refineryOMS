# -*- coding: utf-8 -*-

'''
Created on Nov 21, 2018

@module: 
@author: Allan

Description: 

Load the csv file into the oms DB 
'''
import sys
import re
import MySQLdb

'''
 * Format of file:
 *         Row 1: 'Table',TableName
 *         Row 2: 'ColumnConstrained','ConstraintTable','ConstraintField','ConstraintEquivalent', '2ndTable','2ndField','2ndEquivalence'
 *         Row 3-n: TableName,FieldName,TableColumnConstrained
 *         Row n+1: 'Data'
 *         Row n+2: table-column-names, one per column
 *         Row n+3-<end>: Values of table to be inserted/updated
 *      Row ??   'End' (sortof optional;  if we reach EOF, we'll end
 *      
 * 1. we look for the row w/"Table" in the first column and extract the 
 *    name of the table into which we are going to add this data
 * 2. Then we look for "ColumnConstrained" in the first column.  This is the
 *    indicator that the next rows contain the constraint fields.  These are
 *    what defines the where clause of the insert SQL.
 *  
 *      Each constraint row should generate a where clause like:
 *      ... <column constrained> = (select <constraint field> from <Constraint Table> 
 *                                where <constraint equivalent> = 
 *                                [value contained in data field for <column constrained>])
 *                                and <2nd field> from <2nd table> where <2nd Equiv>
 *                                [value contained in data field for <2nd c
 *      (where the <...> indicates the field, and the [...] says what it is)
 *    
 *    NB: we only match on 'ColumnConstrained', the fields after are ignored
 * 3. Before we process a constraint line, we look for "Data" in column 0.  If we
 *    find it, then we're done w/constraints and we can start the data.
 * 4. First we get the column names.
 * 5. And now we get the data.  We build the insert for the data and execute it.
 *      If there is a 2nd set of constraint data, it will be contained in the field after
 *      a "pipe" sign (|).
 * 6. Of course, we're now looking for 'End' in column 0.  Putting an 'End' allows us
 *    to keep additional content at the end
 * 7. And finally, we're always looking for '--' in the first column, which signifies a 
 *    comment.
'''

def GetDataType( tableName, colName) :
    global cnx;
    dataTypeQuery = ("select data_type, character_maximum_length from INFORMATION_SCHEMA.COLUMNS"
                     " where column_name = \""+colName+"\" and table_name = \""+tableName+"\"")
#    print (dataTypeQuery)
    crsr = cnx.cursor()
    dataType = 0
    try :
        crsr.execute(dataTypeQuery)
        results = crsr.fetchall()
#         print (results)
        first = results[0]
        dataType = first[0]
    except :
        print("GetDataType failed for ",tableName,".",colName)
    crsr.close()
    return dataType

def FormatField( tbl, fld, dataVal )  :
    rtn = ""
    if GetDataType(tbl,fld)=="char" :
        rtn = rtn + "\"" + dataVal + "\""
    else :
        rtn = rtn + "{} ".format(dataVal,)
    return rtn;
        

def AddConstraintQuery( cx, data ) :
    rtn = ""
    cv = data.split('|')
#    print(cv)
#    print(cx)
    if( len(cv) == 1 ) :
        rtn = rtn + FormatField(cx[2],cx[4],data)
    else :
        rtn = rtn + FormatField(cx[2],cx[4],cv[0])
        rtn = rtn + " and {} = \"{}\"".format( cx[6], cv[1] )
    return rtn
    

def AddWhereClause( constraints, columnIndex, data )  :
    rtn = ""
    # var_dump(data);
    # var_dump(columnIndex);
    
    if len(constraints) > 0 :
        delim = " where "
#       constraint (cx) =  index, col, table, field, equiv,  
        for k, cx in constraints.items() :
#            print( cx )

            index = columnIndex[cx[0]]
            dataVal = data[index]
            if dataVal != "" :
                rtn = rtn + "{}t{}.{} = (select {}".format(delim,cx[1],cx[3],cx[3])
                rtn = rtn + " from {} where {} =".format(cx[2],cx[4])
                rtn = rtn + AddConstraintQuery( cx, dataVal )
                rtn = rtn + ")"
                delim = " and "
#    print("WhereClause: "+ rtn )
    return rtn;

args = sys.argv
#print( args )


row = 1;
text = ( "Table", "ColumnConstrained", "Data", "x", "End" );

config = {
  "user": "oms",
  "passwd": args[1],
  "host": "127.0.0.1",
  "db": "oms",
  "use_unicode": True
}

cnx = MySQLdb.connect(**config)
crsr = cnx.cursor()

file = open(args[2], "r")
looking = 0
found = -1
noRows = 0;
noDataRows = 0
constraints = {}
columns = {} 
columnIndex = {}
    
for line in file :
    noRows = noRows + 1
    data = re.split(',|\n',line)
#    print( data )
    
    if data[0] == "--" :
        print ("Found a comment")
        # a comment; just ignore this
    elif data[0] == text[0] :
        # found the first row, extract the table name
#        print ("Found table name: "+data[1])
        found = looking
        table = data[1]
        looking = 1
    elif data[0] == text[1] :
 #       print ("Found constraint header info")
        # found the constraint table info header
        found = looking
        looking = 2
    elif data[0] == text[2] :
#        print ("Finished constraints: "+text[2])
#        print ( constraints )
        # finished up the constraints, found the Data header
        found = looking
        ''' which we'll never find! '''
        looking = 3
    elif data[0] == text[4]:
#        print ("found end")
        # found end; quit.
        break
    else :
        if looking == 2 :
            # get the constraint
#            print ("found a constraint...")
#            print (len(constraints),"   ",data)
#            0 = field constrained
#            1 = table used in constraint
#            2 = field used in constraint
#            3 = constraint equivalence
#            So field constrained <0> = select <2> from <1> where <3> =  
            nc = len(constraints)
            if  len(data) < 7 :
                c = ( data[0], nc, data[1], data[2], data[3] )
            else :
                c = ( data[0], nc, data[1], data[2], data[3], data[4], data[5], data[6] )
            nc = c[0]
            constraints[ nc ] = c

        elif looking == 3 :
#            print ("found data columns, show constraints (next)")
            # get the column names
            ndx = 0
            for col in data :
#                print (col)
                if col != "" and col != "\n" :
                    dataType = GetDataType(table,col)
                    c = ( col, dataType, len(columns) )
                    columnIndex[col] = len(columns)
                    columns[col] = c
             
            found = looking
#            print("Columns")
#            print(columns)
#            print("End columns")
            looking = 4
        elif looking == 4 :
#            print ("found data: "+line)
            # as long as we're looking for "End", we've got data
            noDataRows = noDataRows + 1
            if len(constraints) == 0 :
                selectFrom = " from dual"
            else :
                selectFrom = " from "
                delim = ""
                for k, cx in constraints.items() :
#                    print (cx)
                    index = columnIndex[cx[0]]
                    if data[index] != "" :
                        selectFrom = selectFrom + "{} {} t{}".format(delim,cx[2],cx[1])
                        delim = ", "
                    
                if selectFrom == " from " :
                    selectFrom = selectFrom + "dual "
                
            insQuery = "insert into " + table + " ("
            delim = ""
            for k, col in columns.items() :
#                print (col)
                # if there's data add it.  otherwise skip the field
                if col[0] != "" :
                    insQuery = insQuery + delim + col[0]
                    delim = ","
                    
            insQuery = insQuery + ") select"
            delim = " "
            ndx = 0
#            print("selectFrom: ",selectFrom)

            for k, col in columns.items() :
#                print ("key, Col: "+k+","+col[0])
                colName = col[0]
                dataValue = data[columnIndex[colName]]
                if dataValue != "" :
#                    print("colName: ",colName)
#                    print(constraints)
                    if colName in constraints :
                        insQuery = insQuery + delim + " t" + "{}".format(constraints[colName][1],) 
                        insQuery = insQuery + "." + constraints[colName][3]
                        insQuery = insQuery + " " + colName
                    else :
                        if data[ndx] == "null" :
                            insQuery = insQuery + delim + "null"
                        else :
                            cv = data[ndx].split("|")
                            if col[1] == "char" or col[1] == "varchar" :
                                insQuery = insQuery + delim + "\"" + cv[0] + "\""
                            elif col[1] == "date" or col[1] == "time" or col[1] == "timestamp" :
                                insQuery = insQuery + delim + "\"" + cv[0] + "\""
                            else :
                                insQuery = insQuery + delim + "{}".format(cv[0],)
                else :
                    insQuery = insQuery + delim + "null"
                    
                delim = ", "
                ndx = ndx + 1
#                print(insQuery)
                
            insQuery = insQuery + selectFrom
#            print("insQuery: ",insQuery)
            insQuery = insQuery + AddWhereClause( constraints, columnIndex, data )
            print("insQuery: ",insQuery)
            try:
                insSet = crsr.execute(insQuery)
                cnx.commit()
                if insSet :
                    print(" -- True {} row(s) inserted\n".format(crsr.rowcount))
                else :
                    print(" -- False\n\n")
            except: 
                print("Error ",sys.exc_info()[0]," row {}\n".format(noDataRows))
                
print ("{} data rows processed\n".format(noDataRows))
#print ("{} processed\n".format(noRows))
file.close()
    



