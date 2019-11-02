@echo off
::   CheckTableLoad.bat db-pwd table-name {siteName}
::
:: This file is intended to be used for validating that the LoadDB.py 
:: correctly loads a table, or 

set req="T"
if "%1" == "" set req="F"
if "%2" == "" set req="F"
 
if %req% equ "F" (
    echo Usage:  "CheckTableLoad.bat dbPassword tableName siteName"
    echo    or:  "CheckTableLoad.bat dbPassword tableName siteName >db.log 2>&1"
    goto end
)

if "%3" == "" (
    set siteName="DelawareCity"
) else (
    set siteName=%2
)
rem Extract table contents to file 1
python ExtractTableData.py %1 %2 %2.bgn

rem get count of rows in table
mysql -uoms -p%1 -Doms --execute="select count(*) from %2"

rem  Delete table contents
mysql -uoms -p%1 -Doms --execute="truncate %2"

rem  Load table
python LoadDB.py %1 data/%siteName%/%2.csv

rem  Extract table to file 2
python ExtractTableData.py %1 %2 %2.end

rem get count of rows in table
mysql -uoms -p%1 -Doms --execute="select count(*) from %2"

rem  Compare
sdiff %2.bgn %2.end

:end