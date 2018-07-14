param(
  [string]$path="F:\projects\oms\v2\logs",
  [string]$name="pmc",
  [string]$int="5",
  [string]$error="N"
)
# save our current location
pushd .

sl $path
# SCADA/PMC logs

if( $error -eq "N" ) {
  ls $name-*.log* | where-object {!$_.PSIsContainer -and ((new-timespan $_.LastWriteTime).days -ge $int)} >purged$name.txt
  ls $name-*.log* | where-object {!$_.PSIsContainer -and ((new-timespan $_.LastWriteTime).days -ge $int)} | rm -Force -ErrorAction SilentlyContinue
} else {
  gci $name*.log* -Recurse | where{-not $_.PsIsContainer} | sort CreationTime -desc | select -Skip $int >purged$name.txt
  gci $name*.log* -Recurse | where{-not $_.PsIsContainer} | sort CreationTime -desc | select -Skip $int | Remove-Item -Force
}

# return to the beginning
popd