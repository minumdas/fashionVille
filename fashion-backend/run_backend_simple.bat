@echo off
echo Starting Backend...
echo.

REM Clear problematic Java environment variables that cause security file errors
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
set "MAVEN_OPTS="

REM Change to script directory
cd /d "%~dp0"

REM Try system Java first (from PATH) - this avoids security file issues
echo Checking Java...
where java >nul 2>&1
if %errorlevel% equ 0 (
    echo Using system Java (from PATH)
    java -version
    if %errorlevel% equ 0 (
        REM Use system Java - don't set JAVA_HOME to avoid security file issues
        set "PATH=C:\Rogersoft\Tools\apache-maven-3.9.12\bin;%PATH%"
        goto :start_backend
    )
)

REM Fallback: Try specified Java installation
echo Trying specified Java installation...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
if exist "%JAVA_HOME%\bin\java.exe" (
    set "PATH=%JAVA_HOME%\bin;C:\Rogersoft\Tools\apache-maven-3.9.12\bin;%PATH%"
    echo Using Java from: %JAVA_HOME%
) else (
    echo ERROR: Java not found
    echo Please ensure Java is installed and in your system PATH
    pause
    exit /b 1
)

:start_backend
echo.
echo Starting Spring Boot Backend...
echo.

REM Run Spring Boot with cleared Java options
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
call mvn spring-boot:run

REM Keep window open if there's an error
if %errorlevel% neq 0 (
    echo.
    echo Backend failed to start. Check the error messages above.
    pause
)
