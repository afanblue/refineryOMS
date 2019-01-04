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

$HISTNM="history"+$TFX+".archive"
$XFERNM="transfer"+$TFX+".archive"

pushd .
cd $env:OMS_HOME/db/archive

ls

which mysql
which mysqldump
mysqldump 

mysqldump -uoms -p$pwd oms history --no-create-info --where "create_dt < date_sub(sysdate(), interval $int month)" --result-file=$HISTNM

mysql -uoms -p$pwd -Doms --execute="set @months=$int; delete from history where create_dt < date_sub(sysdate(), interval @months month)"
mysql -uoms -pomsx -Doms -E -e"select min(create_dt) as 'minHistoryDate' from history" >>archive.log


mysqldump -uoms -p$pwd oms transfer --no-create-info --compact --where "create_dt < date_sub(sysdate(), interval $int month) and transfer_type_id = (select id from transfer_type_vw where code='X')" --result-file=$XFERNM

mysql -uoms -p$pwd -Doms --execute="set @months=$int; delete from transfer where create_dt < date_sub(sysdate(), interval @months month) and transfer_type_id = (select id from transfer_type_vw where code='X')"
mysql -uoms -pomsx -Doms -E -e"select min(create_dt) as 'minTransferDate' from transfer where transfer_type_id = (select id from transfer_type_vw where code='X')" >>archive.log

popd