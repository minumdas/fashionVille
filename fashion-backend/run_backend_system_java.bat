@echo off
title Fashion Backend - Using System Java
color 0A
echo ========================================
echo    Fashion Backend (System Java)
echo ========================================
echo.
echo This script uses system Java to avoid security file issues.
echo.

REM Change to script directory
cd /d "%~dp0"

REM Clear problematic Java environment variables
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
set "MAVEN_OPTS="

REM Use system Java (from PATH) - don't set JAVA_HOME
echo Checking system Java...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java not found in PATH
    echo Please add Java to your system PATH or install Java.
    pause
    exit /b 1
)

echo.
echo Setting up Maven...
set "MAVEN_HOME=C:\Rogersoft\Tools\apache-maven-3.9.12"
set "PATH=%MAVEN_HOME%\bin;%PATH%"

where mvn >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven not found at %MAVEN_HOME%
    pause
    exit /b 1
)

echo [OK] Java and Maven ready
echo.

REM Check MySQL
netstat -ano | findstr ":3306" >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARN] MySQL may not be running on port 3306
    timeout /t 2 /nobreak >nul
)

echo ========================================
echo Starting Spring Boot Backend...
echo ========================================
echo.

REM Run with cleared Java options
set "_JAVA_OPTIONS="
set "JAVA_TOOL_OPTIONS="
call mvn spring-boot:run

pause
