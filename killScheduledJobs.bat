echo off
rem Usage: killScheduledJobs.bat

if exist temp.tmp del temp.tmp
if exist temp.tmp del java.tmp
for /F "tokens=1-8*" %%a in ('ps -W') do (
  rem echo %%d %%h %%i
  echo %%d %%h >> temp.tmp
  echo %%d %%i >> temp.tmp
)

findstr /r /c:java.exe temp.tmp >java.tmp
for /F "tokens=1,2*" %%i in (java.tmp) do (
  echo %%j
  tskill %%i /A /V
)
