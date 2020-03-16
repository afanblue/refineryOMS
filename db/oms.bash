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

mysql -u'oms' --password=$1 --execute="drop database if exists"
mysql -u'oms' --password=$1 --execute="create schema if not exists oms"

# create the base tables
mysql -u'oms' --password=$1 --execute="source oms.ddl" -Doms
# create the views
mysql -u'oms' --password=$1 --execute="source views.ddl" -Doms

# load config table
echo Load configuration table data
python LoadDB.py $1 data/$siteName/config.csv

# load reference_code table
echo Load reference table data
python LoadDB.py $1 data/$siteName/reference_code.csv

# create reference code views
python BuildRefCodeViews.py

#  load watchdog table
python LoadDB.py $1 data/$siteName/watchdog.csv

#  load crontab table
python LoadDB.py $1 data/$siteName/crontab.csv

# load unit types
python LoadDB.py $1 data/$siteName/unit_type.csv

# load units
python LoadDB.py $1 data/$siteName/unit.csv

# load unit conversions
python LoadDB.py $1 data/$siteName/unit_conversion.csv

# load users
python LoadDB.py $1 data/$siteName/user.csv

# load privileges
python LoadDB.py $1 data/$siteName/privilege.csv

# load pages
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
python LoadDB.py $1 data/$siteName/role_priv.csv

# load user roles
python LoadDB.py $1 data/$siteName/user_role.csv

# mysql -u'oms' --password=$1 --execute="source ddl/omsData.ddl" -Doms

# load tag types
python LoadDB.py $1 data/$siteName/tag_type.csv

# load alarm messages
python LoadDB.py $1 data/$siteName/alarm_message.csv

# load alarm types
python LoadDB.py $1 data/$siteName/alarm_type.csv

# load customers
python LoadDB.py $1 data/$siteName/customer.csv

#------------------------------------------------------

# load tag collection
echo "AItag"
python LoadDB.py $1 data/$siteName/AItag.csv
echo "AOtag"
python LoadDB.py $1 data/$siteName/AOtag.csv
echo "CalcTag"
python LoadDB.py $1 data/$siteName/Calctag.csv
echo "CBtag"
python LoadDB.py $1 data/$siteName/CBtag.csv
echo "DItag"
python LoadDB.py $1 data/$siteName/DItag.csv
echo "DOtag"
python LoadDB.py $1 data/$siteName/DOtag.csv
echo "tag"
python LoadDB.py $1 data/$siteName/tag.csv

# load analog inputs
python LoadDB.py $1 data/$siteName/analog_input.csv

# load digital inputs
python LoadDB.py $1 data/$siteName/digital_input.csv

# load analog outputs
python LoadDB.py $1 data/$siteName/analog_output.csv

# load digital outputs
python LoadDB.py $1 data/$siteName/digital_output.csv

#  load device table
python LoadDB.py $1 data/$siteName/device.csv

#  load address table
python LoadDB.py $1 data/$siteName/address.csv

#  load sim_io (SIM I/O) table
python LoadDB.py $1 data/$siteName/sim_io.csv

#  load calculated
python LoadDB.py $1 data/$siteName/calculated.csv

#  load control block
python LoadDB.py $1 data/$siteName/control_block.csv

# load tanks
python LoadDB.py $1 data/$siteName/tank.csv

# load fields
python LoadDB.py $1 data/$siteName/field.csv

#  load holds (for carriers
python LoadDB.py $1 data/$siteName/hold.csv

#  load shipment
python LoadDB.py $1 data/$siteName/shipment.csv

#  load shipment_items
python LoadDB.py $1 data/$sitename/shipment_item.csv

# load tag relationships
python LoadDB.py $1 data/$siteName/rel_tag_tag.csv

# load hotspots
python LoadDB.py $1 data/$siteName/hotspot.csv

#  load vertex
python LoadDB.py $1 data/$siteName/vertex.csv

# load volumes
python LoadDB.py $1 data/$siteName/volume.csv

#  plot groups
python LoadDB.py $1 data/$siteName/plotGroups.csv

#  raw data
python LoadDB.py $1 data/$siteName/rawData.csv

# load transfers
python LoadDB.py $1 data/$siteName/transfer.csv

#  load history
python LoadDB.py $1 data/$siteName/history.csv

#  load alarms
python LoadDB.py $1 data/$sitename/alarm.csv

# set the initial values for the analog inputs
mysql -u'oms' --password=$1 --execute="source omsStart.sql" -Doms
echo END!



