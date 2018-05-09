@echo off
rem archive history and transfer tables
rem Usage:   archive.bat db-pwd number-of-days-to-keep
rem          archive.bat pwd 30  --will keep the last 30 days of history and transfers

rem  thanks to Antonio Perez Ayala
rem  https://stackoverflow.com/questions/11210997/windows-console-date-math

set yy=%date:~10,4%
set mm=%date:~4,2%
set dd=%date:~7,2%
set /a dd=10%dd% %% 100, mm=10%mm% %% 100
set /a A=YY/100, B=A/4, C=2-A+B, E=36525*(YY+4716)/100, F=306*(MM+1)/10, JDN=C+DD+E+F-1524

set /a nd=jdn-%2

set /a W=(%nd%*100-186721625)/3652425, X=W/4, A=%nd%+1+W-X, B=A+1524, C=(B*100-12210)/36525, D=36525*C/100, E=(B-D)*10000/306001, F=306001*E/10000, DD=B-D-F, MM=E-1, YY=C-4716
IF %MM% GTR 12 SET /A MM-=12, YY+=1
IF %DD% LSS 10 SET DD=0%DD%
IF %MM% LSS 10 SET MM=0%MM%
set /a pd=%YY%%MM%%DD%


mysqldump -uoms -p%1 oms history --no-create-info --where "create_dt < date_sub(sysdate(), interval %2 day)" --result-file=history.archive
rename "history.archive" history-%pd%.arch

mysql -uoms -p%1 -Doms --execute="set @days=%2; delete from history where create_dt < date_sub(sysdate(), interval @days day)"


mysqldump -uoms -p%1 oms transfer --no-create-info --compact --where "create_dt < date_sub(sysdate(), interval %2 day) and transfer_type_id <> 7" --result-file=transfer.archive
rename "transfer.archive" transfer-%pd%.arch

mysql -uoms -p%1 -Doms --execute="set @days=%2; delete from transfer where create_dt < date_sub(sysdate(), interval @days day) and transfer_type_id <> 7"
