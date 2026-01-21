@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
set "PATH=%JAVA_HOME%\bin;C:\Rogersoft\Tools\apache-maven-3.9.12\bin;%PATH%"
cd /d "%~dp0"
call mvn spring-boot:run
pause