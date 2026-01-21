@echo off
title Fashion Backend Server
color 0A
echo ========================================
echo    Fashion Backend Server Startup
echo ========================================
echo.

REM Clear problematic Java environment variables
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
set "MAVEN_OPTS="

REM Try system Java first (from PATH) to avoid security file issues
where java >nul 2>&1
if %errorlevel% equ 0 (
    REM Use system Java - don't set JAVA_HOME
    set "PATH=C:\Rogersoft\Tools\apache-maven-3.9.12\bin;%PATH%"
    set "USE_SYSTEM_JAVA=1"
) else (
    REM Fallback: Use specified Java installation
    set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
    set "PATH=%JAVA_HOME%\bin;C:\Rogersoft\Tools\apache-maven-3.9.12\bin;%PATH%"
    set "USE_SYSTEM_JAVA=0"
)

REM Change to script directory
cd /d "%~dp0"

echo Current directory: %CD%
echo.

REM Check if Java exists
echo [1/3] Checking Java installation...
if "%USE_SYSTEM_JAVA%"=="1" (
    echo Using system Java (from PATH)
    java -version
    if %errorlevel% neq 0 (
        echo ERROR: System Java verification failed
        pause
        exit /b %errorlevel%
    )
) else (
    if not exist "%JAVA_HOME%\bin\java.exe" (
        echo ERROR: Java not found at %JAVA_HOME%
        echo Please check your Java installation.
        echo.
        pause
        exit /b 1
    )
    "%JAVA_HOME%\bin\java.exe" -version
    if %errorlevel% neq 0 (
        echo ERROR: Java verification failed
        pause
        exit /b %errorlevel%
    )
)
echo [OK] Java found
echo.

REM Check if Maven exists
echo [2/3] Checking Maven installation...
where mvn >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Maven not found in PATH
    echo Trying to use Maven from: C:\Rogersoft\Tools\apache-maven-3.9.12\bin
    if not exist "C:\Rogersoft\Tools\apache-maven-3.9.12\bin\mvn.cmd" (
        echo ERROR: Maven not found
        echo Please check your Maven installation.
        echo.
        pause
        exit /b 1
    )
)
echo [OK] Maven found
echo.

REM Check MySQL
echo [3/3] Checking MySQL connection...
netstat -ano | findstr ":3306" >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MySQL does not appear to be running on port 3306
    echo The backend may fail to start if MySQL is not running.
    echo.
    echo To start MySQL:
    echo   1. Open Services (Win+R, type: services.msc)
    echo   2. Find and start MySQL80 service
    echo   3. Or use: net start MySQL80 (in Admin CMD)
    echo.
    timeout /t 5 /nobreak >nul
) else (
    echo [OK] MySQL is running on port 3306
)
echo.

echo ========================================
echo Starting Spring Boot Backend...
echo ========================================
echo Backend will be available at: http://localhost:9090
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Run Spring Boot with cleared Java options
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
call mvn spring-boot:run

REM If we get here, the server stopped
echo.
echo ========================================
echo Backend server has stopped.
echo ========================================
pause
