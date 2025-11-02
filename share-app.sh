#!/bin/bash

echo "🎮 Generating QR Code for Bible Puzzle Quest 🎮"
echo "==============================================="

# Get the tunnel URL from Expo (this would need manual extraction)
echo "📱 STEP 1: Start Expo with Tunnel"
echo "Run this command in your terminal:"
echo ""
echo "npx expo start --tunnel"
echo ""

echo "📱 STEP 2: Share with Testers"
echo "1. Expo will show a QR code in your terminal"
echo "2. Testers scan it with Expo Go app"
echo "3. App loads automatically on their phones"
echo ""

echo "🌐 Alternative: Local Network"
echo "If testers are on same WiFi:"
echo "npx expo start --lan"
echo "Then share: exp://$(ifconfig | grep 'inet ' | grep -v 127.0.0.1 | head -1 | awk '{print $2}'):8081"
echo ""

echo "📋 Testing Checklist:"
echo "✅ Install Expo Go"
echo "✅ Scan QR code"
echo "✅ Test sliding puzzle"
echo "✅ Test jigsaw puzzle" 
echo "✅ Try 'Choose Your Challenge' modal"
echo "✅ Test hints and restart"
echo ""

echo "🎯 Current App Status: READY FOR TESTING"
echo "All major issues resolved!"