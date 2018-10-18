powershell -command %OMS_HOME%\purgeLogs.ps1 -name "pmcError" -int 2
powershell -command %OMS_HOME%\purgeLogs.ps1 -name "pmc"
powershell -command %OMS_HOME%\purgeLogs.ps1 -name "simError" -int 2
powershell -command %OMS_HOME%\purgeLogs.ps1 -name "simulate"
powershell -command %OMS_HOME%\purgeLogs.ps1 -name "transferError" -int 2
powershell -command %OMS_HOME%\purgeLogs.ps1 -name "transfer"
powershell -command %OMS_HOME%\purgeLogs.ps1 -name "watchdog"
powershell -command %OMS_HOME%\purgeLogs.ps1 -name "wdError"  -int 2

powershell -command %OMS_HOME%\purgeLogs.ps1 -name "acuriteweather"    -path 'c:\projects\AcuRite Weather Station' -int 15
powershell -command %OMS_HOME%\purgeLogs.ps1 -name "AcuRiteConnectLog" -path 'c:\Chaney Instrument Co'
