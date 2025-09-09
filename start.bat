@echo off
title Timetable Manager - Professional Desktop Application
color 0B

cls
echo.
echo  ████████╗██╗███╗   ███╗███████╗████████╗ █████╗  ██████╗ █████╗ ███████╗███████╗
echo  ╚══██╔══╝██║████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝
echo     ██║   ██║██╔████╔██║█████╗     ██║   ███████║██║     ███████║███████╗███████╗
echo     ██║   ██║██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║     ██╔══██║╚════██║╚════██║
echo     ██║   ██║██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╗██║  ██║███████║███████║
echo     ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝
echo.
echo  ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██╗  ██╗███████╗██████╗ 
echo  ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██║  ██║██╔════╝██╔══██╗
echo  ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ███████║█████╗  ██████╔╝
echo  ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██║██╔══╝  ██╔══██╗
echo  ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║███████╗██║  ██║
echo  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
echo.
echo  ================================================================================
echo                    Professional Desktop Application v1.0.0
echo  ================================================================================
echo.
echo  Loading your desktop application...
echo  This will open your React app as a native Windows application.
echo.
echo  Features included:
echo  ✓ Dashboard with statistics
echo  ✓ Personal 5th semester timetable
echo  ✓ Course management system
echo  ✓ Room allocation system
echo  ✓ Activity tracking
echo  ✓ Settings and preferences
echo  ✓ Professional desktop interface
echo.
echo  ================================================================================
echo  Checking prerequisites...
echo  ================================================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  ❌ ERROR: Node.js is not installed or not in PATH
    echo  Please install Node.js from https://nodejs.org/
    echo  Download the LTS version and run the installer.
    echo.
    pause
    exit /b 1
)

echo  ✅ Node.js is installed

REM Check if dependencies are installed
if not exist "node_modules" (
    echo.
    echo  📦 Installing dependencies...
    echo  This may take a few minutes on first run...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo  ❌ ERROR: Failed to install dependencies
        echo  Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo  ✅ Dependencies installed successfully
) else (
    echo  ✅ Dependencies already installed
)

echo.
echo  ================================================================================
echo  Starting Timetable Manager...
echo  ================================================================================
echo.
echo  The application will open in a new window.
echo  Press Ctrl+C in this window to stop the application.
echo.
echo  Please wait while the application loads...
echo.

REM Start the Electron app in development mode
call npm run electron-dev

echo.
echo  ================================================================================
echo  Application closed. Thank you for using Timetable Manager!
echo  ================================================================================
echo.
pause