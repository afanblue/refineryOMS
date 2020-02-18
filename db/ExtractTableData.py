# -*- coding: utf-8 -*-

'''
Created on Oct 11, 2019

ExtractTableData.py extracts the data from a table provided in parameter 2
and saves it to a file whose name is given in parameter 3 using DB password
given in parameter 1

@author: Allan
'''
import sys
import re
import mariadb

# Function definition is here

def addData( crsr, tbl, qry, hdr, prt ) :
    print ("Extracting {}".format(tbl))
    tblFile = open(tbl+".csv", "w")
    for item in hdr :
        tblFile.write(item+"\n")
    
    crsr.execute(qry)
    flds = crsr.description
    sep = ""
    for fld in flds:
        tblFile.write("{}{}".format(sep,fld[0]))
        sep = ","
    tblFile.write("\n")
    results = crsr.fetchall()
    if prt :
        print ( results )
    for row in results:
        sep = ""
        for item in row:
            tblFile.write("{}{}".format(sep,item))
            sep = ","
        tblFile.write("\n")
    tblFile.write("End")
    tblFile.close()
    return

args = sys.argv
#print( args )

config = {
  "user": "oms",
  "password": args[1],
  "host": "127.0.0.1",
  "database": "oms",
  "charset": "UTF-8"
}

cnx = mariadb.connect(**config)
crsr = cnx.cursor()


refColQuery = "select column_name, data_type, character_maximum_length " 
refColQuery += "from INFORMATION_SCHEMA.COLUMNS "
refColQuery += "where table_name=\""
refColQuery += args[2]
refColQuery += "\""
refColQuery += " and column_name not in (\"create_dt\",\"last_modified_dt\")" 
print ( refColQuery,"\n") 
crsr.execute(refColQuery);
delim = ""
columnList = ""
results = crsr.fetchall()
for row in results:
    columnList = columnList + delim + row[0]
    delim = ","

print( columnList,"\n" )
dataQuery = "select "+columnList+" from "+args[2]
print( dataQuery,"\n" )
crsr.execute(dataQuery)
tableList = crsr.fetchall()
print( "File ",args[3],"\n" )
tblFile = open(args[3], "w")
for tableRow in tableList:
    sep = ""
    for item in tableRow:
        tblFile.write("{}{}".format(sep,item))
        sep = ","
    tblFile.write("\n")

tblFile.close()
