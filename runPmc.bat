date /t && time/t

cd /d %OMS%\scada

set CLASSPATH=.;target/classes;libs/*

java -cp %CLASSPATH% it.avn.oms.pmc.Pmc

