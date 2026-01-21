@echo off
title Fashion Backend Server
color 0A
echo ========================================
echo    Fashion Backend Server Startup
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Clear any problematic Java options
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
set "MAVEN_OPTS="

REM Try to use system Java first (from PATH)
echo [1/4] Checking system Java...
where java >nul 2>&1
if %errorlevel% equ 0 (
    echo Using system Java from PATH
    java -version
    if %errorlevel% equ 0 (
        echo [OK] System Java works
        set "USE_SYSTEM_JAVA=1"
        goto :found_java
    )
)

REM Try the specified Java installation
echo.
echo [2/4] Checking Java at specified location...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
if exist "%JAVA_HOME%\bin\java.exe" (
    echo Found Java at: %JAVA_HOME%
    "%JAVA_HOME%\bin\java.exe" -version >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] Specified Java works
        set "USE_SYSTEM_JAVA=0"
        goto :found_java
    ) else (
        echo [WARN] Java found but may have issues, trying system Java instead
    )
)

REM Try to find Java automatically
echo.
echo [3/4] Searching for Java installations...
if exist "C:\Program Files\Java" (
    for /d %%i in ("C:\Program Files\Java\*") do (
        if exist "%%i\bin\java.exe" (
            echo Found: %%i
            "%%i\bin\java.exe" -version >nul 2>&1
            if !errorlevel! equ 0 (
                set "JAVA_HOME=%%i"
                set "USE_SYSTEM_JAVA=0"
                echo [OK] Using: %%i
                goto :found_java
            )
        )
    )
)

REM Try Eclipse Adoptium folder
if exist "C:\Program Files\Eclipse Adoptium" (
    for /d %%i in ("C:\Program Files\Eclipse Adoptium\*") do (
        if exist "%%i\bin\java.exe" (
            echo Found: %%i
            "%%i\bin\java.exe" -version >nul 2>&1
            if !errorlevel! equ 0 (
                set "JAVA_HOME=%%i"
                set "USE_SYSTEM_JAVA=0"
                echo [OK] Using: %%i
                goto :found_java
            )
        )
    )
)

echo [FAIL] No working Java installation found!
echo Please install Java 17 or later.
pause
exit /b 1

:found_java
echo.
echo [4/4] Setting up Maven...
set "MAVEN_HOME=C:\Rogersoft\Tools\apache-maven-3.9.12"

if "%USE_SYSTEM_JAVA%"=="1" (
    REM Use system Java, just set Maven path
    set "PATH=%MAVEN_HOME%\bin;%PATH%"
    echo Using system Java + Maven
) else (
    REM Use specified Java + Maven
    set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"
    echo Using Java: %JAVA_HOME%
    echo Using Maven: %MAVEN_HOME%
)

REM Verify Maven
where mvn >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] Maven not found at %MAVEN_HOME%
    echo Please check Maven installation.
    pause
    exit /b 1
)

echo [OK] Maven found
echo.

REM Check MySQL
echo Checking MySQL...
netstat -ano | findstr ":3306" >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARN] MySQL does not appear to be running on port 3306
    echo The backend may fail to start if MySQL is not running.
    timeout /t 3 /nobreak >nul
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
