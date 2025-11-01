# 🎨 Bible Puzzle Quest - Customization Guide

## Visual Customization

### 1. Change Application Colors

**File**: `src/constants/colors.js`

```javascript
// Current color scheme
export const COLORS = {
  primary: '#6B46C1',      // Deep Purple
  secondary: '#EC4899',    // Pink
  accent: '#14B8A6',       // Teal
  dark: '#1a1a2e',         // Dark blue
  darker: '#0f0f1e',       // Very dark
  light: '#F8F9FA',        // Light gray
  white: '#FFFFFF',        // White
  gold: '#F59E0B',         // Gold/Yellow
  success: '#10B981',      // Green
  warning: '#F97316',      // Orange
  error: '#EF4444',        // Red
  gray: '#6B7280',         // Gray
  lightGray: '#E5E7EB',    // Light gray
};
```

### 2. Example: Change to Blue Theme

```javascript
export const COLORS = {
  primary: '#0066CC',      // Bright Blue
  secondary: '#0099FF',    // Light Blue
  accent: '#00CCFF',       // Cyan
  dark: '#001A4D',         // Dark Blue
  darker: '#000D26',       // Very Dark Blue
  gold: '#FFD700',         // Yellow
  // ... rest stays the same
};
```

### 3. Update Gradients

**File**: `src/constants/colors.js`

```javascript
export const GRADIENTS = {
  primary: ['#0066CC', '#0099FF'],     // Blue theme
  secondary: ['#001A4D', '#002B7F'],   // Dark blue
  success: ['#00CC44', '#009933'],     // Green
  gold: ['#FFD700', '#FFA500'],        // Yellow/Orange
};
```

### 4. Change Font Sizes

Search and replace in components:

```javascript
// Before
<Text style={{ fontSize: 32, fontWeight: 'bold' }}>
  Title
</Text>

// After (larger)
<Text style={{ fontSize: 42, fontWeight: 'bold' }}>
  Title
</Text>
```

### 5. Adjust Spacing/Padding

**Example**: Larger padding in HomeScreen

```javascript
const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 30,  // Was 20
    paddingVertical: 30,    // Was 20
  },
});
```

---

## Content Customization

### 1. Modify Biblical Stories

**File**: `src/constants/levels.js`

```javascript
{
  id: 1,
  title: 'Your Custom Title',
  bibleRef: 'Your Bible Reference',
  image: 'https://your-image-url.jpg',
  story: `
    Your complete biblical story text here.
    Can span multiple paragraphs.
    The story will appear in the modal after completing the puzzle.
  `,
  moves: 50,
  gridSize: 4,
}
```

### 2. Change Verses of the Day

**File**: `src/constants/levels.js`

```javascript
export const VERSES = [
  '"In the beginning God created the heavens and the earth." - Genesis 1:1',
  '"The Lord is my light and my salvation." - Psalm 27:1',
  '"Trust in the Lord with all your heart." - Proverbs 3:5',
  // Add more verses...
];
```

### 3. Customize Home Screen Text

**File**: `src/screens/HomeScreen.js`

```javascript
<Text style={styles.title}>📖 Your App Name</Text>
<Text style={styles.titleHighlight}>Here</Text>

<Text style={styles.decorText}>✨ Your Custom Message ✨</Text>

<TouchableOpacity>
  <Text style={styles.primaryButtonText}>
    Your Custom Button Text
  </Text>
</TouchableOpacity>
```

### 4. Change Level Progression System

**Current**: Linear progression (Level 1 → 2 → 3...)

**File**: `src/screens/LevelSelectionScreen.js`

```javascript
// To allow all levels to be unlocked from start:
const isLevelUnlocked = (levelId) => {
  return true;  // All levels unlocked
};

// Or to add skip-level logic:
const isLevelUnlocked = (levelId) => {
  if (levelId === 1) return true;
  if (levelId === 3) return true;  // Skip to 3
  return progress[levelId - 1] === true;
};
```

---

## Game Mechanics Customization

### 1. Change Puzzle Difficulty

**Method A**: Adjust move limits

**File**: `src/constants/levels.js`

