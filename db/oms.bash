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

mysql -u'oms' --password=$1 --execute="source omsSchema.ddl" -Doms
# create the base tables
mysql -u'oms' --password=$1 --execute="source oms.ddl" -Doms
# create the views
mysql -u'oms' --password=$1 --execute="source views.ddl" -Doms

# load config table
echo Load configuration table data
python LoadDB.py data/$siteName/config.csv

# load reference_code table
echo Load reference table data
python LoadDB.py data/$siteName/reference_code.csv

# create reference code views
python BuildRefCodeViews.py

# load unit types
python LoadDB.py data/$siteName/unit_type.csv

# load units
python LoadDB.py data/$siteName/unit.csv

# load unit conversions
python LoadDB.py data/$siteName/unit_conversion.csv

# load users
python LoadDB.py data/$siteName/user.csv

# load privileges
python LoadDB.py data/$siteName/privilege.csv

# load pages
python LoadDB.py data/$siteName/page.csv

# load roles
python LoadDB.py data/$siteName/roleParent.csv
python LoadDB.py data/$siteName/role.csv

# load menus
python LoadDB.py data/$siteName/menuAdmin.csv
python LoadDB.py data/$siteName/menu.csv

# load role-privs
python LoadDB.py data/$siteName/role_priv.csv

# load user roles
python LoadDB.py data/$siteName/user_role.csv

# mysql -u'oms' --password=$1 --execute="source ddl/omsData.ddl" -Doms

# load tag types
python LoadDB.py data/$siteName/tag_type.csv

# load alarm messages
python LoadDB.py data/$siteName/alarm_message.csv

# load alarm types
python LoadDB.py data/$siteName/alarm_type.csv

# load customers
python LoadDB.py data/$siteName/customer.csv

#------------------------------------------------------

# load tag collection
python LoadDB.py data/$siteName/tag.csv

# load analog inputs
python LoadDB.py data/$siteName/analog_input.csv

# load digital inputs
python LoadDB.py data/$siteName/digital_input.csv

# load analog outputs
python LoadDB.py data/$siteName/analog_output.csv

# load digital outputs
python LoadDB.py data/$siteName/digital_output.csv

# load tanks
python LoadDB.py data/$siteName/tank.csv

# load fields
python LoadDB.py data/$siteName/field.csv

# load containers
python LoadDB.py data/$siteName/container.csv

# load tank relationships
python LoadDB.py data/$siteName/rel_tag_tag.csv

# load hotspots
python LoadDB.py data/$siteName/hotspot.csv

# load volumes
python LoadDB.py data/$siteName/volume.csv

# load transfers
python LoadDB.py data/$siteName/transfer.csv

# set the initial values for the analog inputs
mysql -u'oms' --password=$1 --execute="source omsStart.sql" -Doms
echo END!


# load
echo END!
