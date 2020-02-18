# -*- coding: utf-8 -*-

'''
Created on Apr 1, 2019

@author: Allan

Running:
    WSmonitor <file> <timeFormat>
    WSmonitor acurite.txt "%d-%m-%Y %I:%M:%S %p"
Description:
    Get the current time
    open the 
'''

import sys
import os
import datetime
import re
from dateutil.parser import parse
import smtplib
import mariadb
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

'''import csv'''

args = sys.argv
#print( args )

timeFormat = '%m/%d/%Y %I:%M:%S %p'
#print( "no args = {} ".format(len(args)))
#print( "args[0] = {}".format(args[0]))
#print( "args[1] = {}".format(args[1]))
if len(args) > 2 : 
    timeFormat = args[2]

currentTime = datetime.datetime.now()
csvDataFile = open(args[1],"r")
lastLine = csvDataFile.readlines()[-1]
#print( "lastLine {}".format(lastLine))

data = re.split(',|\n',lastLine)
#print( "lastTime is {}".format(data[0]) )
lt = data[0].replace("\"","")
#print( "lastTime is {}".format(lt) )
#print( "currentTime is {}".format(currentTime.strftime(timeFormat)) )
lastTime = parse(lt)

timeDiff = (currentTime - lastTime).total_seconds()

#print( "Diff: {}".format(timeDiff) )

if timeDiff > 3600 :
    config = { "user": "oms", "password": "omsx", "host": "127.0.0.1"
              , "database": "oms", "charset": "UTF-8" }
    cnx = mariadb.connect(**config)
    dataTypeQuery = ("select item_name, item_value from config" 
                     " where item_name like 'SMTP%' or item_name like 'EMAIL%'")
#    print (dataTypeQuery)
    crsr = cnx.cursor()
    crsr.execute(dataTypeQuery)
    results = crsr.fetchall()
#    print (results)
    first = results[0]
    dataType = first[0]
    crsr.close()
    pDict = dict(results)
    server = smtplib.SMTP(pDict['SMTP_HOST'], pDict['SMTP_PORT'])
    server.login(pDict['EMAIL_USER'], pDict['EMAIL_PWD'])
    msgText = "\nNo weather report since {} ".format(lastTime.strftime(timeFormat))
    msg = MIMEMultipart()
    msg['From'] = pDict['EMAIL_FROM']
    msg['To'] = pDict['EMAIL_FROM']
    msg['Subject'] = 'AcuRite not responding'
    msg.attach(MIMEText(msgText,'plain'))
    text = msg.as_string()
    
    server.sendmail(pDict['EMAIL_FROM'],pDict['EMAIL_FROM'],text)
    os.environ['WS_OK'] = "N"
