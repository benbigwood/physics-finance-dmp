#!/bin/bash

echo "========================================================"
echo "  Physics in Finance: Diffusion - Heat Equation to Bachelier"
echo "  Automated Setup & Launch Script"
echo "========================================================"
echo ""

# 1. Check Node Version
echo "[1/4] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in your PATH."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
node -v
echo "Node.js is installed."
echo ""

# 2. Install Dependencies
echo "[2/4] Installing dependencies..."
if [ -d "node_modules" ]; then
    echo "'node_modules' already exists. using existing."
else
    echo "Installing packages via npm..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed."
        exit 1
    fi
fi
echo "Dependencies ready."
echo ""

# 3. Run Development Server
echo "[3/4] Starting Development Server..."
echo ""
echo "========================================================"
echo "  The website will open shortly."
echo "  Press Ctrl+C to stop the server when done."
echo "========================================================"
echo ""

npm run dev
