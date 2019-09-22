date /t && time/t
pushd .

# cd /d %OMS_LOGS%

# set OLDLOG=transferError.log
# set LOG=%OMS_LOGS%\%OLDLOG%

# for /f "tokens=1-5 delims=/ " %%d in ("%date%") do set nfx=%%g%%e%%f
# for /f "tokens=1-5 delims=:." %%d in ("%time%") do set nfx=%nfx%-%%d%%e%%f
# if exist %OLDLOG% ren %OLDLOG% %OLDLOG%.%nfx%


# cd /d %OMS%\transfer

# set CLASSPATH=target/transfer.jar;libs/*
# date /t >> %LOG%
# time /t >> %LOG%

# java -cp %CLASSPATH% us.avn.oms.transfer.TransferMgr  %1 %2  >>%LOG% 2>&1

powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM transferError -PROC Transfer -DIR transfer -JAR transfer -CPATH us.avn.oms.transfer.TransferMgr

popd
