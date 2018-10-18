date /t && time/t

set M2REPO=F:\users\allan\.m2\repository
set V2PROJ=F:\projects\oms\v2
set OMSJAR=oms-0.0.1-SNAPSHOT.jar
set WSJAR=WeatherStation-0.0.1-SNAPSHOT.jar

cp %M2REPO%\us\avn\oms\0.0.1-SNAPSHOT\%OMSJAR% %V2PROJ%\scada\libs

cp %M2REPO%\us\avn\oms\0.0.1-SNAPSHOT\%OMSJAR% %V2PROJ%\sim\libs

cp %M2REPO%\us\avn\oms\0.0.1-SNAPSHOT\%OMSJAR% %V2PROJ%\transfer\libs

cp %M2REPO%\us\avn\oms\0.0.1-SNAPSHOT\%OMSJAR% %V2PROJ%\watchdog\libs


cp %M2REPO%\us\avn\ws\WeatherStation\0.0.1-SNAPSHOT\%WSJAR% %V2PROJ%\sim\libs
