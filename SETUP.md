# 🔧 Bible Puzzle Quest - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd /path/to/WordPuzzle
npm install
```

### 2. Start Expo Development Server
```bash
npm start
```

You'll see a QR code in your terminal. Scan it with:
- **iOS**: Camera app, then tap Expo notification
- **Android**: Expo Go app

### 3. Run on Emulator (Optional)
```bash
# iOS Simulator (macOS only)
npm run ios

# Android Emulator (requires Android SDK)
npm run android
```

## 📋 Requirements

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **Expo CLI**: Latest version
- **iOS**: Xcode 13+ (for iOS builds)
- **Android**: Android Studio (for Android builds)

## 🎯 Development Workflow

### Adding New Levels

Edit `src/constants/levels.js`:

```javascript
{
  id: 7,
  title: 'Joseph\'s Dream',
  bibleRef: 'Genesis 37-50',
  image: 'https://images.unsplash.com/[your-image]',
  story: `Your biblical story text here...`,
  moves: 80,
  gridSize: 6,
}
```

### Customizing Colors

Edit `src/constants/colors.js`:

```javascript
export const COLORS = {
  primary: '#6B46C1',      // Change primary color
  secondary: '#EC4899',    // Change secondary color
  // ... etc
}
```

### Modifying Puzzle Difficulty

Edit `src/constants/levels.js`:
- `gridSize`: 4 = 4x4 (16 tiles), 5 = 5x5 (25 tiles), 6 = 6x6 (36 tiles)
- `moves`: Maximum allowed moves to complete the puzzle

### Adding Sound Effects

1. Place audio files in `src/assets/audio/`
2. Update `src/utils/audio.js` to load and play them:

```javascript
export const playVictorySound = async () => {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync(require('../assets/audio/victory.mp3'));
    await sound.playAsync();
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Home screen loads with animated title
- [ ] Verse of the day displays correctly
- [ ] Progress counter shows correct numbers
- [ ] "Start Quest" navigates to levels
- [ ] Levels screen displays all 6 levels
- [ ] Level 1 is unlocked by default
- [ ] Other levels are locked initially
- [ ] Clicking locked level shows lock icon
- [ ] Clicking unlocked level opens puzzle game
- [ ] Tiles shuffle correctly on game start
- [ ] Move counter increments on each swap
- [ ] Timer starts and counts up
- [ ] Can successfully solve puzzle
- [ ] Victory badge appears when solved
- [ ] Story modal shows with animation
- [ ] Completing story unlocks next level
- [ ] Back button returns to levels
- [ ] Restart button re-shuffles puzzle
- [ ] Move limit prevents further moves
- [ ] Completion saves to AsyncStorage

### UI/UX Tests
- [ ] All text readable on small screens
- [ ] Colors match design system
- [ ] Animations smooth on target devices
- [ ] Buttons respond with visual feedback
- [ ] Touch targets are adequate (44pt minimum)
- [ ] Images load without errors
- [ ] Modal animations are smooth
- [ ] Navigation transitions are smooth

### Performance Tests
- [ ] App starts within 2 seconds
- [ ] Puzzle grid renders smoothly
- [ ] No memory leaks during play
- [ ] Storage operations complete quickly
- [ ] Animations maintain 60fps

## 🔍 Debugging

### Common Issues

**1. White screen on startup**
```bash
npm start
# Clear cache: npm start -- -c
```

**2. Images not loading**
- Check internet connection
- Verify image URLs are valid
- Check console for specific errors

**3. Storage not persisting**
```javascript
// Test storage in App.js
import { saveProgress, getProgress } from './src/utils/storage';

// Save test
await saveProgress(1, true);

// Load test
const progress = await getProgress();
console.log('Progress:', progress);
```

**4. Animations stuttering**
- Reduce complexity of animations
- Check device performance
- Enable "Show fps monitor" in dev menu

### Console Debugging

Press `d` while app is running to open developer menu:
- Reload JavaScript
- Toggle element inspector
- Show performance metrics
- View network requests

## 📦 Building for Production

### iOS Build
```bash
eas build --platform ios
```

### Android Build
```bash
eas build --platform android
```

### Configuration
Update `app.json` with:
- Correct bundle identifiers
- Version numbers
- Icons and splash screens
- Build parameters

## 🚀 Deployment

### Using Expo Go (Testing)
1. Run `npm start`
2. Scan QR code with Expo Go app
3. Share link with others for testing

### Creating Standalone App
```bash
# Build and download APK/IPA
eas build --platform android
eas build --platform ios
```

### App Store Submission
1. Create Apple Developer account
2. Create Google Play Developer account
3. Follow respective store guidelines
4. Submit builds for review

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage API](https://react-native-async-storage.github.io/async-storage/)

## ⚙️ Environment Variables

Create `.env` file (copy from `.env.example`):
```
AUDIO_ENABLED=true
DEFAULT_GRID_SIZE=4
MAX_MOVES_MULTIPLIER=1.0
```

## 🐛 Reporting Issues

1. Check existing GitHub issues
2. Include:
   - Device type and OS version
   - Steps to reproduce
   - Expected vs actual behavior
   - Console errors/logs

## 💡 Tips & Tricks

### Performance Optimization
- Use `React.memo()` for frequently re-rendered components
- Implement `useMemo()` for expensive calculations
- Profile with Expo's built-in tools

### Testing on Device
- Use `expo publish` to share app with team
- Use Expo tunnel for testing on real devices
- Enable developer mode in app settings

### Local Images (Offline Mode)
Replace Unsplash URLs with local assets:
```javascript
image: require('../assets/images/creation.jpg'),
```

---

**Happy developing! 🎮📖**
