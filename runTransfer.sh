#!/bin/sh
#
# Only used to start it, nothing else
#
. /etc/profile
. /etc/environment

cd $OMS_HOME/exec

export CLASSPATH=$OMS_EXEC/transfer.jar:$OMS_EXEC/libs/*
export LOG=$OMS_LOGS/transferError.txt

pd=`date +%Y%m%d%H%M`
mv $OMS_HOME/logs/transferError.txt $OMS_HOME/logs/transferError-$pd.txt
gzip $OMS_HOME/logs/transferError-$pd.txt

date >> $LOG
echo "cp=$CLASSPATH" >> $LOG
pwd >> $LOG
whoami >> $LOG

java -cp $CLASSPATH us.avn.oms.transfer.TransferMgr >>$LOG 2>&1 &

echo "pidfile=$OMS_PID" >> $LOG 2>&1
if [ ! -z "$OMS_PID" ]; then
  echo $! > "$OMS_PID"
fi
date >> $LOG

