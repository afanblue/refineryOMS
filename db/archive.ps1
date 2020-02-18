param(
  [string]$pwd="omsx",
  [string]$int="90"
)

# archive history and transfer tables
# Usage:   archive.ps1 db-pwd -int=number-of-months-to-keep
#          archive.ps1 -pwd=pwd -int=1  --will keep the last month of history and transfers
#
# Note: the date on the file will be the date the archive was made

$TFX=(get-date).toString('-yyyyMMdd')

$ALRMNM="alarm"+$TFX+".archive"
$HISTNM="history"+$TFX+".archive"
$XFERNM="transfer"+$TFX+".archive"
$ITEMNM="shipment_item"+$TFX+".archive"
$SHIPNM="shipment"+$TFX+".archive"


pushd $env:OMS_HOME/db/archive

ls

which mysql
which mysqldump
mysqldump 

mysqldump -uoms -p$pwd oms alarm --no-create-info --where "create_dt < date_sub(sysdate(), interval $int month) and acknowledged='Y'" --result-file=$ALRMNM
gzip $ALRMNM

mysql -uoms -p$pwd -Doms --execute="set @months=$int; delete from history where create_dt < date_sub(sysdate(), interval @months month) and acknowledged='Y'"
mysql -uoms -pomsx -Doms -E -e"select min(create_dt) as 'minAlarmDate' from alarm" >>archive.log


mysqldump -uoms -p$pwd oms history --no-create-info --where "create_dt < date_sub(sysdate(), interval $int month)" --result-file=$HISTNM
gzip $HISTNM

mysql -uoms -p$pwd -Doms --execute="set @months=$int; delete from history where create_dt < date_sub(sysdate(), interval @months month)"
mysql -uoms -pomsx -Doms -E -e"select min(create_dt) as 'minHistoryDate' from history" >>archive.log


mysqldump -uoms -p$pwd oms transfer --no-create-info --compact --where "create_dt < date_sub(sysdate(), interval $int month) and transfer_type_id = (select id from transfer_type_vw where code='X')" --result-file=$XFERNM
gzip $XFERNM

mysql -uoms -p$pwd -Doms --execute="set @months=$int; delete from transfer where create_dt < date_sub(sysdate(), interval @months month) and transfer_type_id = (select id from transfer_type_vw where code='X')"
mysql -uoms -pomsx -Doms -E -e"select min(create_dt) as 'minTransferDate' from transfer where transfer_type_id = (select id from transfer_type_vw where code='X')" >>archive.log

mysqldump -uoms -p$pwd oms shipment_item --no-create-info --compact --where "create_dt < date_sub(sysdate(), interval $int month) and active not in ('A','P')" --result-file=$ITEMNM
gzip $ITEMNM

mysql -uoms -p$pwd -Doms --execute="set @months=$int; delete from shipment_item where create_dt < date_sub(sysdate(), interval @months month) and active not in ('A','P')"
mysql -uoms -pomsx -Doms -E -e"select min(create_dt) as 'minOrderItemDate' from shipment_item" >>archive.log

mysqldump -uoms -p$pwd oms shipment --no-create-info --compact --where "create_dt < date_sub(sysdate(), interval $int month) and active = 'A')" --result-file=$SHIPNM
gzip $SHIPNM

mysql -uoms -p$pwd -Doms --execute="set @months=$int; delete from shipment where create_dt < date_sub(sysdate(), interval @months month) and shipment_id not in (select shipment_id from shipment_item)"
mysql -uoms -pomsx -Doms -E -e"select min(create_dt) as 'minOrderDate' from shipment" >>archive.log

popd
