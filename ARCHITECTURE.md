# 🏗️ Bible Puzzle Quest - Architecture Guide

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    App.js (Entry Point)                 │
│                                                         │
│  • Initializes audio and splash screen                 │
│  • Sets up gesture handler root                        │
│  • Manages app ready state                             │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────▼──────────────┐
        │   RootNavigator.js        │
        │ (Stack Navigation Setup)  │
        └────┬──────────────────┬───┘
             │                  │
    ┌────────▼─────┐    ┌──────▼──────────┐
    │  HomeScreen  │    │ LevelSelection  │      ┌─────────────┐
    │              │    │     Screen      │──────┤ GameScreen  │
    │ • Title      │    │                 │      │             │
    │ • Verse      │    │ • Level List    │      │ • Puzzle    │
    │ • Progress   │    │ • Lock Icons    │      │ • Timer     │
    │ • Buttons    │    │ • Cards         │      │ • Moves     │
    └──────────────┘    └─────────────────┘      └──────┬──────┘
                                                         │
                              ┌──────────────────────────▼────┐
                              │    StoryModal Component        │
                              │ (Victory & Story Revelation)   │
                              └────────────────────────────────┘
```

## Data Flow Architecture

```
┌─────────────────────────────────────────┐
│      CONSTANTS Layer                    │
├─────────────────────────────────────────┤
│ • levels.js (6 levels + stories)        │
│ • colors.js (design system)             │
│ • verses.js (inspirational quotes)      │
└──────────┬──────────────────────────────┘
           │
┌──────────▼──────────────────────────────┐
│      COMPONENTS Layer                   │
├──────────────────────────────────────────┤
│ • PuzzleGrid.js (tile interaction)      │
│ • StoryModal.js (modal display)         │
│ • LevelCard.js (level presentation)     │
│ • AnimatedBackground.js (effects)       │
└──────────┬──────────────────────────────┘
           │
┌──────────▼──────────────────────────────┐
│      SCREENS Layer                      │
├──────────────────────────────────────────┤
│ • HomeScreen.js (entry point)           │
│ • LevelSelectionScreen.js (progression) │
│ • GameScreen.js (gameplay logic)        │
└──────────┬──────────────────────────────┘
           │
┌──────────▼──────────────────────────────┐
│      UTILS Layer                        │
├──────────────────────────────────────────┤
│ • puzzleLogic.js (game mechanics)       │
│ • storage.js (AsyncStorage)             │
│ • audio.js (sound management)           │
└─────────────────────────────────────────┘
```

## Component Hierarchy

```
App (Root)
│
└─ RootNavigator
   │
   ├─ HomeScreen
   │  └─ Animated Views
   │     └─ TouchableOpacity (Buttons)
   │
   ├─ LevelSelectionScreen
   │  ├─ Header
   │  │  ├─ BackButton
   │  │  ├─ Title
   │  │  └─ ProgressBadge
   │  │
   │  └─ ScrollView
   │     └─ LevelCard (x6)
   │        ├─ ImageBackground
   │        ├─ LinearGradient
   │        ├─ LevelInfo
   │        ├─ LockIcon (conditional)
   │        └─ CompletedBadge (conditional)
   │
   └─ GameScreen
      ├─ Header
      │  ├─ BackButton
      │  ├─ LevelInfo
      │  └─ Timer
      │
      ├─ PuzzleGrid
      │  ├─ StatsContainer
      │  │  ├─ Moves
      │  │  ├─ Limit
      │  │  └─ Remaining
      │  │
      │  └─ Grid
      │     └─ PuzzleTile (x16-36)
      │        └─ TouchableOpacity
      │
      ├─ ControlButtons
      │  ├─ RestartButton
      │  └─ BackButton
      │
      └─ StoryModal
         ├─ Header
         │  ├─ Celebration
         │  ├─ Title
         │  └─ BibleRef
         │
         ├─ ScrollView
         │  └─ StoryText
         │
         └─ Footer
            ├─ CloseButton
            └─ ContinueButton
```

## State Management Strategy

### App-Level State
- **Managed by**: Each screen/component using React Hooks
- **Pattern**: useState for local state
- **Persistence**: AsyncStorage for progress data

### Screen-Level State

**HomeScreen**
- `verse`: String - verse of the day
- `completedCount`: Number - levels completed

**LevelSelectionScreen**
- `progress`: Object - completion status per level
- `loading`: Boolean - async data loading

**GameScreen**
- `tiles`: Array - current puzzle state
- `moveCount`: Number - moves made
- `timer`: Number - elapsed seconds
- `gameStarted`: Boolean - game status
- `showStory`: Boolean - modal visibility
- `isComplete`: Boolean - puzzle solved

## Data Persistence Model

### AsyncStorage Structure

```
@biblepuzzlequest_progress: {
  1: true,    // Level 1 completed
  2: true,    // Level 2 completed
  3: false,   // Level 3 incomplete
  ...
}

