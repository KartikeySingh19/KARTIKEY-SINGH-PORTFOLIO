@echo off
setlocal
cd /d "%~dp0"
echo Starting your portfolio at http://localhost:5500
echo Keep this window open while using the website.
echo Press Ctrl+C to stop the server.
start "" http://localhost:5500
where py >nul 2>nul
if %errorlevel%==0 (
    py -m http.server 5500
) else (
    where python >nul 2>nul
    if %errorlevel%==0 (
        python -m http.server 5500
    ) else (
        echo.
        echo Python was not found. Install Python, or use VS Code Live Server.
        pause
    )
)
