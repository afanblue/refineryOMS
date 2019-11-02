pushd .

cd /d %OMS%\db

pushd .
rem : get the tables
mysqldump -d -uoms -pomsx oms > oms.ddl
rem : and the views
mysql -uoms -pomsx -Doms -E --execute="source extractViews.sql" >views.ddx
rm views.ddl
rem : old (php version) php ./parseViews.php views.ddx views.ddl
python ./parseViews.py views.ddx views.ddl



cd /d %OMS%\db\data\DelawareCity

rem : old (php version) php ..\..\ExtractDB.php
python ..\..\ExtractDB.py

popd
