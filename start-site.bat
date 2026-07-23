@echo off
title Jackfruit King - dev server
cd /d "%~dp0apps\web"

echo.
echo   ========================================
echo    JACKFRUIT KING - starting dev server
echo   ========================================
echo.
echo   Once it says "Ready", open this in your browser:
echo.
echo        http://localhost:3000
echo.
echo   Keep this window OPEN while presenting.
echo   Press Ctrl+C (then Y) in this window to stop.
echo.

node "node_modules\next\dist\bin\next" dev

echo.
echo   Server stopped.
pause
