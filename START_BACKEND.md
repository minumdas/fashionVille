# How to Start the Backend

## Prerequisites
1. **MySQL must be running** on port 3306
2. Java 17 installed
3. Maven installed

## Step 1: Start MySQL
- Open Services (Win+R → `services.msc`)
- Find and start "MySQL" or "MySQL80" service
- OR use: `net start MySQL80` (in Admin CMD)

## Step 2: Start Backend
Navigate to `fashion-backend` folder and run:
```cmd
run_backend.bat
```

Or manually:
```cmd
cd fashion-backend
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot
set PATH=%JAVA_HOME%\bin;C:\Rogersoft\Tools\apache-maven-3.9.12\bin;%PATH%
mvn spring-boot:run
```

## Step 3: Verify Backend is Running
- Backend should start on: `http://localhost:9090`
- Check the console for: "Started FashionBackendApplication"
- Test API: Open `http://localhost:9090/api/public/products` in browser

## Database Configuration
- Host: localhost:3306
- Database: fashiondb (auto-created)
- Username: root
- Password: Password@4321

## Troubleshooting
- If MySQL connection fails, verify MySQL is running: `netstat -ano | findstr :3306`
- Check MySQL credentials match application.properties
- Ensure MySQL service is set to "Automatic" startup type
