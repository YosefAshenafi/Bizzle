#!/bin/bash

# Bible Puzzle Quest - Complete Reset and Run Script
# This script cleans everything and gets the app running

echo "🎮 Bible Puzzle Quest - Automatic Setup"
echo "========================================"
echo ""

# Step 1: Navigate to project
echo "📁 Navigating to project..."
cd /Users/yosef/Documents/Projects/ChristianPuzzle/WordPuzzle || exit 1
echo "✅ In project directory"
echo ""

# Step 2: Clean everything
echo "🧹 Cleaning previous builds..."
rm -rf node_modules 2>/dev/null
rm -rf .expo 2>/dev/null
rm -rf .expo-shared 2>/dev/null
rm -f package-lock.json 2>/dev/null
echo "✅ Cleaned"
echo ""

# Step 3: Install fresh
echo "📦 Installing dependencies (this may take 2-3 minutes)..."
npm install
if [ $? -eq 0 ]; then
  echo "✅ Dependencies installed"
else
  echo "❌ Installation failed. Please check your internet connection."
  exit 1
fi
echo ""

# Step 4: Run with cache clear
echo "🚀 Starting Expo server (clearing cache)..."
echo ""
echo "=========================================="
echo "📱 Next steps:"
echo "1. Scan the QR code with Expo Go app, OR"
echo "2. Press 'i' for iOS simulator, OR"
echo "3. Press 'a' for Android emulator"
echo ""
echo "🎮 Once the app loads:"
echo "1. Tap 'Start Quest' on home screen"
echo "2. Complete Level 1 puzzle (4x4 grid)"
echo "3. See the story revealed"
echo "4. Unlock Level 2 automatically"
echo "5. Keep going for all 6 levels!"
echo "=========================================="
echo ""

npm start -- -c

# The script will not reach here while npm start is running
# To stop: Press Ctrl+C in the terminal
