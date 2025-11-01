# 🚀 Bible Puzzle Quest - Quick Start Guide

## 30-Second Setup

```bash
# 1. Navigate to project
cd /Users/yosef/Documents/Projects/ChristianPuzzle/WordPuzzle

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Scan QR code with Expo Go app or press 'i' for iOS / 'a' for Android
```

## What You Get

A complete, production-ready Expo React Native game with:

✅ **6 Interactive Levels** (all biblical stories)
✅ **Tile Sliding Puzzles** (4x4, 5x5, 6x6 grids)
✅ **Progress Persistence** (AsyncStorage)
✅ **Beautiful Animations** (Reanimated 3)
✅ **Story Revelations** (modal with full stories)
✅ **Victory Celebrations** (animated badges)

## File Overview

### Core Files (Must Know)
- **`App.js`** - Main entry point
- **`src/screens/HomeScreen.js`** - Home/welcome screen
- **`src/screens/LevelSelectionScreen.js`** - Level picker
- **`src/screens/GameScreen.js`** - Main puzzle gameplay
- **`src/constants/levels.js`** - All 6 biblical levels + stories

### Components (Optional but Nice to Know)
- **`src/components/PuzzleGrid.js`** - Tile puzzle display
- **`src/components/StoryModal.js`** - Story revelation modal
- **`src/components/LevelCard.js`** - Level preview cards

### Utilities (Advanced)
- **`src/utils/puzzleLogic.js`** - Game mechanics (shuffling, validation, win detection)
- **`src/utils/storage.js`** - Save/load progress
- **`src/utils/audio.js`** - Audio management

### Configuration
- **`app.json`** - Expo app configuration
- **`package.json`** - Dependencies
- **`babel.config.js`** - Babel/Reanimated setup

## Quick Customization

### Change Game Colors
**File**: `src/constants/colors.js`

```javascript
export const COLORS = {
  primary: '#YOUR_COLOR_HERE',    // Change this
  secondary: '#YOUR_COLOR_HERE',  // And this
  gold: '#YOUR_COLOR_HERE',       // And this
};
```

### Add New Level
**File**: `src/constants/levels.js`

```javascript
{
  id: 7,
  title: 'Your Story',
  bibleRef: 'Your Reference',
  image: 'https://your-image-url.com/image.jpg',
  story: `Your full biblical story text...`,
  moves: 80,
  gridSize: 6,
}
```

### Change Verses of the Day
**File**: `src/constants/levels.js`

```javascript
export const VERSES = [
  '"Your verse here." - Reference',
  // Add more verses...
];
```

## Testing Checklist (5 minutes)

- [ ] App starts (shows home screen with title)
- [ ] Tap "Start Quest" → goes to levels
- [ ] Level 1 is unlocked, others are locked
- [ ] Tap Level 1 → enters puzzle game
- [ ] Click two tiles → they swap
- [ ] Move counter increments
- [ ] Timer counts up
- [ ] Solve puzzle → victory badge appears
- [ ] Story modal shows → tap continue
- [ ] Back to levels → Level 2 unlocked
- [ ] Back to home → progress shows "1/6"

## Understanding the Game Flow

```
HOME SCREEN (Entry Point)
  ↓ (Tap "Start Quest")
LEVEL SELECTION
  ↓ (Tap Level 1 - only unlocked level)
GAME SCREEN (Puzzle)
  ↓ (Solve puzzle)
STORY MODAL (Victory + Story)
  ↓ (Tap "Continue")
LEVEL SELECTION (Level 2 now unlocked)
  ↓ (Tap Level 2)
GAME SCREEN (Puzzle)
  ... (Repeat for all 6 levels)
```

## Debugging Tips

### White Screen?
```bash
npm start
# Press 'c' to clear cache
```

### Changes not showing?
```bash
# Kill the server (Ctrl+C)
npm start
# Press 'r' to reload JavaScript
```

### Storage issues?
```javascript
// In App.js, test storage:
import { clearAllData, getProgress } from './src/utils/storage';

// Clear all data if corrupted:
await clearAllData();
```

### Slow animations?
- Reduce animation complexity in components
- Check device performance (use older device to test)
- Enable dev menu: Press 'd' → "Perf Monitor"

## Project Size

```
Total Code: ~2000 lines
  ├─ Screens: ~650 lines
  ├─ Components: ~500 lines
  ├─ Utilities: ~300 lines
  ├─ Constants: ~150 lines
  └─ Config: ~150 lines

Assets: Loaded from Unsplash (no local files yet)
Dependencies: 12 npm packages
```

## Key Technologies

| What | Where | Why |
|------|-------|-----|
| React Native | Full app | Mobile framework |
| Expo SDK 51 | Configuration | Easy development |
| React Navigation | Navigation | Screen routing |
| Reanimated 3 | Animations | 60fps smooth effects |
| AsyncStorage | Data | Persistent progress |
| Linear Gradient | UI | Beautiful backgrounds |

## Common Tasks

### To reset player progress:
```javascript
import { clearAllData } from './src/utils/storage';
await clearAllData();
```

### To test storage:
```javascript
import { saveProgress, getProgress } from './src/utils/storage';
await saveProgress(1, true);  // Save level 1 as complete
const progress = await getProgress();
console.log('Progress:', progress);
```

### To change move limits:
**File**: `src/constants/levels.js`

```javascript
{
  id: 1,
  title: 'Creation',
  moves: 50,  // Change this number (was 50, now maybe 30 for harder)
  gridSize: 4,
  // ...
}
```

### To change grid difficulty:
```javascript
{
  id: 3,
  title: 'David and Goliath',
  gridSize: 5,  // Was 5, change to 6 for harder
  // ...
}
```

## Deployment Quick Reference

### Test on Device
```bash
npm start
# Scan QR code with Expo Go app
```

### Build APK (Android)
```bash
eas build --platform android
```

### Build IPA (iOS)
```bash
eas build --platform ios
```

### Deploy Updates
```bash
eas update
```

## Documentation Map

- **README.md** - Full project overview
- **SETUP.md** - Detailed setup and configuration
- **FEATURES.md** - Complete feature documentation
- **ARCHITECTURE.md** - System design and structure
- **QUICK_START.md** - This file (quick reference)

## Support Resources

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)

## Version Info

- **Game Version**: 1.0.0
- **Expo SDK**: 51+
- **React Native**: 0.74.0
- **Created**: November 2024

## Next Steps

1. ✅ Run the project
2. ✅ Test the game flow
3. ✅ Customize colors/content
4. ✅ Build for your platform
5. ✅ Deploy to app store

---

**You're all set! Happy coding! 🎮📖**
