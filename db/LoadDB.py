# -*- coding: utf-8 -*-

'''
Created on Nov 21, 2018

@module: 
@author: Allan

Description: 
'''
import sys
import re
import MySQLdb

'''
 * Format of file:
 *         Row 1: 'Table',TableName
 *         Row 2: 'ConstraintTable','ConstraintField','ConstraintEquivalent','ColumnConstrained'
 *         Row 3-n: TableName,FieldName,TableColumnConstrained
 *         Row n+1: 'Data'
 *         Row n+2: table-column-names, one per column
 *         Row n+3-<end>: Values of table to be inserted/updated
 *      Row ??   'End' (sortof optional;  if we reach EOF, we'll end
 *      
 * 1. we look for the row w/"Table" in the first column and extract the 
 *    name of the table into which we are going to add this data
 * 2. Then we look for "ConstraintTable" in the first column.  This is the
 *    indicator that the next rows contain the constraint fields.  These are
 *    what defines the where clause of the insert SQL.  Each constraint row
 *    should generate a where clause like:
 *    ... <column constrained> = (select <constraint field> from <Constraint Table> 
 *                                where <constraint equivalent> = 
 *                                [value contained in data field for <column constrained>])
 *    (where the <...> indicates the field, and the [...] says what it is)
 *    NB: we only match on 'ConstraintTable', the fields after are ignored
 * 3. Before we process a constraint line, we look for "Data" in column 0.  If we
 *    find it, then we're done w/constraints and we can start the data.
 * 4. First we get the column names.
 * 5. And now we get the data.  We build the insert for the data and execute it
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
    crsr.execute(dataTypeQuery)
    results = crsr.fetchall()
#    print (results)
    first = results[0]
    dataType = first[0]
    crsr.close()
    return dataType


def AddWhereClause( constraints, columnIndex, data )  :
    rtn = ""
    # var_dump(data);
    # var_dump(columnIndex);
    
    if len(constraints) > 0 :
        delim = " where "
#       constraint (cx) =  table, field, equiv, col, index 
        for k, cx in constraints.items() :
            print( cx )

            index = columnIndex[cx[3]]
            dataVal = data[index]
            if dataVal != "" :
                rtn = rtn + "{}t{}.{} = (select {}".format(delim,cx[4],cx[1],cx[1])
                rtn = rtn + " from {} where {} =".format(cx[0],cx[2])
                if GetDataType(cx[0],cx[2])=="char" :
                    rtn = rtn + "\"" + dataVal + "\")"
                else :
                    rtn = rtn + "{} )".format(dataVal,)
                delim = " and "
#    print("WhereClause: "+ rtn )
    return rtn;


row = 1;
text = ( "Table", "ConstraintTable", "Data", "x", "End" );

config = {
  "user": "oms",
  "passwd": "omsx",
  "host": "127.0.0.1",
  "db": "oms",
  "use_unicode": True
}

cnx = MySQLdb.connect(**config)
crsr = cnx.cursor()

args = sys.argv
#print( args )

file = open(args[1], "r")
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
#            print (data)

#           unset(c);
#             ( table, field, equiv, col, index 
            
            c = ( data[0], data[1], data[2], data[3], len(constraints) )
            constraints[ data[3] ] = c

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
                    index = columnIndex[cx[3]]
                    if data[index] != "" :
                        selectFrom = selectFrom + "{} {} t{}".format(delim,cx[0],cx[4])
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

            for k, col in columns.items() :
#                print ("key, Col: "+k+","+col[0])
                colName = col[0]
                dataValue = data[columnIndex[colName]]
                if dataValue != "" :
                    if colName in constraints :
                        insQuery = insQuery + delim + " t" + "{}".format(constraints[colName][4],) 
                        insQuery = insQuery + "." + constraints[colName][1]
                        insQuery = insQuery + " " + colName
                    else :
                        if col[1] == "char" or col[1] == "varchar" :
                            insQuery = insQuery + delim + "\"" + data[ndx] + "\""
                        elif col[1] == "date" or col[1] == "time" or col[1] == "timestamp" :
                            insQuery = insQuery + delim + "\"" + data[ndx] + "\""
                        else :
                            insQuery = insQuery + delim + "{}".format(data[ndx],)

                delim = ","
                ndx = ndx + 1
                
            insQuery = insQuery + selectFrom
            insQuery = insQuery + AddWhereClause( constraints, columnIndex, data )
            print(insQuery)
#                insSet = connection->query(insQuery)
#                if insSet :
#                    print(" -- True {connection->affected_rows} row(s) inserted\n\n")
#                else :
#                    print(" -- False\n\n")
                
print ("{} data rows processed\n".format(noDataRows))
#print ("{} processed\n".format(noRows))
file.close()
    



