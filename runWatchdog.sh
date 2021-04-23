#!/bin/sh
#
# Only used to start it, nothing else
#
. /etc/profile

cd $OMS_HOME/watchdog
export OMS_EXEC=$OMS_HOME/exec

pd=`date +%Y%m%d%H%M`
mv $OMS_HOME/logs/wdError.txt $OMS_HOME/logs/wdError-$pd.txt
gzip $OMS_HOME/logs/wdError-$pd.txt

export CLASSPATH=$OMS_EXEC/watchdog.jar:$OMS_EXEC/libs/*
export LOG=../logs/wdError.txt
date >> $LOG
echo "cp=$CLASSPATH" >> $LOG
pwd >> $LOG

java -cp $CLASSPATH us.avn.oms.watchdog.Watchdog >>$LOG 2>&1 &

echo "pidfile=$OMS_PID" >> $LOG 2>&1
if [ ! -z "$OMS_PID" ]; then
  echo $! > "$OMS_PID"
fi
date >> $LOG

