@echo off
set JAVA_HOME=C:\Program Files\Java\jdk-21.0.10
set PATH=%JAVA_HOME%\bin;%PATH%
echo Starting Maven...
.\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
pause
