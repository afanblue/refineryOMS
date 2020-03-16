date /t && time/t
pushd .

# cd /d %OMS_LOGS%

# set OLDLOG=orderError.log
# set LOG=%OMS_LOGS%\%OLDLOG%

# for /f "tokens=1-5 delims=/ " %%d in ("%date%") do set nfx=%%g%%e%%f
# for /f "tokens=1-5 delims=:." %%d in ("%time%") do set nfx=%nfx%-%%d%%e%%f
# if exist %OLDLOG% ren %OLDLOG% %OLDLOG%.%nfx%


# cd /d %OMS%\order

# set CLASSPATH=target/order.jar;libs/*
# date /t >> %LOG%
# time /t >> %LOG%

# java -cp %CLASSPATH% us.avn.oms.order.OrderMgr  %1 %2  >>%LOG% 2>&1

powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM orderError -PROC Order -DIR order -JAR order -CPATH us.avn.oms.order.OrderMgr

popd
