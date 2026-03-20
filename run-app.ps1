# TrackerManager Application Starter
# This script launches both the backend (.NET) and frontend (Node.js) servers

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start backend (dotnet run)
Write-Host "Starting backend server..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\backend'; dotnet run"

# Brief delay to avoid conflicts
Start-Sleep -Seconds 2

# Start frontend (npm start)
Write-Host "Starting frontend server..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\frontend'; npm start"

Write-Host "Both servers are starting. Check the new PowerShell windows for output." -ForegroundColor Cyan
