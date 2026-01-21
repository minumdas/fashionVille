@echo off
setlocal
set "JAVA_HOME=C:\Program Files\Java\jdk-22"
set "PATH=%JAVA_HOME%\bin;C:\Rogersoft\Tools\apache-maven-3.9.12\bin;%PATH%"
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
set "MAVEN_OPTS="
echo Using JAVA_HOME: %JAVA_HOME%
echo Clearing Java Options...
java -version
echo.
echo Running Maven...
call mvn -version
if %errorlevel% neq 0 (
    echo Maven failed to start.
    exit /b %errorlevel%
)
echo.
echo Starting Spring Boot...
call mvn spring-boot:run
endlocal
