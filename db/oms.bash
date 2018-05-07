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
php loadDB.php data/$siteName/config.csv

# load reference_code table
echo Load reference table data
php loadDB.php data/$siteName/reference_code.csv

# create reference code views
php buildRefCodeViews.php

# load unit types
php loadDB.php data/$siteName/unit_type.csv

# load units
php loadDB.php data/$siteName/unit.csv

# load unit conversions
php loadDB.php data/$siteName/unit_conversion.csv

# load users
php loadDB.php data/$siteName/user.csv

# load privileges
php loadDB.php data/$siteName/privilege.csv

# load pages
php loadDB.php data/$siteName/page.csv

# load roles
php loadDB.php data/$siteName/roleParent.csv
php loadDB.php data/$siteName/role.csv

# load menus
php loadDB.php data/$siteName/menuAdmin.csv
php loadDB.php data/$siteName/menu.csv

# load role-privs
php loadDB.php data/$siteName/role_priv.csv

# load user roles
php loadDB.php data/$siteName/user_role.csv

# mysql -u'oms' --password=$1 --execute="source ddl/omsData.ddl" -Doms

# load tag types
php loadDB.php data/$siteName/tag_type.csv

# load alarm messages
php loadDB.php data/$siteName/alarm_message.csv

# load alarm types
php loadDB.php data/$siteName/alarm_type.csv

# load vessel types
php loadDB.php data/$siteName/vessel_type.csv

# load customers
php loadDB.php data/$siteName/customer.csv

#------------------------------------------------------

# load tag collection
php loadDB.php data/$siteName/tag.csv

# load analog inputs
php loadDB.php data/$siteName/analog_input.csv

# load digital inputs
php loadDB.php data/$siteName/digital_input.csv

# load analog outputs
php loadDB.php data/$siteName/analog_output.csv

# load digital outputs
php loadDB.php data/$siteName/digital_output.csv

# load tanks
php loadDB.php data/$siteName/tank.csv

# load fields
php loadDB.php data/$siteName/field.csv

# load vessels
php loadDB.php data/$siteName/vessel.csv

# load tank relationships
php loadDB.php data/$siteName/rel_tag_tag.csv

# load hotspots
php loadDB.php data/$siteName/hotspot.csv

# load volumes
php loadDB.php data/$siteName/volume.csv

# load transfers
php loadDB.php data/$siteName/transfer.csv

# set the initial values for the analog inputs
mysql -u'oms' --password=$1 --execute="source omsStart.sql" -Doms
echo END!


# load
echo END!
