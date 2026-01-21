# Backend Health Check Script
Write-Host "=== Backend Health Check ===" -ForegroundColor Cyan
Write-Host ""

# Check if backend is running on port 9090
Write-Host "1. Checking if backend is running on port 9090..." -ForegroundColor Yellow
$backend = Get-NetTCPConnection -LocalPort 9090 -ErrorAction SilentlyContinue
if ($backend) {
    Write-Host "   ✓ Backend is running on port 9090" -ForegroundColor Green
} else {
    Write-Host "   ✗ Backend is NOT running on port 9090" -ForegroundColor Red
}

# Check if MySQL is running on port 3306
Write-Host ""
Write-Host "2. Checking if MySQL is running on port 3306..." -ForegroundColor Yellow
$mysql = Get-NetTCPConnection -LocalPort 3306 -ErrorAction SilentlyContinue
if ($mysql) {
    Write-Host "   ✓ MySQL is running on port 3306" -ForegroundColor Green
} else {
    Write-Host "   ✗ MySQL is NOT running on port 3306" -ForegroundColor Red
    Write-Host "   → Backend requires MySQL to be running!" -ForegroundColor Yellow
}

# Test backend endpoint
Write-Host ""
Write-Host "3. Testing backend API endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:9090/api/public/products" -Method GET -TimeoutSec 3 -UseBasicParsing
    Write-Host "   ✓ Backend API is responding (Status: $($response.StatusCode))" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "   → Found $($data.Count) products" -ForegroundColor Cyan
} catch {
    Write-Host "   ✗ Backend API is not responding" -ForegroundColor Red
    Write-Host "   → Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Check Complete ===" -ForegroundColor Cyan
