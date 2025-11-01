# ✨ Bible Puzzle Quest - Feature Documentation

## Core Features

### 1. Home Screen
**Location**: `src/screens/HomeScreen.js`

#### Features
- **Animated Title**: Cascading appearance of "Bible Puzzle Quest"
- **Verse of the Day**: Randomly selected from 8 inspirational verses
- **Progress Counter**: Shows completed levels vs. total (e.g., "2/6")
- **Action Buttons**:
  - "Start/Continue Quest" - Navigates to level selection
  - "Select Level" - Direct link to level selection
- **Smooth Animations**: All elements animate in with spring physics

#### User Experience
```
Page Load
  ├─ Title slides down (200ms delay)
  ├─ Verse fades in (400ms delay)
  ├─ Progress display fades in (600ms delay)
  └─ Buttons scale up (800ms+ delays)
```

#### Customization
- Edit `VERSES` array in `src/constants/levels.js` to change verses
- Modify animation delays in animation setup
- Change button text based on `completedCount`

---

### 2. Level Selection Screen
**Location**: `src/screens/LevelSelectionScreen.js`

#### Features
- **Level Grid**: All 6 biblical levels displayed as cards
- **Progressive Unlocking**:
  - Level 1 always unlocked
  - Subsequent levels unlock after previous completion
- **Visual Indicators**:
  - Lock icon with "Locked" text on unavailable levels
  - ✓ "Completed" badge on finished levels
  - Bible reference and story title on each card
- **Progress Tracking**: Badge shows "X/6" levels completed
- **Back Navigation**: Return to home screen

#### Level Cards
Each card displays:
- Background image from the biblical story
- Level number (1-6)
- Story title
- Bible reference (e.g., "Genesis 1")
- Lock state (if applicable)
- Completion status (if applicable)

#### Animations
```
Screen Load
  └─ Cards fade in (staggered, 50ms intervals)

Card Interaction
  └─ Scale down to 0.95 on press
  └─ Scale back to 1.0
  └─ Navigate to game (if unlocked)
```

#### Progression Logic
```javascript
// Only unlocked if previous level is completed
isUnlocked(levelId) {
  if (levelId === 1) return true;
  return progress[levelId - 1] === true;
}
```

---

### 3. Game Screen (Puzzle)
**Location**: `src/screens/GameScreen.js`

#### Core Game Mechanics

##### Puzzle Grid
- **Tile-Based Sliding Puzzle**: Click two adjacent tiles to swap
- **Grid Sizes by Level**:
  - Levels 1-2: 4x4 (16 tiles)
  - Levels 3-5: 5x5 (25 tiles)
  - Level 6: 6x6 (36 tiles)
- **Shuffled Tiles**: Tiles randomly shuffled at game start
- **Tile Selection**:
  - Tap first tile to select (highlighted in gold)
  - Tap second tile to swap
  - Tap same tile to deselect

##### Game Stats Display
```
┌──────────────────────────────────┐
│  Moves  │  Limit  │  Remaining   │
│  23     │   50    │     27       │
└──────────────────────────────────┘
```

- **Moves**: Current number of swaps made
- **Limit**: Maximum allowed moves for this level
- **Remaining**: Moves left before game over (green if positive, red if exceeded)

##### Timer
- Top-right corner shows elapsed time
- Format: M:SS (e.g., 1:45 = 1 minute 45 seconds)
- Starts when game begins
- Stops when puzzle solved

##### Control Buttons
- **🔄 Restart**: Reshuffles the puzzle, resets moves and timer
- **← Back**: Returns to level selection (loses current progress)

##### Win Condition
```
Puzzle Solved When:
  ├─ All tiles are in correct positions
  ├─ isPuzzleSolved(tiles) returns true
  └─ Victory animation triggers
```

##### Loss Condition
```
Game Over When:
  └─ moveCount >= maxMoves
  └─ Alert dialog offers: Retry or Back to Levels
```

#### Victory Flow
```
Puzzle Completed
  │
  ├─ victoryScale animates 0 → 1
  ├─ Game paused (timer stops)
  ├─ Victory badge appears: "✨ SOLVED! ✨"
  ├─ Victory sound plays (if enabled)
  ├─ Progress saved to AsyncStorage
  ├─ Next level unlocked (if available)
  │
  └─ After brief delay:
     └─ Story modal appears with animation
```

#### Story Revelation
After solving, a modal appears showing:
- ✨ "You've Unlocked ✨" header
- Story title (e.g., "Creation")
- Bible reference (e.g., "Genesis 1")
- Full story text (2-3 paragraphs)
- "Continue" button → returns to level selection

---

### 4. Story Modal
**Location**: `src/components/StoryModal.js`

