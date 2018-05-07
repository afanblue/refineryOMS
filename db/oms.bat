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
php loadDB.php data/%siteName%/config.csv

rem  load reference_code table
echo Load reference table data
php loadDB.php data/%siteName%/reference_code.csv

rem  create reference code views
php buildRefCodeViews.php

rem  load unit types
php loadDB.php data/%siteName%/unit_type.csv

rem  load units
php loadDB.php data/%siteName%/unit.csv

rem  load unit conversions
php loadDB.php data/%siteName%/unit_conversion.csv

rem  load users
php loadDB.php data/%siteName%/user.csv

rem  load privileges
php loadDB.php data/%siteName%/privilege.csv

rem  load pages
php loadDB.php data/%siteName%/page.csv

rem  load roles
php loadDB.php data/%siteName%/roleParent.csv
php loadDB.php data/%siteName%/role.csv

rem  load menus
php loadDB.php data/%siteName%/menuAdmin.csv
php loadDB.php data/%siteName%/menu.csv

rem  load role-privs
php loadDB.php data/%siteName%/role_priv.csv

rem  load user roles
php loadDB.php data/%siteName%/user_role.csv

REM -- archaic mysql -u'oms' --password=%1 --execute="source omsData.ddl" -Doms

rem  load tag types
php loadDB.php data/%siteName%/tag_type.csv

rem  load alarm messages
php loadDB.php data/%siteName%/alarm_message.csv

rem  load alarm types
php loadDB.php data/%siteName%/alarm_type.csv

rem load vessel types
php loadDB.php data/%siteName%/vessel_type.csv

rem load customers
php loadDB.php data/%siteName%/customer.csv

echo ------------------------------------------------------

rem  load tag collection
php loadDB.php data/%siteName%/tag.csv

rem rem  load analog inputs
php loadDB.php data/%siteName%/analog_input.csv

rem  load digital inputs
php loadDB.php data/%siteName%/digital_input.csv

rem  load analog outputs
php loadDB.php data/%siteName%/analog_output.csv

rem  load digital outputs
php loadDB.php data/%siteName%/digital_output.csv

rem  load tanks
php loadDB.php data/%siteName%/tank.csv

rem  load fields
php loadDB.php data/%siteName%/field.csv

rem  load vessels
php loadDB.php data/%siteName%/vessel.csv

rem  load tag relationships
php loadDB.php data/%siteName%/rel_tag_tag.csv

rem  load hotspots
php loadDB.php data/%siteName%/hot_spot.csv

rem  load volumes
php loadDB.php data/%siteName%/volume.csv

rem  load transfers
php loadDB.php data/%siteName%/transfer.csv

rem  set the initial values for the analog inputs
mysql -u'oms' --password=%1 --execute="source omsStart.sql" -Doms
echo END!