@biblepuzzlequest_gamedata: {
  1: {
    moves: 45,
    time: 235,
    completed: true
  },
  2: {
    moves: 52,
    time: 189,
    completed: true
  },
  ...
}
```

## Animation Architecture

### Reanimated Patterns Used

1. **Spring Animations**
   - Button interactions
   - Modal appearance
   - Scale transformations
   ```javascript
   scale.value = withSpring(1, { damping: 6 })
   ```

2. **Timing Animations**
   - Sequential delays
   - Opacity transitions
   ```javascript
   opacity.value = withDelay(200, withSpring(1))
   ```

3. **Repeating Animations**
   - Background effects
   - Pulsing elements
   ```javascript
   opacity.value = withRepeat(withTiming(...), -1, true)
   ```

4. **Layout Animations**
   - List transitions
   - Card additions
   ```javascript
   layout={Layout.springify()}
   ```

## Game Logic Flow

### Puzzle Generation
```
generatePuzzleTiles(gridSize)
├─ Create array of tile objects
├─ Each tile has:
│  ├─ id (unique identifier)
│  ├─ position (current location)
│  └─ correctPosition (target location)
└─ Shuffle tiles randomly
```

### Move Validation
```
isValidMove(fromIndex, toIndex, gridSize)
├─ Get adjacent tiles to fromIndex
├─ Check if toIndex is adjacent
└─ Return boolean
```

### Win Condition
```
isPuzzleSolved(tiles)
├─ For each tile:
│  └─ Check position === correctPosition
└─ All match? → Victory!
```

### Move Processing
```
handleTilePress(index1, index2)
├─ Validate move
├─ Swap tiles if valid
├─ Increment moveCount
├─ Check win condition
├─ Check move limit
└─ Trigger appropriate response
```

## Navigation Flow

```
START
  │
  ▼
┌──────────────────┐
│   HomeScreen     │
│  (Entry Point)   │
└────┬──────────┬──┘
     │ (tap)    │ (tap)
     │          │
     ▼          ▼
┌──────────────────────────┐
│ LevelSelectionScreen      │
│  (Choose level)           │
└────┬─────────────────┬───┘
     │ (locked)        │ (unlocked)
     ▼                 ▼
  [Lock UI]      ┌─────────────────┐
                 │  GameScreen     │
                 │ (Play puzzle)   │
                 └────┬────────┬───┘
                      │        │
            (not solve) │       │ (solved)
                      │        ▼
                      │    ┌─────────────┐
                      │    │StoryModal   │
                      │    │(Story)      │
                      │    └────┬────────┘
                      │         │
                      ▼         ▼
                  [Back]    [Continue]
                    │           │
                    └─────┬─────┘
                          │
                          ▼
                    ┌──────────────────┐
                    │ LevelSelection   │
                    │ (Progress saved) │
                    └──────────────────┘
```

## Performance Optimization Strategies

### Rendering Optimization
- **Memoization**: React.memo() for card components
- **List Optimization**: FlatList potential future upgrade
- **Lazy Loading**: Images load from network

### Animation Performance
- **GPU Acceleration**: Using Reanimated (native thread)
- **60 FPS Target**: Optimized animation values
- **No Blocking**: Async operations don't freeze UI

### Memory Management
- **Cleanup**: useEffect cleanups for timers
- **Audio Unload**: Audio resources properly unloaded
- **Image Caching**: React Native handles image caching

## Error Handling Strategy

### Try-Catch Blocks
- Storage operations
- Audio initialization
- Network image loading

### User Feedback
- Alert dialogs for critical errors
- Console logging for debugging
- Graceful fallbacks

### Recovery
- Restart level if failed
- Back to levels if error
- Continue operation if possible

## Accessibility Considerations

### Touch Targets
- Minimum 44pt for all buttons
- Adequate spacing between interactive elements

### Text Contrast
- All text meets WCAG AA standards
- High contrast colors for readability

### User Feedback
- Visual response to interactions
- Haptic feedback opportunity (future)
- Sound effects for confirmations

## Scalability Notes

### Adding New Levels
1. Add entry to LEVELS array in constants/levels.js
2. Increase total level count references
3. Update difficulty progression

### Expanding Features
1. Add new screen to navigation
2. Create corresponding components
3. Integrate with storage system
4. Add to navigation flow

### Localization (Future)
- Extract all text to i18n file
- Use language-specific images
- Support RTL languages

---

**Architecture Version**: 1.0
**Last Updated**: November 2024
