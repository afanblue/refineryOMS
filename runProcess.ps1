param(
  [string]$LOGNM="wdError",
  [string]$PROC="watchdog",
  [string]$DIR="watchdog",
  [string]$CPATH="us.avn.oms.watchdog.Watchdog",
  [string]$JAR="watchdog"
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
    Stop-Process $ID
    Get-Process -Id $ID -ErrorAction SilentlyContinue | Wait-Process 
  }
}

# clean up log files

$OLDLOG="$PROC".toLower()+".log"
$ForReading = 1
$ForAppending = 8
$strComputer = "."

$NFX=(get-date).toString('-yyyy-MM-dd-HH-mm')
$NWNM=$PROC.toLower()+$NFX+".log"

echo "Rename $OLDLOG; change to $NWNM"
Get-ChildItem -Filter $OLDLOG | Rename-Item -NewName $NWNM
gzip $NWNM

Start-Sleep -Seconds 5

cd  $env:OMS\$DIR
pwd

$CLASSPATH=".;target/$JAR.jar;libs/*"
echo $CLASSPATH
$TLOGNM=$LOGNM+$NFX+".log"
$OUT=$env:OMS_LOGS,$TLOGNM -join "\"
echo $OUT
$TERRNM=$LOGNM+$NFX+".err"
$ERR=$env:OMS_LOGS,$TERRNM -join "\"
echo $ERR

Add-Content -Path $OUT -Value (Get-Date)
Add-Content -Path $ERR -Value (Get-Date)

$ARGLIST='-cp '+$CLASSPATH+" "+$CPATH
echo $ARGLIST

$PROCID=(Start-Process java -argumentlist $ARGLIST -NoNewWindow -RedirectStandardOutput $OUT -RedirectStandardError $ERR -passthru).ID
echo $PROCID
Set-Content -Path .\$PROC.pid -Value($PROCID)

popd
