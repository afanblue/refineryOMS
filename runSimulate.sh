#!/bin/sh

. /etc/profile


cd  $OMS_HOME/sim

export CLASSPATH=.:target/classes:libs/*
export LOG=logs/simError.txt
date >> $LOG
echo "cp=$CLASSPATH" >> $LOG
pwd >> $LOG

java -cp $CLASSPATH it.avn.oms.sim.Sim >>$LOG 2>&1 &

echo "pidfile=$SIM_PID" >> logs/simError.txt 2>&1
if [ ! -z "$SIM_PID" ]; then
  echo $! > "$SIM_PID"
fi
date >> $LOG

