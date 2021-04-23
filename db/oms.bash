
#!/bin/bash
#
# Usage:  oms.bash  dbPassword siteName
#
# Currently the only siteName is DelawareCity
#

if [ -z $1 ] 
then
   echo "Usage:  oms.bash dbPassword siteName"
   exit
fi

if [ -z $2 ] 
then
   siteName="DelawareCity"
else
   siteName=$2
fi
echo $siteName

mysql -u'omssys' --password=$1 --execute="drop database if exists"
mysql -u'omssys' --password=$1 --execute="create schema if not exists oms"

# create the base tables
mysql -u'omssys' --password=$1 --execute="source oms.ddl" -Doms
# create the views
mysql -u'omssys' --password=$1 --execute="source views.ddl" -Doms

# load config table
echo Load configuration table data
python LoadDB.py $1 data/$siteName/config.csv

# load reference_code table
echo Load reference table data
python LoadDB.py $1 data/$siteName/reference_code.csv

# create reference code views
echo Build reference code views
python BuildRefCodeViews.py $1

#  load watchdog table
echo Load watchdog table
python LoadDB.py $1 data/$siteName/watchdog.csv

#  load crontab table
echo Load crontab table
python LoadDB.py $1 data/$siteName/crontab.csv

# load unit types
echo Load unit types
python LoadDB.py $1 data/$siteName/unit_type.csv

# load units
echo Load units
python LoadDB.py $1 data/$siteName/unit.csv

# load unit conversions
echo Load unit conversions
python LoadDB.py $1 data/$siteName/unit_conversion.csv

# load users
echo Load users
python LoadDB.py $1 data/$siteName/user.csv

# load privileges
echo Load privileges
python LoadDB.py $1 data/$siteName/privilege.csv

# load pages
echo Load pages
python LoadDB.py $1 data/$siteName/page.csv

# load roles
echo "Load parent roles"
python LoadDB.py $1 data/$siteName/roleParent.csv
echo "Load child roles"
python LoadDB.py $1 data/$siteName/role.csv

# load menus
echo "Load admin menu"
python LoadDB.py $1 data/$siteName/menuAdmin.csv
echo "Load other menus"
python LoadDB.py $1 data/$siteName/menu.csv

# load role-privs
echo Load role-privileges
python LoadDB.py $1 data/$siteName/role_priv.csv

# load user roles
echo Load user roles
python LoadDB.py $1 data/$siteName/user_role.csv

# mysql -u'omssys' --password=$1 --execute="source ddl/omsData.ddl" -Doms

# load tag types
echo Load tag types
python LoadDB.py $1 data/$siteName/tag_type.csv

# load alarm messages
echo Load alarm messages
python LoadDB.py $1 data/$siteName/alarm_message.csv

# load alarm types
echo Load alarm types
python LoadDB.py $1 data/$siteName/alarm_type.csv

# load customers
echo Load customers
python LoadDB.py $1 data/$siteName/customer.csv

#------------------------------------------------------

# load tag collection
echo "Load AItag"
python LoadDB.py $1 data/$siteName/AItag.csv
echo "Load AOtag"
python LoadDB.py $1 data/$siteName/AOtag.csv
echo "Load CalcTag"
python LoadDB.py $1 data/$siteName/Calctag.csv
echo "Load CBtag"
python LoadDB.py $1 data/$siteName/CBtag.csv
echo "Load DItag"
python LoadDB.py $1 data/$siteName/DItag.csv
echo "Load DOtag"
python LoadDB.py $1 data/$siteName/DOtag.csv
echo "Load tag"
python LoadDB.py $1 data/$siteName/tag.csv

# load analog inputs
echo "Load analog inputs"
python LoadDB.py $1 data/$siteName/analog_input.csv

# load digital inputs
echo "Load digital inputs"
python LoadDB.py $1 data/$siteName/digital_input.csv

# load analog outputs
echo "Load analog outputs"
python LoadDB.py $1 data/$siteName/analog_output.csv

# load digital outputs
echo "Load digital outputs"
python LoadDB.py $1 data/$siteName/digital_output.csv

#  load device table
echo "Load device table"
python LoadDB.py $1 data/$siteName/device.csv

#  load Weather station address table
echo "Load weather station address table"
python LoadDB.py $1 data/$siteName/WSaddress.csv

#  load simulated tag address table
echo "Load simulated tag address table"
python LoadDB.py $1 data/$siteName/SIMaddress.csv

#  load address table for everything (?) else
echo "Load address table"
python LoadDB.py $1 data/$siteName/address.csv

#  load sim_io (SIM I/O) table
echo "Load sim I/O table"
python LoadDB.py $1 data/$siteName/sim_io.csv

#  load calculated
echo "Load calculated variable table"
python LoadDB.py $1 data/$siteName/calculated.csv

#  load control block
echo "Load control blocks"
python LoadDB.py $1 data/$siteName/control_block.csv

# load tanks
echo "Load tanks"
python LoadDB.py $1 data/$siteName/tank.csv

# load fields
echo "Load fields"
python LoadDB.py $1 data/$siteName/field.csv

#  load holds (for carriers
echo "Load carrier holds"
python LoadDB.py $1 data/$siteName/hold.csv

#  load shipment
echo "Load shipments"
python LoadDB.py $1 data/$siteName/shipment.csv

#  load shipment_items
echo "Load shipment items"
python LoadDB.py $1 data/$siteName/shipment_item.csv

# load tag relationships
echo "Load tag relationships"
python LoadDB.py $1 data/$siteName/rel_tag_tag.csv

# load hotspots
echo "Load hotspots"
python LoadDB.py $1 data/$siteName/hot_spot.csv

#  load vertex
echo "Load vertices"
python LoadDB.py $1 data/$siteName/vertex.csv

# load volumes
echo "Load volumes"
python LoadDB.py $1 data/$siteName/volume.csv

#  plot groups
echo "Load plot groups"
python LoadDB.py $1 data/$siteName/plot_group.csv

#  raw data
# echo "Load raw data"
# even though we extracted the data, there is a trigger on
# the tag table that creates a raw_data record for all AI,AO,DI,DO tags
# so this isn't needed.
# python LoadDB.py $1 data/$siteName/raw_data.csv

# load transfers
echo "Load transfers"
python LoadDB.py $1 data/$siteName/transfer.csv

#  load history
echo "Load history"
python LoadDB.py $1 data/$siteName/history.csv

#  load alarms
echo "Load alarms"
python LoadDB.py $1 data/$siteName/alarm.csv

# set the initial values for the analog inputs
echo "Set initial values for analog inputs"
mysql -u'omssys' --password=$1 --execute="source omsStart.sql" -Doms
echo END!



