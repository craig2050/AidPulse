@echo off
:: FireAI Startup Script for Windows
:: This script starts all the necessary components for the FireAI application

SETLOCAL EnableDelayedExpansion

:: Set text colors
set "GREEN=[92m"
set "BLUE=[94m"
set "YELLOW=[93m"
set "RED=[91m"
set "NC=[0m"

:: Function to print a header
call :print_header "Starting FireAI Application"

:: Navigate to the project directory
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%" || (
    echo %RED%ERROR: Could not navigate to project directory%NC%
    goto :error
)

:: Check if MongoDB is installed
where mongod >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo %RED%MongoDB is not installed. Please install MongoDB first.%NC%
    echo %YELLOW%You can download it from: https://www.mongodb.com/try/download/community%NC%
    goto :error
)

:: Check if MongoDB service is running
echo %YELLOW%Checking MongoDB service...%NC%
sc query MongoDB >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo %YELLOW%MongoDB service not found. Starting MongoDB manually...%NC%
    start "MongoDB" mongod --dbpath="%USERPROFILE%\data\db"
    echo %GREEN%MongoDB started manually. If this is your first time, you may need to create the data directory.%NC%
    echo %YELLOW%You can create it using: mkdir %USERPROFILE%\data\db%NC%
    timeout /t 5 >nul
) else (
    sc query MongoDB | findstr "RUNNING" >nul
    if %ERRORLEVEL% NEQ 0 (
        echo %YELLOW%Starting MongoDB service...%NC%
        net start MongoDB
        echo %GREEN%MongoDB service started successfully.%NC%
    ) else (
        echo %GREEN%MongoDB service is already running.%NC%
    )
)

:: Setup and start Backend
call :print_header "Setting up Backend"
cd /d "%PROJECT_DIR%\backend" || (
    echo %RED%ERROR: Could not navigate to backend directory%NC%
    goto :error
)

echo %YELLOW%Installing backend dependencies...%NC%
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo %RED%Failed to install backend dependencies%NC%
    goto :error
)
echo %GREEN%Backend dependencies installed successfully.%NC%

:: Start the backend server in a new command prompt window
echo %YELLOW%Starting backend server...%NC%
start "FireAI Backend" cmd /k "cd /d "%PROJECT_DIR%\backend" && npm run dev"
echo %GREEN%Backend server started on port 3000.%NC%

:: Setup and start Frontend
call :print_header "Setting up Frontend"
cd /d "%PROJECT_DIR%\frontend" || (
    echo %RED%ERROR: Could not navigate to frontend directory%NC%
    goto :error
)

echo %YELLOW%Cleaning frontend node_modules...%NC%
if exist "node_modules" (
    rmdir /s /q node_modules
    if exist "package-lock.json" del /q package-lock.json
    echo %GREEN%Frontend node_modules cleaned successfully.%NC%
)

echo %YELLOW%Installing frontend dependencies...%NC%
:: Create .env file to ensure correct NODE_PATH
echo NODE_PATH=./node_modules > .env
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo %RED%Failed to install frontend dependencies%NC%
    goto :error
)
echo %GREEN%Frontend dependencies installed successfully.%NC%

:: Start the frontend server in a new command prompt window
echo %YELLOW%Starting frontend server...%NC%
start "FireAI Frontend" cmd /k "cd /d "%PROJECT_DIR%\frontend" && set PORT=3001 && npm start"
echo %GREEN%Frontend server started on port 3001.%NC%

call :print_header "FireAI Application Started"
echo %GREEN%Backend:%NC% http://localhost:3000
echo %GREEN%Frontend:%NC% http://localhost:3001
echo.
echo %YELLOW%Note: Check the command prompt windows for any error messages.%NC%
echo %YELLOW%Close the command prompt windows to stop the servers when done.%NC%

goto :eof

:print_header
echo.
echo %BLUE%============================================%NC%
echo %BLUE%%~1%NC%
echo %BLUE%============================================%NC%
echo.
goto :eof

:error
echo %RED%An error occurred. Exiting...%NC%
exit /b 1

:eof
exit /b 0
