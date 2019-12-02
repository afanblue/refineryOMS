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

rem  create the schema
mysql -u'oms' --password=%1 --execute="drop database if exists oms"
mysql -u'oms' --password=%1 --execute="create schema if not exists oms"

rem  create the base tables
mysql -u'oms' --password=%1 --execute="source oms.ddl" -Doms
rem create the views
mysql -u'oms' --password=%1 --execute="source views.ddl" -Doms

rem  load config table
echo Load configuration table data
python LoadDB.py %1 data/%siteName%/config.csv

rem  load reference_code table
echo Load reference table data
python LoadDB.py %1 data/%siteName%/reference_code.csv

rem  create reference code views (already created)
python BuildRefCodeViews.py %1

rem  load watchdog table
python LoadDB.py %1 data/%siteName%/watchdog.csv

rem  load unit types table
python LoadDB.py %1 data/%siteName%/unit_type.csv

rem  load units table
python LoadDB.py %1 data/%siteName%/unit.csv

rem  load unit conversions
python LoadDB.py %1 data/%siteName%/unit_conversion.csv

rem  load users
python LoadDB.py %1 data/%siteName%/user.csv

rem  load privileges
python LoadDB.py %1 data/%siteName%/privilege.csv

rem  load pages
echo "Load pages (page)"
python LoadDB.py %1 data/%siteName%/page.csv

rem  load roles
echo "Load parent roles"
python LoadDB.py %1 data/%siteName%/roleParent.csv
echo "Load child roles"
python LoadDB.py %1 data/%siteName%/role.csv

rem  load menus
echo "Load admin menu"
python LoadDB.py %1 data/%siteName%/menuAdmin.csv
echo "Load other menus"
python LoadDB.py %1 data/%siteName%/menu.csv

rem  load role-priv relationships
python LoadDB.py %1 data/%siteName%/role_priv.csv

rem  load user role relationship
python LoadDB.py %1 data/%siteName%/user_role.csv

REM -- archaic mysql -u'oms' --password=%1 --execute="source omsData.ddl" -Doms

rem  load tag types
python LoadDB.py %1 data/%siteName%/tag_type.csv

rem  load alarm messages
python LoadDB.py %1 data/%siteName%/alarm_message.csv

rem  load alarm types
python LoadDB.py %1 data/%siteName%/alarm_type.csv

rem load customers
python LoadDB.py %1 data/%siteName%/customer.csv

echo ------------------------------------------------------

rem  load tag collection
echo "AItag"
python LoadDB.py %1 data/%siteName%/AItag.csv
echo "AOtag"
python LoadDB.py %1 data/%siteName%/AOtag.csv
echo "CalcTag"
python LoadDB.py %1 data/%siteName%/Calctag.csv
echo "CBtag"
python LoadDB.py %1 data/%siteName%/CBtag.csv
echo "DItag"
python LoadDB.py %1 data/%siteName%/DItag.csv
echo "DOtag"
python LoadDB.py %1 data/%siteName%/DOtag.csv
echo "tag"
python LoadDB.py %1 data/%siteName%/tag.csv

rem rem  load analog inputs
python LoadDB.py %1 data/%siteName%/analog_input.csv

rem  load digital inputs
python LoadDB.py %1 data/%siteName%/digital_input.csv

rem  load analog outputs
python LoadDB.py %1 data/%siteName%/analog_output.csv

rem  load digital outputs
python LoadDB.py %1 data/%siteName%/digital_output.csv

rem  load device table
python LoadDB.py %1 data/%siteName%/device.csv

rem  load address table
python LoadDB.py %1 data/%siteName%/address.csv

rem  load sim_io (SIM I/O) table
python LoadDB.py %1 data/%siteName%/sim_io.csv

rem  load calculated
python LoadDB.py %1 data/%siteName%/calculated.csv

rem  load tanks
python LoadDB.py %1 data/%siteName%/tank.csv

rem  load fields
python LoadDB.py %1 data/%siteName%/field.csv

rem  load shipment
python LoadDB.py %1 data/%siteName%/shipment.csv

rem load shipment_items
python LoadDB.py %1 data/%sitename%/shipment_item.csv

rem  load tag relationships
python LoadDB.py %1 data/%siteName%/rel_tag_tag.csv

rem  load hotspots
python LoadDB.py %1 data/%siteName%/hot_spot.csv

rem  load vertex
python LoadDB.py %1 data/%siteName%/vertex.csv

rem  load volumes
python LoadDB.py %1 data/%siteName%/volume.csv

rem  load transfers
python LoadDB.py %1 data/%siteName%/transfer.csv

rem  set the initial values for the analog inputs
mysql -u'oms' --password=%1 --execute="source omsStart.sql" -Doms
echo END!


