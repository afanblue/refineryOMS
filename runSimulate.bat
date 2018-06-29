date /t && time/t

pushd .
cd /d %OMS%\sim

set CLASSPATH=target/sim.jar;libs/*

java -cp %CLASSPATH% us.avn.oms.sim.Sim

popd