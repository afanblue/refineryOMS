echo off
rem Usage: startScheduledJobs.bat


schtasks /Run /TN "OMSDeviceIO"
schtasks /Run /TN "OMSpmc"
schtasks /Run /TN "OMSSimulator" 
schtasks /Run /TN "OMSTransferMgr"
schtasks /Run /TN "OMSWatchdog"
