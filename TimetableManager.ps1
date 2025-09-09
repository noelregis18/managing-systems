# Timetable Manager Desktop Application
# Professional React + Electron Desktop App
# 
# This PowerShell script provides an alternative way to launch the Timetable Manager
# desktop application on Windows systems. It builds the React app and then launches
# the Electron application.
#
# Key features:
# - Automated build process
# - User-friendly console output
# - Error handling and status reporting
# - Professional application branding

# Display application header with colored output
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   TIMETABLE MANAGER DESKTOP APP" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Inform user about the application launch process
Write-Host "Starting your desktop application..." -ForegroundColor Green
Write-Host "This will open your React app as a native Windows application." -ForegroundColor White
Write-Host ""

# Display feature list to inform user about application capabilities
Write-Host "Features included:" -ForegroundColor Yellow
Write-Host "✓ Dashboard with statistics" -ForegroundColor Green
Write-Host "✓ Personal 5th semester timetable" -ForegroundColor Green
Write-Host "✓ Course management system" -ForegroundColor Green
Write-Host "✓ Room allocation system" -ForegroundColor Green
Write-Host "✓ Activity tracking" -ForegroundColor Green
Write-Host "✓ Settings and preferences" -ForegroundColor Green
Write-Host "✓ Professional desktop interface" -ForegroundColor Green
Write-Host ""

# Build the React application for production
Write-Host "Building React application..." -ForegroundColor Blue
npm run build

# Check if the build was successful
if ($LASTEXITCODE -eq 0) {
    # Build successful - proceed to launch Electron app
    Write-Host "Build completed successfully!" -ForegroundColor Green
    Write-Host "Starting desktop application..." -ForegroundColor Blue
    Write-Host ""
    
    # Start the Electron app with the built React files
    npm run electron
} else {
    # Build failed - display error message and instructions
    Write-Host "Error: Failed to build the application." -ForegroundColor Red
    Write-Host "Please make sure all dependencies are installed." -ForegroundColor Red
}

# Display closing message and wait for user input
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Application closed. Thank you for using Timetable Manager!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Wait for user to press Enter before closing the script
Read-Host "Press Enter to exit" 