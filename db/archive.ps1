param(
  [string]$pwd,
  [string]$int="90"
)

# archive history and transfer tables
# Usage:   archive.bat db-pwd number-of-days-to-keep
#          archive.bat pwd 30  --will keep the last 30 days of history and transfers


$TFX=(get-date).toString('-yyyyMMdd')

$HISTNM="history"+$TFX+".archive"
$XFERNM="transfer"+$TFX+".archive"

pushd .
cd $env:OMS_HOME/db/archive

mysqldump -uoms -p$pwd oms history --no-create-info --where "create_dt < date_sub(sysdate(), interval $int day)" --result-file=$HISTNM

mysql -uoms -p$pwd -Doms --execute="set @days=$int; delete from history where create_dt < date_sub(sysdate(), interval @days day)"


mysqldump -uoms -p$pwd oms transfer --no-create-info --compact --where "create_dt < date_sub(sysdate(), interval $int day) and transfer_type_id <> 7" --result-file=$XFERNM

mysql -uoms -p$pwd -Doms --execute="set @days=$int; delete from transfer where create_dt < date_sub(sysdate(), interval @days day) and transfer_type_id <> 7"

popd