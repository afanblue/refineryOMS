#!/bin/sh
#
# Only used to start it, nothing else
#
. /etc/profile

cd $OMS_HOME/watchdog

export CLASSPATH=target/watchdog.jar:libs/*
export LOG=../logs/wdError.txt
date >> $LOG
echo "cp=$CLASSPATH" >> $LOG
pwd >> $LOG

java -cp $CLASSPATH us.avn.oms.watchdog.Watchdog >>$LOG 2>&1 &


