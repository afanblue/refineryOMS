echo off
rem Usage: createScheduledJobs.bat user pwd OMS_home

IF "%~1" == "" GOTO showUsage
IF "%~2" == "" GOTO showUsage
IF "%~3" == "" GOTO showUsage

rem create device I/O process
schtasks /create /xml %3\OMSDeviceIO /ru %1 /rp %2

rem create order process
schtasks /create /xml %3\OMSOrder.xml /ru %1 /rp %2 

rem create scada/pmc process
schtasks /create /xml %3\OMSpmc.xml /ru %1 /rp %2 

rem create simulator process
schtasks /create /xml %3\OMSSimulator.xml /ru %1 /rp %2 

rem create transfer job
schtasks /create /xml %3\OMSTransfer.xml /ru %1 /rp %2 

rem create watchdog job
schtasks /create /xml %3\OMSWatchdog.xml /ru %1 /rp %2 


rem Archive the History, Alarm, and Transfer tables
schtasks /create /xml "%3\OMSArchive.xml" /ru %1 /rp %2 

rem Purge OMS log files
schtasks /create /xml %3\PurgeOMSLogs.xml /ru %1 /rp %2 

rem Purge Tomcat logs
schtasks /create /xml %3\PurgeTomcatLogs.xml /ru %1 /rp %2 

rem Save the OMS DB
schtasks /create /xml "%3\SaveOMSDB" /ru %1 /rp %2 

goto csjEnd

:showUsage
echo ------
echo Usage: createScheduledJobs.bat user pwd OMS_home
echo ------
:csjEnd
