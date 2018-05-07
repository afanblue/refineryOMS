#!/bin/sh
#
# Only used to start it, nothing else
#
. /etc/profile

cd $OMS_HOME/transfer

export CLASSPATH=.:target/classes:libs/*
export LOG=logs/transferError.txt
date >> $LOG
echo "cp=$CLASSPATH" >> $LOG
pwd >> $LOG
whoami >> $LOG

java -cp $CLASSPATH it.avn.oms.transfer.TransferMgr >>$LOG 2>&1 &

echo "pidfile=$TRANSFER_PID" >> $LOG 2>&1
if [ ! -z "$TRANSFER_PID" ]; then
  echo $! > "$TRANSFER_PID"
fi
date >> $LOG

