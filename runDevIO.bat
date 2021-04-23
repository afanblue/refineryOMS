date /t && time/t

pushd .

# cd /d %OMS_LOGS%

# set OLDLOG=devioError.log
# for /f "tokens=1-5 delims=/ " %%d in ("%date%") do set nfx=%%g%%e%%f
# for /f "tokens=1-5 delims=:." %%d in ("%time%") do set nfx=%nfx%-%%d%%e%%f
# if exist %OLDLOG% rename %OLDLOG% %OLDLOG%.%nfx%   

# cd /d %OMS%\devio


# set CLASSPATH=target/devio.jar;libs/*
# set LOG=%OMS_LOGS%\%OLDLOG%
# date /t >> %LOG%
# time /t >> %LOG%

# java -cp %CLASSPATH% us.avn.oms.devio.DevIO >>%LOG% 2>&1

powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM devioError -PROC DevIO -DIR devio -JAR devio -CPATH us.avn.oms.devio.DevIO

popd
