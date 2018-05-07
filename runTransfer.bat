date /t && time/t

cd /d %OMS%\transfer

set CLASSPATH=.;target/classes;libs/*

rem java -DLOGS=./logs -cp %CLASSPATH% it.avn.oms.transfer.TransferMgr  %1 %2 >>logs\error.txt 2>&1
java -cp %CLASSPATH% it.avn.oms.transfer.TransferMgr  %1 %2

