# 📖 Bible Puzzle Quest

A spiritually inspired puzzle adventure game built with Expo React Native (SDK 51+). Combine Bible storytelling with interactive puzzle gameplay to unlock sacred stories from the Bible.

## 🎮 Game Overview

Bible Puzzle Quest is a mobile game that takes players on a journey through six biblical stories through sliding puzzle gameplay. Each completed puzzle unlocks a new chapter of biblical history.

### Stories Included
1. **Creation** (Genesis 1) - God's creation of the world and humanity
2. **Noah's Ark** (Genesis 6-9) - The great flood and covenant
3. **David and Goliath** (1 Samuel 17) - Faith triumphs over might
4. **Daniel's Faith** (Daniel 6) - Divine protection in the lion's den
5. **Jesus Calms the Storm** (Mark 4:35-41) - Peace in turbulent times
6. **Resurrection** (Luke 24) - Victory over death and hope eternal

## ✨ Features

- **Animated Home Screen** with verse of the day and progress tracking
- **Progressive Level System** with lock mechanics
- **Interactive Tile Puzzles** with move counters and time tracking
- **Victory Animations** with story revelations
- **Persistent Progress** using AsyncStorage
- **Beautiful UI** with gradient backgrounds and smooth animations
- **Spiritual Theme** with biblical references and inspirational quotes

## 🛠️ Technology Stack

- **Framework**: Expo SDK 51+
- **React Native**: 0.74.0
- **Navigation**: React Navigation (Stack Navigator)
- **State Management**: React Hooks
- **Animations**: React Native Reanimated 3
- **Storage**: AsyncStorage
- **Styling**: React Native Paper, Linear Gradient
- **Audio**: expo-av (for future sound effects)

## 📋 Project Structure

```
bible-puzzle-quest/
├── App.js                          # Main app entry point
├── index.js                        # Root component registration
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── .gitignore
├── README.md
└── src/
    ├── screens/
    │   ├── HomeScreen.js           # Home/start screen
    │   ├── LevelSelectionScreen.js # Level selection and progress
    │   └── GameScreen.js           # Main puzzle game screen
    ├── components/
    │   ├── AnimatedBackground.js   # Reusable animated background
    │   ├── PuzzleGrid.js           # Tile puzzle grid component
    │   ├── StoryModal.js           # Story revelation modal
    │   └── LevelCard.js            # Level selection card
    ├── navigation/
    │   └── RootNavigator.js        # Navigation configuration
    ├── utils/
    │   ├── storage.js              # AsyncStorage operations
    │   ├── puzzleLogic.js          # Puzzle game logic
    │   └── audio.js                # Audio management
    └── constants/
        ├── levels.js               # Level data and Bible stories
        └── colors.js               # Color palette and gradients
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Expo CLI installed globally (`npm install -g expo-cli`)
- iOS/Android emulator or physical device with Expo Go app

### Installation

1. **Install dependencies**:
```bash
npm install
# or
yarn install
```

2. **Start the development server**:
```bash
npm start
# or
yarn start
```

3. **Run on iOS or Android**:
```bash
# For iOS
npm run ios

# For Android
npm run android

# Or scan QR code with Expo Go app on your device
```

## 📱 Screens & Navigation

### Home Screen
- Welcome message with animated title
- Verse of the day (randomly selected)
- Progress display (completed levels / total levels)
- "Start Quest" or "Continue Quest" button
- Level selection button

### Level Selection Screen
- Grid view of all 6 levels
- Lock icons on unavailable levels
- Completion badges on finished levels
- Smooth animations and transitions
- Progress percentage display

### Game Screen
- Tile-based sliding puzzle
- Real-time move counter
- Timer display
- Restart and back buttons
- Dynamic difficulty (move limits increase with level)

### Story Modal
- Victory celebration animation
- Full biblical story text
- Bible reference citation
- Close and continue buttons

## 🎮 Game Mechanics

### Puzzle System
- **Sliding Tile Puzzle**: Click two adjacent tiles to swap them
- **Grid Sizes**: 4x4 (Level 1-2), 5x5 (Level 3-5), 6x6 (Level 6)
- **Move Limits**: Each level has a maximum number of allowed moves
- **Win Condition**: Arrange all tiles in correct positions
- **Progress Saving**: Completion automatically saves and unlocks next level

### Progression
- Level 1 starts unlocked
- Completing a level unlocks the next
- Progress is saved automatically to device storage
- Players can return to any unlocked level at any time

## 🎨 Design System

### Colors
- **Primary**: Deep Purple (#6B46C1)
- **Secondary**: Pink (#EC4899)
- **Accent**: Teal (#14B8A6)
- **Gold**: #F59E0B (for highlights)
- **Success**: Green (#10B981)

### Animations
- Spring animations for button interactions
- Fade transitions between screens
- Scale animations for victory moments
- Repeating opacity animations for background effects

## 📊 Data Persistence

Progress is automatically saved using AsyncStorage with the following structure:

```javascript
// Progress storage
{
  "1": true,  // Level 1 completed
  "2": false, // Level 2 not completed
  // ... etc
}

// Game statistics
{
  "1": {
    moves: 45,
    time: 120,
    completed: true
  },
  // ... per level stats
}
```

## 🔄 API & External Resources

### Images
- Biblical scene images from Unsplash (free, high quality)
- Dynamic loading from URLs (can be replaced with local assets)

### Audio (Future)
- Victory sound effects ready to be integrated
- Background music support framework in place

## 🐛 Known Limitations & Future Improvements

### Current Limitations
- Images loaded from Unsplash (internet required)
- Audio system initialized but sounds not yet implemented
- No multiplayer or cloud save features

### Future Enhancements
- [ ] Custom audio effects and background music
- [ ] Difficulty settings (easy/normal/hard)
- [ ] Leaderboards and statistics
- [ ] Social sharing of achievements
- [ ] Offline mode with bundled images
- [ ] Dark mode toggle
- [ ] Additional biblical stories (expansion pack)
- [ ] Hint system for stuck players
- [ ] Achievements and badges system

## 📖 Biblical References

All stories included are directly from the Bible with accurate retellings:

1. **Genesis 1** - Creation story
2. **Genesis 6-9** - Noah's flood narrative
3. **1 Samuel 17** - David defeats Goliath
4. **Daniel 6** - Daniel in the lion's den
5. **Mark 4:35-41** - Jesus calms the storm
6. **Luke 24** - Resurrection of Jesus

## 🙏 Spiritual Purpose

This game is designed to be both entertaining and spiritually enriching, introducing players to important biblical narratives in an interactive and memorable way.

## 📄 License

MIT License - Feel free to use this as a base for your own projects.

## 🤝 Contributing

Contributions are welcome! Feel free to fork, modify, and submit improvements.

## 📧 Support

For issues or questions, please check the project's GitHub repository or refer to the Expo documentation.

---

**Made with ❤️ and faith**
