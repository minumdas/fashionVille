# How to Check if MySQL is Running

## Quick Check Methods

### Method 1: Check Port 3306 (Easiest)
Open PowerShell and run:
```powershell
Get-NetTCPConnection -LocalPort 3306
```
- **If you see output**: MySQL is running ✓
- **If no output**: MySQL is not running ✗

### Method 2: Check Windows Services
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for "MySQL" or "MySQL80" service
4. Check Status column:
   - **Running** = MySQL is active ✓
   - **Stopped** = MySQL is not running ✗

Or use PowerShell:
```powershell
Get-Service | Where-Object { $_.Name -like "*mysql*" }
```

### Method 3: Check Running Processes
```powershell
Get-Process | Where-Object { $_.ProcessName -like "*mysql*" }
```
- **If you see mysqld processes**: MySQL is running ✓
- **If no output**: MySQL is not running ✗

### Method 4: Test Connection (if mysql client installed)
```cmd
mysql -u root -p
```
Enter password when prompted. If it connects, MySQL is running.

## Quick Status Check Script

Run this single command to check everything:
```powershell
$port = Get-NetTCPConnection -LocalPort 3306 -ErrorAction SilentlyContinue
if ($port) { 
    Write-Host "✓ MySQL is RUNNING" -ForegroundColor Green 
} else { 
    Write-Host "✗ MySQL is NOT running" -ForegroundColor Red 
}
```

## How to Start MySQL

### Option 1: Using Services (Recommended)
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find "MySQL80" or "MySQL" service
4. Right-click → **Start**

### Option 2: Using Command Prompt (Admin)
```cmd
net start MySQL80
```
(Replace `MySQL80` with your MySQL service name if different)

### Option 3: Using XAMPP
- Open XAMPP Control Panel
- Click **Start** button next to MySQL

## Current Status

Based on the last check:
- ✓ **MySQL is RUNNING** on port 3306
- ✓ Service: MySQL80 is Running
- ✓ Process ID: 6180

You can now start your backend!
