date /t && time/t
pushd .

cd /d %OMS%\transfer

set CLASSPATH=target/transfer.jar;libs/*

rem java -DLOGS=./logs -cp %CLASSPATH% us.avn.oms.transfer.TransferMgr  %1 %2 >>logs\error.txt 2>&1
java -cp %CLASSPATH% us.avn.oms.transfer.TransferMgr  %1 %2

popd
