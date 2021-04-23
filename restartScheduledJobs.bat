echo off
rem Usage: restartScheduledJobs.bat

pushd %OMS_HOME%


schtasks /Run /TN "OMSDeviceIO"
schtasks /Run /TN "OMSOrder"

schtasks /Run /TN "OMSpmc"
schtasks /Run /TN "OMSSimulator" 
schtasks /Run /TN "OMSTransferMgr"
schtasks /Run /TN "OMSWatchdog"

popd
