@echo off
echo ===================================================
echo   TechCart Electronics Shopping Application
echo ===================================================
echo.
echo 1. Starting Backend Server (Port 5000)...
start "TechCart Backend (Port 5000)" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo 2. Starting Frontend Client (Port 5173)...
start "TechCart Frontend (Port 5173)" cmd /k "cd client && npm run dev"

echo.
echo Both servers are launching!
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this launcher window...
pause > nul
