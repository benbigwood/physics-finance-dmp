@echo off
setlocal
title Physics in Finance - Automated Setup

echo ========================================================
echo   Physics in Finance: Diffusion - Heat Equation to Bachelier
echo   Automated Setup & Launch Script
echo ========================================================
echo.

REM 1. Check Node Version
echo [1/4] Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
node -v
echo Node.js is installed.
echo.

REM 2. Install Dependencies
echo [2/4] Installing dependencies...
if exist node_modules (
    echo 'node_modules' already exists. Skipping full install check for speed.
    REM If you have issues, delete node_modules and run this again.
) else (
    echo Installing packages via npm...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install failed.
        echo This often happens due to permission issues or corrupted caches.
        echo.
        set /p CLEAN_FIX="Would you like to try a 'Clean Install' (delete lockfile & cache)? [Y/N] "
        if /i "%CLEAN_FIX%"=="Y" (
            echo Cleaning...
            if exist package-lock.json del package-lock.json
            if exist node_modules rmdir /s /q node_modules
            call npm install
            if %errorlevel% neq 0 (
                echo [FATAL] Clean install also failed. Please check the error message above.
                pause
                exit /b 1
            )
        ) else (
            echo Aborting.
            pause
            exit /b 1
        )
    )
)
echo Dependencies ready.
echo.

REM 3. Run Development Server
echo [3/4] Starting Development Server...
echo.
echo ========================================================
echo   The website will open shortly.
echo   Press Ctrl+C to stop the server when done.
echo ========================================================
echo.

call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] The server crashed or failed to start.
    pause
)