```javascript
{
  id: 1,
  title: 'Creation',
  moves: 30,  // Harder (was 50)
  gridSize: 4,
  // ...
},
{
  id: 3,
  title: 'David and Goliath',
  moves: 70,  // Easier (was 60)
  gridSize: 5,
  // ...
}
```

**Method B**: Adjust grid complexity

```javascript
{
  id: 1,
  gridSize: 3,  // Easier: 3x3 grid
  // ...
},
{
  id: 6,
  gridSize: 7,  // Harder: 7x7 grid (49 tiles)
  // ...
}
```

### 2. Change Move Validation

**File**: `src/components/PuzzleGrid.js`

```javascript
// Default: Must be adjacent
const handleTilePress = (index) => {
  if (!isValidMove(index1, index2, level.gridSize)) {
    return; // Invalid move, do nothing
  }
  // Valid move, proceed
};

// Alternative: Allow any swap
const handleTilePress = (index) => {
  // Remove validation check
  const newTiles = swapTiles(tiles, index1, index2);
  setTiles(newTiles);
};
```

### 3. Add Hints System

**New File**: `src/utils/hints.js`

```javascript
export const getHint = (tiles, level) => {
  const unsolvedTiles = tiles.filter(
    t => t.position !== t.correctPosition
  );

  if (unsolvedTiles.length === 0) {
    return 'Puzzle is solved!';
  }

  const firstUnsolved = unsolvedTiles[0];
  return `Move tile ${firstUnsolved.id} to complete the puzzle.`;
};
```

**In GameScreen**:
```javascript
const [hints, setHints] = useState(3);

const handleGetHint = () => {
  if (hints > 0) {
    const hint = getHint(tiles, level);
    Alert.alert('Hint', hint);
    setHints(hints - 1);
  }
};
```

### 4. Add Time Limit

**In GameScreen**:

```javascript
const MAX_TIME = 300; // 5 minutes

useEffect(() => {
  if (timer >= MAX_TIME && !isComplete) {
    showTimeUpAlert();
  }
}, [timer]);

const showTimeUpAlert = () => {
  Alert.alert(
    'Time\'s Up!',
    'You\'ve used all your time. Try again?',
    [
      { text: 'Retry', onPress: initializeGame },
      { text: 'Back', onPress: () => navigation.goBack() },
    ]
  );
};
```

---

## UI Customization

### 1. Change Button Styles

**File**: `src/screens/HomeScreen.js`

```javascript
const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 16,        // Change this
    borderRadius: 12,           // Change this
    // Add these:
    borderWidth: 2,
    borderColor: COLORS.dark,
    shadowOpacity: 0.5,         // Change shadow
  },
});
```

### 2. Change Animation Speed

**File**: `src/screens/HomeScreen.js`

```javascript
// Slower animations
titleY.value = withSpring(0, { damping: 3, mass: 2 }); // Was 7, 1

// Faster animations
titleY.value = withSpring(0, { damping: 10, mass: 0.5 });

// Change delays
subtitle1Opacity.value = withDelay(500, withSpring(1)); // Was 200
```

### 3. Add Custom Fonts

**File**: `app.json`

```json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": ["./assets/fonts/YourFont.ttf"]
        }
      ]
    ]
  }
}
```

**Use in components**:
```javascript
<Text style={{ fontFamily: 'YourFont' }}>
  Custom Text
</Text>
```

### 4. Change Modal Appearance

**File**: `src/components/StoryModal.js`

```javascript
const styles = StyleSheet.create({
  container: {
    width: '90%',      // Was '85%' (wider modal)
    maxHeight: '90%',  // Was '80%' (taller modal)
    borderRadius: 30,  // Was 20 (more rounded)
  },
  storyText: {
    fontSize: 18,      // Was 16 (larger text)
    lineHeight: 28,    // Was 26
  },
});
```

---

## Advanced Customization

### 1. Add Analytics

**New File**: `src/utils/analytics.js`

```javascript
export const trackLevelStart = (levelId) => {
  console.log(`Level ${levelId} started`);
  // Send to analytics service
};

export const trackLevelComplete = (levelId, moves, time) => {
  console.log(`Level ${levelId} completed in ${time}s with ${moves} moves`);
  // Send to analytics service
};
```

