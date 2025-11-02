#!/bin/bash

echo "🎮 Bible Puzzle Quest - QR Code Generator 🎮"
echo "=========================================="
echo ""

# Check if Expo is running
if ! pgrep -f "expo start" > /dev/null; then
    echo "❌ Expo is not running. Please start with: npx expo start --tunnel"
    echo ""
    echo "Starting Expo with tunnel..."
    npx expo start --tunnel --port 8092 &
    sleep 15
fi

echo ""
echo "📱 Instructions for testers:"
echo "1. Install Expo Go app from App Store/Play Store"
echo "2. Scan the QR code in the Expo terminal window"
echo "3. Or open: exp://your-tunnel-url.exp.direct"
echo ""
echo "🧩 Test Features:"
echo "- Sliding Puzzle (Classic gameplay)"
echo "- Jigsaw Puzzle (Drag & drop)"
echo "- Choose Your Challenge modal"
echo "- Hints system"
echo "- Audio management"
echo ""
echo "🌐 For remote testing, the tunnel URL will be:"
echo "Available in the Expo Dev Tools terminal output"
echo ""
echo "📋 Current App Status:"
echo "✅ Syntax errors fixed"
echo "✅ Modal visibility resolved" 
echo "✅ Jigsaw layout improved"
echo "✅ Ready for testing"