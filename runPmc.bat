date /t && time/t
pushd .

cd /d %OMS_LOGS%

set OLDLOG=pmcError.log
for /f "tokens=1-5 delims=/ " %%d in ("%date%") do set nfx=%%g%%e%%f
for /f "tokens=1-5 delims=:." %%d in ("%time%") do set nfx=%nfx%-%%d%%e%%f
if exist %OLDLOG% rename %OLDLOG% %OLDLOG%.%nfx%   

cd /d %OMS%\scada

set CLASSPATH=.;target/xfer.jar;libs/*
set LOG=%OMS_LOGS%\%OLDLOG%
date /t >> %LOG%
time /t >> %LOG%

java -cp %CLASSPATH% us.avn.oms.pmc.Pmc >>%LOG% 2>&1

popd