### 2. Add Difficulty Presets

**File**: `src/constants/levels.js`

```javascript
export const DIFFICULTY_PRESETS = {
  easy: { moveMultiplier: 1.5, gridSizeOffset: -1 },
  normal: { moveMultiplier: 1.0, gridSizeOffset: 0 },
  hard: { moveMultiplier: 0.7, gridSizeOffset: 1 },
};

export const getLevelWithDifficulty = (level, difficulty) => {
  const preset = DIFFICULTY_PRESETS[difficulty];
  return {
    ...level,
    moves: Math.ceil(level.moves * preset.moveMultiplier),
    gridSize: Math.min(6, level.gridSize + preset.gridSizeOffset),
  };
};
```

### 3. Add Local Image Support

**Replace Unsplash URLs**:

```javascript
// From:
image: 'https://images.unsplash.com/photo-...',

// To:
image: require('../assets/images/creation.jpg'),
```

**File**: `src/screens/LevelSelectionScreen.js`

```javascript
<LevelCard
  level={level}
  // ...
/>

// In LevelCard.js
<ImageBackground
  source={
    typeof level.image === 'string'
      ? { uri: level.image }
      : level.image  // Local require()
  }
/>
```

### 4. Add Audio Effects

**File**: `src/utils/audio.js`

```javascript
export const playClickSound = async () => {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync(require('../assets/sounds/click.mp3'));
    await sound.playAsync();
  } catch (e) {
    console.warn('Sound not available');
  }
};
```

**In GameScreen**:
```javascript
const handleTilePress = (index1, index2) => {
  await playClickSound();
  // ... rest of logic
};
```

### 5. Add Achievements System

**New File**: `src/utils/achievements.js`

```javascript
export const checkAchievements = (stats) => {
  const achievements = [];

  if (stats.moves <= 10) {
    achievements.push({ id: 'speedmaster', name: 'Speed Master' });
  }

  if (stats.time <= 30) {
    achievements.push({ id: 'quickfinger', name: 'Quick Fingers' });
  }

  if (stats.moves <= stats.maxMoves / 2) {
    achievements.push({ id: 'efficient', name: 'Efficient' });
  }

  return achievements;
};
```

---

## Configuration Customization

### 1. Change App Icon

**File**: `app.json`

```json
{
  "expo": {
    "icon": "./src/assets/your-icon.png"
  }
}
```

### 2. Change Splash Screen

**File**: `app.json`

```json
{
  "expo": {
    "splash": {
      "image": "./src/assets/your-splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1a1a2e"
    }
  }
}
```

### 3. Change App Name

**File**: `app.json`

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### 4. Change Version

**File**: `app.json` and `package.json`

```json
{
  "version": "2.0.0"
}
```

---

## Testing Customizations

### Before deploying changes:

1. **Test on multiple screen sizes**:
   - Small phones (4.5")
   - Medium phones (5.5")
   - Large phones (6.5")
   - Tablets (if applicable)

2. **Test all game flows**:
   - New player → complete all levels
   - Returning player → check saved progress
   - Failed level → retry works
   - Level navigation → all transitions smooth

3. **Test animations**:
   - 60fps consistent
   - No stuttering
   - Smooth transitions
   - Proper timing

4. **Test storage**:
   - Progress saves correctly
   - Level unlocking works
   - Stats persist
   - Data survives app close/reopen

---

## Performance Tips

### When customizing:

1. **Keep animations smooth**: Avoid complex effects
2. **Minimize re-renders**: Use `React.memo()` for cards
3. **Cache images**: React Native does this automatically
4. **Test on old devices**: Ensure compatibility
5. **Monitor memory**: Use Expo DevTools

### File size optimization:

- Remove unused dependencies
- Compress images
- Minify code (production builds do this)
- Use tree-shaking for imports

---

## Undo Changes

If you make a mistake:

```bash
# Undo all changes
git checkout -- .

# Undo specific file
git checkout -- src/constants/colors.js

# See what changed
git diff src/constants/colors.js
```

---

**Happy customizing! 🎨**
