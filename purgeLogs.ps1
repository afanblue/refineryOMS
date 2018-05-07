param(
  [string]$path="F:\projects\oms\v2\logs",
  [string]$name="scada",
  [string]$int="5"
)
# save our current location
pushd .

sl $path

# SCADA/PMC logs
# Delete files older than the $limit.
ls $name.txt* | where-object {!$_.PSIsContainer -and ((new-timespan $_.LastWriteTime).days -ge $int)} >purged$name.txt
# Delete files older than the $limit.
ls $name.txt* | where-object {!$_.PSIsContainer -and ((new-timespan $_.LastWriteTime).days -ge $int)} | rm -Force -ErrorAction SilentlyContinue

# return to the beginning
popd