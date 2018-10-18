param(
  [string]$path="C:\projects\AcuRite Weather Station",
  [string]$name="acuriteweather",
  [string]$ext="CSV"
)

pushd .

cd "$path"
    
$YFX=(get-date).AddDays(-1).toString('yyyyMMdd')
$NWNM=$name,$YFX -join "."
$OLDLOG=$name,$ext -join "."

# if exist $OLDLOG% rename $OLDLOG $NWNM   

$CHKOLDLOG=Test-Path -path $OLDLOG
echo "$OLDLOG exists? $CHKOLDLOG"
if( $CHKOLDLOG ) {
    echo "Rename $OLDLOG; change $ext to $YFX"
    Get-ChildItem -Filter $OLDLOG | Rename-Item -NewName {$_.name -replace $ext,$YFX }
}

popd

