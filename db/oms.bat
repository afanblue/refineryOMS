@echo off
rem 
rem  Usage:  oms.bash  dbPassword siteName
rem 
rem  Currently the only siteName is DelawareCity
rem 

if "%1" == "" (
    echo Usage:  "oms.bat dbPassword siteName"
    echo    or:  "oms.bat dbPassword siteName >db.log 2>&1"
    exit /B
)

if "%2" == "" (
    set siteName="DelawareCity"
) else (
    set siteName=%2
)
echo %1 - %siteName%

rem  create the base tables
mysql -u'oms' --password=%1 --execute="source oms.ddl" -Doms
rem create the views
mysql -u'oms' --password=%1 --execute="source views.ddl" -Doms

rem  load config table
echo Load configuration table data
python LoadDB.py data/%siteName%/config.csv

rem  load reference_code table
echo Load reference table data
python LoadDB.py data/%siteName%/reference_code.csv

rem  create reference code views
python BuildRefCodeViews.py

rem  load unit types
python LoadDB.py data/%siteName%/unit_type.csv

rem  load units
python LoadDB.py data/%siteName%/unit.csv

rem  load unit conversions
python LoadDB.py data/%siteName%/unit_conversion.csv

rem  load users
python LoadDB.py data/%siteName%/user.csv

rem  load privileges
python LoadDB.py data/%siteName%/privilege.csv

rem  load pages
python LoadDB.py data/%siteName%/page.csv

rem  load roles
python LoadDB.py data/%siteName%/roleParent.csv
python LoadDB.py data/%siteName%/role.csv

rem  load menus
python LoadDB.py data/%siteName%/menuAdmin.csv
python LoadDB.py data/%siteName%/menu.csv

rem  load role-privs
python LoadDB.py data/%siteName%/role_priv.csv

rem  load user roles
python LoadDB.py data/%siteName%/user_role.csv

REM -- archaic mysql -u'oms' --password=%1 --execute="source omsData.ddl" -Doms

rem  load tag types
python LoadDB.py data/%siteName%/tag_type.csv

rem  load alarm messages
python LoadDB.py data/%siteName%/alarm_message.csv

rem  load alarm types
python LoadDB.py data/%siteName%/alarm_type.csv

rem load customers
python LoadDB.py data/%siteName%/customer.csv

echo ------------------------------------------------------

rem  load tag collection
python LoadDB.py data/%siteName%/tag.csv

rem rem  load analog inputs
python LoadDB.py data/%siteName%/analog_input.csv

rem  load digital inputs
python LoadDB.py data/%siteName%/digital_input.csv

rem  load analog outputs
python LoadDB.py data/%siteName%/analog_output.csv

rem  load digital outputs
python LoadDB.py data/%siteName%/digital_output.csv

rem  load calculated
python LoadDB.py data/%siteName%/calculated.csv

rem  load tanks
python LoadDB.py data/%siteName%/tank.csv

rem  load fields
python LoadDB.py data/%siteName%/field.csv

rem  load containers
python LoadDB.py data/%siteName%/container.csv

rem  load tag relationships
python LoadDB.py data/%siteName%/rel_tag_tag.csv

rem  load hotspots
python LoadDB.py data/%siteName%/hot_spot.csv

rem  load volumes
python LoadDB.py data/%siteName%/volume.csv

rem  load transfers
python LoadDB.py data/%siteName%/transfer.csv

rem  set the initial values for the analog inputs
mysql -u'oms' --password=%1 --execute="source omsStart.sql" -Doms
echo END!