#### Features
- **Beautiful Presentation**: Gradient background with overlay
- **Scrollable Content**: Long stories can be read fully
- **Bible Context**: Shows official Bible reference
- **Action Buttons**:
  - **Close**: Closes modal without continuing
  - **Continue**: Progresses to next level (if available)

#### Animation Behavior
```
Modal Appears
  └─ Opacity: 0 → 1 (spring animation)
  └─ Scale: 0.5 → 1.0 (spring animation)

Modal Closes
  └─ Reverse of above
  └─ Navigation to level selection happens after animation
```

#### Styling
- Gradient: Primary to Secondary color
- Border radius: 20pt (rounded corners)
- Shadow: Large drop shadow for depth
- Max width: 85% of screen
- Max height: 80% of screen

---

### 5. Puzzle Grid Component
**Location**: `src/components/PuzzleGrid.js`

#### Features
- **Responsive Grid Layout**: Adapts to any grid size
- **Visual Feedback**:
  - Selected tile highlighted with gold border
  - Tile scales up slightly when selected
  - Adjacent tiles can be identified by their position
- **Image Integration**: Background image tiled across puzzles
- **Performance Optimized**: Smooth animations at 60fps

#### Tile Selection System
```javascript
// Single selection system
if (selectedIndex === null) {
  // First tap: select tile
  setSelectedIndex(index);
} else if (selectedIndex === index) {
  // Second tap on same tile: deselect
  setSelectedIndex(null);
} else {
  // Tap different tile: attempt swap
  handleTilePress(selectedIndex, index);
  setSelectedIndex(null);
}
```

#### Visual Elements Per Tile
- **Border**: 2pt (normal), 4pt and gold (selected)
- **Scale**: 1.0 (normal), 1.05 (selected) via animation
- **Background**: Image portion corresponding to its position
- **Touch Feedback**: Opacity change on press

---

### 6. Level Card Component
**Location**: `src/components/LevelCard.js`

#### Features
- **Image Background**: Biblical scene from Unsplash
- **Gradient Overlay**: Dark overlay for readability
- **Lock Icon**: Large padlock on locked levels
- **Completion Badge**: Green checkmark on completed levels
- **Text Content**:
  - "Level X" label in gold
  - Story title in white (24pt, bold)
  - Bible reference in light gray (italic)

#### Interaction
- Disabled state when locked (opacity: 0.6)
- Scale animation on press (0.95x)
- Only navigates to game if unlocked

#### Styling Hierarchy
```
LevelCard (Outer)
  └─ ImageBackground (image)
     └─ LinearGradient (dark overlay)
        └─ Content
           ├─ Level Number (gold, 12pt)
           ├─ Title (white, 24pt, bold)
           ├─ Reference (light gray, 12pt, italic)
           ├─ Lock Badge (conditionally, centered)
           └─ Completion Badge (conditionally, top-right)
```

---

### 7. Data Persistence System
**Location**: `src/utils/storage.js`

#### Features
- **AsyncStorage Integration**: Reliable device storage
- **Progress Tracking**: Boolean per level (completed or not)
- **Statistics Recording**: Moves and time per level
- **Data Backup**: Easy export/reset capability

#### Key Functions

##### `saveProgress(levelId, completed)`
```javascript
// Saves completion status for a specific level
await saveProgress(2, true); // Mark level 2 as complete
// Result: @biblepuzzlequest_progress → { 1: true, 2: true, ... }
```

##### `getProgress()`
```javascript
// Retrieves all progress data
const progress = await getProgress();
// Result: { 1: true, 2: true, 3: false, ... }
```

##### `saveLevelStats(levelId, stats)`
```javascript
// Saves detailed game statistics
await saveLevelStats(1, {
  moves: 45,
  time: 235,
  completed: true
});
```

##### `getLevelStats(levelId)`
```javascript
// Retrieves stats for a specific level
const stats = await getLevelStats(1);
// Result: { moves: 45, time: 235, completed: true }
```

---

### 8. Puzzle Logic
**Location**: `src/utils/puzzleLogic.js`

#### Core Algorithms

##### Tile Shuffling
```javascript
shuffle(array)
  └─ Fisher-Yates algorithm
  └─ O(n) time complexity
  └─ Ensures random, uniform distribution
```

##### Adjacency Detection
```javascript
getAdjacentTiles(position, gridSize)
  ├─ Calculate row and column from position
  ├─ Check all 4 directions (up, down, left, right)
  ├─ Validate boundaries
  └─ Return array of adjacent positions
```

##### Win Detection
```javascript
isPuzzleSolved(tiles)
  └─ For each tile:
     └─ if (tile.position !== tile.correctPosition) return false
  └─ return true
```

