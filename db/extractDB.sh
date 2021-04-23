#!/bin/sh

cd $OMS_HOME/db
pushd .

# get the tables
mysqldump -d -u oms -p $1 oms > oms.ddl
# and the views
mysql -uoms -p $1 -Doms -E --execute="source extractViews.sql" >views.ddx
rm views.ddl
php ./parseViews.php views.ddx views.ddl

# get the data
cd $OMS_HOME/db/data/DelawareCity

php ../../ExtractDB.php $1
popd
