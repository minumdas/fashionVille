@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
set "PATH=%JAVA_HOME%\bin;C:\Rogersoft\Tools\apache-maven-3.9.12\bin;%PATH%"
cd /d "%~dp0"
mvn spring-boot:run
