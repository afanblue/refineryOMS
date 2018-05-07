#!/bin/sh

cd $OMS_HOME/db
pushd .

# get the tables
mysqldump -d -uoms -pomsx oms > oms.ddl
# and the views
mysql -uoms -pomsx -Doms -E --execute="source extractViews.sql" >views.ddx
rm views.ddl
php ./parseViews.php views.ddx views.ddl

# get the data
cd $OMS_HOME/db/data/DelawareCity

php ../../ExtractDB.php
popd
