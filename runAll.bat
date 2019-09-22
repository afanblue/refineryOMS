#  runAll.bat
#  run all the Java routines through powershell except watchdog

powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM pmcError -PROC Pmc -DIR scada
-JAR xfer -CPATH us.avn.oms.scada.Pmc

powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM simError -PROC Simulate -DIR sim -JAR sim -CPATH us.avn.oms.sim.Simulator

powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM transferError -PROC Transfer -DIR transfer -JAR transfer -CPATH us.avn.oms.transfer.TransferMgr

rem execute the runWatchdog.bat to start the watchdog process
