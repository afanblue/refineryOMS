#!/bin/sh

. /etc/profile


cd  $OMS_HOME/sim

export CLASSPATH=target/sim.jar:libs/*
export LOG=logs/simError.txt
date >> $LOG
echo "cp=$CLASSPATH" >> $LOG
pwd >> $LOG

java -cp $CLASSPATH us.avn.oms.sim.Sim >>$LOG 2>&1 &

echo "pidfile=$SIM_PID" >> logs/simError.txt 2>&1
if [ ! -z "$SIM_PID" ]; then
  echo $! > "$SIM_PID"
fi
date >> $LOG

