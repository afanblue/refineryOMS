rem Start PMC
powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM pmcError -PROC Pmc -DIR scada -JAR xfer -CPATH us.avn.oms.scada.Pmc

rem Start Transfer
powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM transferError -PROC Transfer -DIR transfer -JAR transfer -CPATH us.avn.oms.transfer.TransferMgr

rem Start simulator
powershell -command F:\projects\oms\v2\runProcess.ps1 -LOGNM simError -PROC Simulate -DIR sim -JAR sim -CPATH us.avn.oms.sim.Simulator