# MySQL Status Check Script
Write-Host "=== MySQL Status Check ===" -ForegroundColor Cyan
Write-Host ""

# Method 1: Check if MySQL is listening on port 3306
Write-Host "1. Checking if MySQL is listening on port 3306..." -ForegroundColor Yellow
$mysqlPort = Get-NetTCPConnection -LocalPort 3306 -ErrorAction SilentlyContinue
if ($mysqlPort) {
    Write-Host "   ✓ MySQL is running and listening on port 3306" -ForegroundColor Green
    Write-Host "   → Process ID: $($mysqlPort.OwningProcess)" -ForegroundColor Gray
} else {
    Write-Host "   ✗ MySQL is NOT running on port 3306" -ForegroundColor Red
}

# Method 2: Check Windows Services
Write-Host ""
Write-Host "2. Checking MySQL Windows Services..." -ForegroundColor Yellow
$mysqlServices = Get-Service | Where-Object { 
    $_.Name -like "*mysql*" -or 
    $_.DisplayName -like "*mysql*" -or
    $_.Name -like "*mariadb*" -or
    $_.DisplayName -like "*mariadb*"
}

if ($mysqlServices) {
    foreach ($service in $mysqlServices) {
        $statusColor = if ($service.Status -eq "Running") { "Green" } else { "Red" }
        $statusSymbol = if ($service.Status -eq "Running") { "✓" } else { "✗" }
        Write-Host "   $statusSymbol Service: $($service.DisplayName) - Status: $($service.Status)" -ForegroundColor $statusColor
        Write-Host "      Name: $($service.Name)" -ForegroundColor Gray
    }
} else {
    Write-Host "   ✗ No MySQL services found" -ForegroundColor Red
}

# Method 3: Check running processes
Write-Host ""
Write-Host "3. Checking for MySQL processes..." -ForegroundColor Yellow
$mysqlProcesses = Get-Process | Where-Object { 
    $_.ProcessName -like "*mysql*" -or 
    $_.ProcessName -like "*mysqld*"
}

if ($mysqlProcesses) {
    Write-Host "   ✓ Found MySQL processes:" -ForegroundColor Green
    foreach ($proc in $mysqlProcesses) {
        Write-Host "      → $($proc.ProcessName) (PID: $($proc.Id))" -ForegroundColor Gray
    }
} else {
    Write-Host "   ✗ No MySQL processes found" -ForegroundColor Red
}

# Method 4: Try to connect to MySQL (if mysql client is available)
Write-Host ""
Write-Host "4. Testing MySQL connection..." -ForegroundColor Yellow
$mysqlPath = Get-Command mysql -ErrorAction SilentlyContinue
if ($mysqlPath) {
    try {
        $result = & mysql -u root -pPassword@4321 -e "SELECT 1;" 2>&1
        if ($LASTEXITCODE -eq 0 -or $result -like "*1*") {
            Write-Host "   ✓ Successfully connected to MySQL" -ForegroundColor Green
        } else {
            Write-Host "   ⚠ MySQL client found but connection failed" -ForegroundColor Yellow
            Write-Host "      → You may need to check credentials" -ForegroundColor Gray
        }
    } catch {
        Write-Host "   ⚠ Could not test connection (mysql client may require password prompt)" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⚠ MySQL command-line client not found in PATH" -ForegroundColor Yellow
    Write-Host "      → This is normal if you use MySQL Workbench or XAMPP" -ForegroundColor Gray
}

# Summary
Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
if ($mysqlPort) {
    Write-Host "✓ MySQL appears to be RUNNING" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Start the backend: cd fashion-backend && run_backend.bat" -ForegroundColor White
    Write-Host "2. Check backend logs for connection success" -ForegroundColor White
} else {
    Write-Host "✗ MySQL does NOT appear to be running" -ForegroundColor Red
    Write-Host ""
    Write-Host "To start MySQL:" -ForegroundColor Yellow
    Write-Host "1. Open Services (Win+R → services.msc)" -ForegroundColor White
    Write-Host "2. Find 'MySQL' or 'MySQL80' service" -ForegroundColor White
    Write-Host "3. Right-click → Start" -ForegroundColor White
    Write-Host ""
    Write-Host "OR use Command Prompt (Admin):" -ForegroundColor Yellow
    Write-Host "   net start MySQL80" -ForegroundColor White
    Write-Host ""
    Write-Host "If using XAMPP:" -ForegroundColor Yellow
    Write-Host "   Start MySQL from XAMPP Control Panel" -ForegroundColor White
}
