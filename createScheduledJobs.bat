echo off
rem Usage: createScheduledJobs.bat user pwd OMS_home

IF "%~1" == "" GOTO showUsage
IF "%~2" == "" GOTO showUsage
IF "%~3" == "" GOTO showUsage

rem create simulator process
schtasks /create/tn "OMSSimulator" /tr %3\runSimulate.bat /sc ONSTART /u %1 /p %2 

rem create scada/pmc process
schtasks /create/tn "OMSpmc" /tr %3\runPmc.bat /sc ONSTART /u %1 /p %2 

rem create transfer job
schtasks /create/tn "OMSTransfer" /tr %3\runTransfer.bat /sc ONSTART /u %1 /p %2 


rem Purge OMS log files
schtasks /create/tn "PurgeOMSLogs" /tr %3\purgeOMSLogs.bat /sc DAILY /st 00:45 /u %1 /p %2 

rem Purge Tomcat logs
schtasks /create/tn "PurgeTomcatLogs" /tr %3\purgeTomcatLogs.bat /sc DAILY /st 00:30 /u %1 /p %2 

rem Save the OMS DB
schtasks /create/tn "Save OMS DB" /tr %3\extractDB.bat /sc DAILY /st 00:30 /u %1 /p %2 

goto csjEnd

:showUsage
echo ------
echo Usage: createScheduledJobs.bat user pwd OMS_home
echo ------
:csjEnd
