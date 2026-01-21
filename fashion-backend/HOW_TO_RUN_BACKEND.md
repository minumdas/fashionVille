# How to Run the Backend

## Fixed Files

I've fixed `run_backend_simple.bat` - it was incomplete (missing the actual Maven command).

## Ways to Start the Backend

### Option 1: Use START_BACKEND.bat (Recommended)
This is a new improved script with better error checking:
1. Navigate to `fashion-backend` folder
2. Double-click `START_BACKEND.bat`
3. A command window will open and show startup progress

### Option 2: Use run_backend_simple.bat (Fixed)
1. Navigate to `fashion-backend` folder  
2. Double-click `run_backend_simple.bat`
3. A command window will open

### Option 3: Use run_backend.bat
1. Navigate to `fashion-backend` folder
2. Double-click `run_backend.bat`

### Option 4: Run from Command Prompt
1. Open Command Prompt
2. Navigate to the backend folder:
   ```cmd
   cd C:\Rogersoft\React_Rogersoft\Project1\fashion-backend
   ```
3. Run:
   ```cmd
   run_backend_simple.bat
   ```
   OR
   ```cmd
   START_BACKEND.bat
   ```

## If the Window Closes Immediately

If the batch file opens and closes immediately, it means there's an error. Try this:

1. **Open Command Prompt first**, then navigate to the folder and run the batch file:
   ```cmd
   cd C:\Rogersoft\React_Rogersoft\Project1\fashion-backend
   run_backend_simple.bat
   ```
   This way you'll see the error message.

2. **Check common issues:**
   - Java not found at the specified path
   - Maven not found
   - MySQL not running

## Troubleshooting

### "Java not found" error
- Check if Java is installed at: `C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot`
- If Java is in a different location, edit the batch file and update the `JAVA_HOME` path

### "Maven not found" error  
- Check if Maven is installed at: `C:\Rogersoft\Tools\apache-maven-3.9.12`
- If Maven is in a different location, edit the batch file and update the `PATH`

### "MySQL connection failed" error
- Make sure MySQL is running (check port 3306)
- Start MySQL service: `net start MySQL80` (in Admin CMD)

## What to Expect

When the backend starts successfully, you should see:
1. Java version information
2. Maven downloading dependencies (first time only)
3. Spring Boot starting up
4. Message: "Started FashionBackendApplication"
5. Backend available at: `http://localhost:9090`

The window will stay open while the backend is running. Press `Ctrl+C` to stop it.

## Quick Test

Once the backend is running, test it:
- Open browser: `http://localhost:9090/api/public/products`
- You should see JSON data (or empty array `[]`)
