date /t && time/t

pushd .

# cd /d %OMS_LOGS%

# set OLDLOG=wdError.log

# for /f "tokens=1-5 delims=/ " %%d in ("%date%") do set nfx=%%g%%e%%f
# for /f "tokens=1-5 delims=:." %%d in ("%time%") do set nfx=%nfx%-%%d%%e%%f
# if exist %OLDLOG% rename %OLDLOG% %OLDLOG%.%nfx%   

# cd /d %OMS%\watchdog
# set LOG=%OMS_LOGS%\%OLDLOG%
# set CLASSPATH=target/watchdog.jar;libs/*
# date /t >> %LOG%
# time /t >> %LOG%

# java -cp %CLASSPATH% us.avn.oms.watchdog.Watchdog >>%LOG% 2>&1

powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM wdError -PROC watchdog -DIR watchdog -JAR watchdog -CPATH us.avn.oms.watchdog.Watchdog

popd


MININT-GEM7AJM\Allan