##### Move Validation
```javascript
isValidMove(fromIndex, toIndex, gridSize)
  ├─ Get adjacent tiles to fromIndex
  └─ return adjacent.includes(toIndex)
```

---

### 9. Color System
**Location**: `src/constants/colors.js`

#### Color Palette
| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Purple | #6B46C1 | Main gradient, buttons |
| Secondary | Pink | #EC4899 | Secondary gradient |
| Accent | Teal | #14B8A6 | Highlights, borders |
| Dark | Very Dark Blue | #1a1a2e | Backgrounds |
| Darker | Almost Black | #0f0f1e | Deep backgrounds |
| Gold | Gold | #F59E0B | Highlights, success |
| Success | Green | #10B981 | Victory, completion |

#### Gradient Combinations
```javascript
primary: [#6B46C1, #EC4899] // Purple → Pink
secondary: [#1a1a2e, #2d2d4d] // Dark theme
success: [#10B981, #059669] // Green → Dark Green
gold: [#F59E0B, #D97706] // Gold → Darker Gold
```

---

## Advanced Features

### Animation System
**Framework**: React Native Reanimated 3

#### Animation Types Used
1. **Spring Animations**: Natural, bouncy movements
2. **Timing Animations**: Linear, smooth transitions
3. **Delayed Animations**: Sequential appearance effects
4. **Repeating Animations**: Continuous background effects

#### Performance
- Runs on native thread (not JS thread)
- 60fps capable
- GPU accelerated
- No frame drops during gameplay

### Audio System
**Framework**: expo-av

#### Current Capabilities
- Audio initialization on app start
- Victory sound ready to integrate
- Background music framework
- Audio mode configuration

#### Future Integration
```javascript
// Victory sound example (ready to implement)
const victorySound = new Audio.Sound();
await victorySound.loadAsync(require('../assets/victory.mp3'));
await victorySound.playAsync();
```

### Navigation System
**Framework**: React Navigation

#### Navigation Structure
```
Stack Navigator (Root)
├─ HomeScreen (initial route)
├─ LevelSelectionScreen (push)
└─ GameScreen (push)
```

#### Route Parameters
```javascript
// Navigate to game with level data
navigation.navigate('Game', { level: LEVELS[0] })

// In GameScreen
const { level } = route.params;
```

---

## User Flows

### New Player Journey
```
App Start
  │
  ├─ See Home Screen
  ├─ Read verse of the day
  ├─ Tap "Start Quest"
  │
  ├─ See Level Selection
  ├─ Only Level 1 unlocked
  ├─ Tap Level 1 card
  │
  ├─ Play Puzzle Game
  ├─ Solve puzzle within moves
  ├─ See Victory badge
  │
  ├─ Story Modal appears
  ├─ Read biblical story
  ├─ Tap "Continue"
  │
  ├─ Back to Level Selection
  ├─ Level 2 now unlocked
  │
  └─ Repeat for remaining levels
```

### Returning Player Journey
```
App Start
  │
  ├─ See Home Screen
  ├─ Progress shows "3/6"
  ├─ Tap "Continue Quest"
  │
  ├─ See Level Selection
  ├─ Levels 1-3 unlocked
  ├─ Levels 1-2 have ✓ badges
  │
  ├─ Choose Level 4 (next unlock)
  ├─ Solve or retry as needed
  │
  └─ Continue journey
```

### Retry Flow
```
Fail Puzzle
  │
  ├─ Exceed move limit
  ├─ Alert: "Out of Moves"
  ├─ Options: Retry or Back to Levels
  │
  ├─ Tap Retry
  ├─ Tiles reshuffled
  ├─ Moves reset to 0
  ├─ Timer reset to 0:00
  │
  └─ Continue playing
```

---

## Future Feature Roadmap

### Short Term (v1.1)
- [ ] Audio effects implementation
- [ ] Hint system for difficult puzzles
- [ ] Difficulty settings (Easy/Normal/Hard)

### Medium Term (v1.2)
- [ ] Leaderboards (local and cloud)
- [ ] Achievement system
- [ ] Statistics dashboard
- [ ] Social sharing

### Long Term (v2.0)
- [ ] Additional biblical stories (expansion pack)
- [ ] Multiplayer mode
- [ ] Story continuation (deeper narratives)
- [ ] Offline mode with downloaded images
- [ ] Multiple languages/localization

---

## Quality Metrics

### Performance Targets
- App startup: < 2 seconds
- Screen transitions: < 300ms
- Puzzle grid render: 60fps
- Storage operations: < 200ms
- Memory usage: < 150MB

### User Experience Goals
- All text readable at minimum 12pt
- Touch targets minimum 44pt
- 99% crash-free rate
- Smooth animations throughout
- Intuitive navigation

---

**Feature Set Version**: 1.0.0
**Last Updated**: November 2024
