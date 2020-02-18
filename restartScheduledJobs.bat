echo off
rem Usage: restartScheduledJobs.bat

killScheduledJobs.bat

sleep 10

schtasks /Run /TN "OMSDeviceIO"
schtasks /Run /TN "OMSpmc"
schtasks /Run /TN "OMSSimulator" 
schtasks /Run /TN "OMSTransferMgr"
schtasks /Run /TN "OMSWatchdog"
