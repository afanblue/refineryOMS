set echo off

if %2 < 5000 goto xit

for /f "tokens=1-5 delims=/ " %%d in ("%date%") do rename "%1Error.txt" %%g-%%e-%%f.txt

:xit