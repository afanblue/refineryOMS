# -*- coding: utf-8 -*-

'''
Created on Nov 21, 2018

@author: Allan
'''
# import os, sysconfig
import sys
import mysql.connector

args = sys.argv
#print( args )

config = {
  "user": "oms",
  "password": args[1],
  "host": "127.0.0.1",
  "charset": "utf8",
  "database": "oms"
}

cnx = mysql.connector.connect(**config)
crsr = cnx.cursor()


refColQuery = ("select column_name, data_type, character_maximum_length "
               "from INFORMATION_SCHEMA.COLUMNS"
	           " where table_name = \"reference_code\""
	           " and column_name not in (\"create_dt\",\"last_modified_dt\")")
#	print ( dataTypeQuery+"\n") 
crsr.execute(refColQuery);

delim = ""
columnList = ""
results = crsr.fetchall()
for row in results:
    columnList = columnList + delim + row[0]
    delim = ","


vwQueryTemplate = ("create or replace view vwx(colList) as select colList from reference_code "
		           "where category = \"catx\" order by name")
catQuery = "select distinct category from reference_code"
crsr.execute(catQuery)
catList = crsr.fetchall()
for cat in catList:
	category = cat[0]

	vwName = category.replace("-","_").lower()+"_vw"
	vwQuery = (vwQueryTemplate.replace( "catx", category)
				 		      .replace( "colList" , columnList)
						      .replace( "vwx", vwName ) )
	print( vwQuery+"\n")
#	crsr.execute(vwQuery) 



