param(
  [string]$LOGNM="pmcError",
  [string]$PROC="pmc",
  [string]$int="5",
  [string]$error="N"
)

date 
pushd .

cd $env:OMS_LOGS

# Stopping proccess

$jt=Get-WmiObject Win32_Process |  Where-Object {$_.Name -eq "java.exe"}
foreach( $j in $jt)
{ 
  $ID = $j.ProcessId;
  echo $ID
  $CL=$j.CommandLine;
  echo $CL
  $CL -like "*$PROC*"
  if($CL -like "*$PROC*" ) 
  {
    echo "Stopping $ID"
    Stop-Process $ID -WhatIf
  }
}

$OLDLOG='pmcError.log'
Const ForReading = 1
Const ForAppending = 8
strComputer = "."

$NFX=(get-date).toString('yyyyMMdd')
$NWNM=$LOGNM,$NFX -join "."

# if exist $OLDLOG% rename $OLDLOG %OLDLOG%.%nfx%   

Set objFSO = CreateObject("Scripting.FileSystemObject")
If objFSO.FileExists($OLDLOG) Then
    if objFSO.FileExists($NWNM) Then
        Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\cimv2")
    Else 
        Get-ChildItem -Filter $OLDLOG | rename-item -NewName {$_.name -replace 'log',$nfx }
    End If
End If

cd  $env:OMS\scada

$CLASSPATH='.;target/xfer.jar;libs/*'
$LOG=$env:OMS,$OLDLOG -join "\"
$ERRNM=$LOGNM+".err"
$ERR=$env:OMS,$ERRNM -join "\"

date >> $LOG
date >> $ERR

# java -cp %CLASSPATH% us.avn.oms.pmc.Pmc >>%LOG% 2>&1

$ARGLIST='-cp '+$CLASSPATH+' us.avn.oms.pmc.Pmc '

(Start-Process java -argumentlist $ARGLIST -RedirectStandardOutput $LOG -RedirectStandardError $ERR -passthru).ID
popd
