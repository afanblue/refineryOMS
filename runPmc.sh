#!/bin/sh

. /etc/profile
. /etc/environment


export OMS_PMC=/media/WD1TB/projects/oms/v2/scada
export OMS_EXEC=$OMS_HOME/exec

pd=`date +%Y%m%d%H%M`
mv $OMS_HOME/logs/pmcError.txt $OMS_HOME/logs/pmcError-$pd.txt
gzip $OMS_HOME/logs/pmcError-$pd.txt

cd $OMS_EXEC

export CLASSPATH=$OMS_EXEC/pmc.jar:$OMS_EXEC/libs/*
export LOG=$OMS_LOGS/pmcError.txt

date >> $LOG
echo "cp=$CLASSPATH" >> $LOG
pwd >> $LOG
echo "OMS_HOME: " $OMS_HOME >> $LOG

java -cp $CLASSPATH us.avn.oms.scada.Pmc >>$LOG 2>&1 &

echo "pidfile=$OMS_PID" >> $LOG 2>&1
if [ ! -z "$OMS_PID" ]; then
  echo $! > "$OMS_PID"
fi
date >> $LOG

