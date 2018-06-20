date /t && time/t
pushd .

cd /d %OMS%\scada

set CLASSPATH=.;target/classes;libs/*

java -cp %CLASSPATH% us.avn.oms.pmc.Pmc

popd
