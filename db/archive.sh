# archive history and transfer tables
# Usage:   archive.bat db-pwd number-of-days-to-keep
#          archive.bat pwd 30  --will keep the last 30 days of history and transfers


pd=`date +%Y%m%d --date="-$2 days"`
echo $pd

pushd .
cd $OMS_HOME/db/archive

mysqldump -uoms -p$1 oms history --no-create-info --where "create_dt < date_sub(sysdate(), interval $2 day)" --result-file=history-$pd.arch

mysql -uoms -p$1 -Doms --execute="set @days=$2; delete from history where create_dt < date_sub(sysdate(), interval @days day)"


mysqldump -uoms -p$1 oms transfer --no-create-info --compact --where "create_dt < date_sub(sysdate(), interval $2 day) and transfer_type_id <> 7" --result-file=transfer-$pd.arch

mysql -uoms -p$1 -Doms --execute="set @days=$2; delete from transfer where create_dt < date_sub(sysdate(), interval @days day) and transfer_type_id <> 7"

popd
