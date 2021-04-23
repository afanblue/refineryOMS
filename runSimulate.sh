#!/bin/sh

. /etc/profile
. /etc/environment


export OMS_SIM=$OMS_HOME/sim
export OMS_EXEC=$OMS_HOME/exec

pd=`date +%Y%m%d%H%M`
mv $OMS_HOME/logs/simError.txt $OMS_HOME/logs/simError-$pd.txt
gzip $OMS_HOME/logs/simError-$pd.txt

export CLASSPATH=$OMS_EXEC/sim.jar:$OMS_EXEC/libs/*
export LOG=$OMS_LOGS/simError.txt

date >> $LOG
echo "cp=$CLASSPATH" >> $LOG
echo $OMS_HOME >> $LOG

java -cp $CLASSPATH us.avn.oms.sim.Simulator >>$LOG 2>&1 &

echo "pidfile=$OMS_PID" >> $OMS_LOGS/simError.txt 2>&1
if [ ! -z "$OMS_PID" ]; then
  echo $! > "$OMS_PID"
fi
date >> $LOG

