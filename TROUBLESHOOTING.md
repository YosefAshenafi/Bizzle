# 🔧 Bible Puzzle Quest - Troubleshooting & FAQ

## ⚡ Quick Fixes

### Problem: "npm: command not found"
**Solution**: Install Node.js
```bash
# Download from https://nodejs.org/
# Then verify installation:
node --version
npm --version
```

### Problem: White/blank screen on startup
**Solution**: Clear cache and reload
```bash
npm start
# In terminal, press 'c' to clear cache
# Or completely restart:
npm start -- -c
```

### Problem: Changes not appearing
**Solution**: Reload JavaScript
```bash
# With app running, in terminal press 'r'
# Or manually restart:
npm start
```

### Problem: "Cannot find module" error
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm start
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Images Not Loading

**Symptoms**:
- Gray tiles instead of image content
- Console shows image loading errors
- Network errors in DevTools

**Causes**:
- No internet connection
- Image URL is invalid
- Unsplash server unreachable
- CORS issues

**Solutions**:

1. **Check internet connection**
   ```bash
   curl https://images.unsplash.com/
   # Should return HTML content
   ```

2. **Verify image URLs**
   - Open URLs in browser
   - Check they return valid images
   - Try different images if broken

3. **Use local images instead**
   ```javascript
   // In src/constants/levels.js
   // Change from:
   image: 'https://images.unsplash.com/...',
   // To:
   image: require('../assets/images/creation.jpg'),
   ```

4. **Test with Expo Go** instead of simulator
   - Sometimes network works better on real device

---

### Issue 2: Audio Not Working

**Symptoms**:
- Victory sound doesn't play
- No audio on button clicks
- Audio errors in console

**Causes**:
- Audio system not initialized
- Audio files missing
- Device volume is muted
- Audio mode not configured

**Solutions**:

1. **Check device volume**
   - On iOS: Volume button, not mute toggle
   - On Android: Check volume settings
   - In simulator: Audio may not work (use real device)

2. **Initialize audio in App.js**
   ```javascript
   import { initAudio } from './src/utils/audio';

   useEffect(() => {
     initAudio();
   }, []);
   ```

3. **Test audio loading**
   ```javascript
   import { playVictorySound } from './src/utils/audio';

   // In a button press handler:
   await playVictorySound();
   ```

4. **Add actual audio files**
   - Place MP3 files in `src/assets/audio/`
   - Load in `src/utils/audio.js`
   - Test before deploying

---

### Issue 3: Storage/Progress Not Saving

**Symptoms**:
- Progress doesn't persist after closing app
- New player sees all levels unlocked
- Statistics not saved

**Causes**:
- AsyncStorage not initialized
- Storage permissions missing
- Data corruption
- Async operations not awaited

**Solutions**:

1. **Test storage manually**
   ```javascript
   // In App.js or GameScreen
   import { saveProgress, getProgress } from './src/utils/storage';

   // Test save
   await saveProgress(1, true);

   // Test load
   const progress = await getProgress();
   console.log('Progress:', progress);
   ```

2. **Verify AsyncStorage installation**
   ```bash
   npm list @react-native-async-storage/async-storage
   # Should show version 1.23.0 or higher
   ```

3. **Clear corrupted data**
   ```javascript
   // In App.js, temporary fix:
   import { clearAllData } from './src/utils/storage';

   // Call once to reset:
   await clearAllData();
   ```

4. **Check permissions** (Android)
   - App needs read/write storage permission
   - Add to `app.json` if missing:
   ```json
   {
     "expo": {
       "permissions": [
         "WRITE_EXTERNAL_STORAGE",
         "READ_EXTERNAL_STORAGE"
       ]
     }
   }
   ```

---

### Issue 4: Slow/Stuttering Animations

**Symptoms**:
- Animations drop below 60fps
- Tiles stutter when swapped
- Buttons lag when pressed
- Modal opening is slow

**Causes**:
- Reanimated not properly configured
- Device performance too low
- Too many animated components
- Babel config missing Reanimated plugin

**Solutions**:

1. **Verify Reanimated setup**
   ```javascript
   // babel.config.js should have:
   plugins: [
     'react-native-reanimated/plugin',
   ],
   ```

2. **Test on physical device**
   - Simulators often have poor performance
   - Test on actual iPhone/Android device
   - Older devices may struggle

3. **Simplify animations**
   ```javascript
   // Instead of:
   scale.value = withSpring(1, { damping: 2, mass: 0.5 })
   // Use:
   scale.value = withSpring(1, { damping: 8, mass: 1 })
   // (higher damping = simpler animation)
   ```

4. **Reduce animation complexity**
   - Use fewer simultaneously animated components
   - Simplify gradient calculations
   - Defer non-critical animations

5. **Enable performance monitor**
   ```bash
   # While app running, press 'd'
   # Select "Perf Monitor" to see FPS
   ```

---

### Issue 5: Navigation Not Working

**Symptoms**:
- Back button doesn't work
- Can't navigate to next screen
- Navigation params undefined
- Stuck on one screen

**Causes**:
- Navigation not properly initialized
- Route params not passed
- Navigation prop not received
- Navigation state corrupted

**Solutions**:

1. **Verify RootNavigator setup**
   ```javascript
   // src/navigation/RootNavigator.js should export NavigationContainer
   // App.js should import and render it
   import { RootNavigator } from './src/navigation/RootNavigator';

   export default function App() {
     return <RootNavigator />;
   }
   ```

2. **Check navigation props in screens**
   ```javascript
   // Screens must receive navigation as prop
   export const HomeScreen = ({ navigation }) => {
     // Use: navigation.navigate('Levels')
   };
   ```

3. **Pass route params correctly**
   ```javascript
   // Passing data:
   navigation.navigate('Game', { level: LEVELS[0] })

   // Receiving data:
   const { level } = route.params;
   ```

4. **Test navigation manually**
   ```javascript
   import { useNavigation } from '@react-navigation/native';

   export const TestScreen = () => {
     const navigation = useNavigation();

     return (
       <TouchableOpacity
         onPress={() => navigation.navigate('Home')}
       >
         <Text>Go Home</Text>
       </TouchableOpacity>
     );
   };
   ```

---

### Issue 6: Level Progression Issues

**Symptoms**:
- All levels unlocked from start
- Levels don't unlock after completion
- Can play locked levels
- Wrong levels showing as completed

**Causes**:
- Unlock logic not working
- Progress not saving
- Progress not loading
- State not updating

**Solutions**:

1. **Check unlock logic in LevelSelectionScreen**
   ```javascript
   const isLevelUnlocked = (levelId) => {
     if (levelId === 1) return true;
     return progress[levelId - 1] === true;
   };
   ```

2. **Verify progress is loading**
   ```javascript
   useEffect(() => {
     loadProgress();
     const unsubscribe = navigation.addListener('focus', loadProgress);
     return unsubscribe;
   }, [navigation]);
   ```

3. **Check saving in GameScreen**
   ```javascript
   const completeLevel = async () => {
     // Must save BEFORE showing victory
     await saveProgress(level.id, true);
     // ... then show victory modal
   };
   ```

4. **Debug with console logs**
   ```javascript
   const loadProgress = async () => {
     const progressData = await getProgress();
     console.log('Loaded progress:', progressData);
     setProgress(progressData);
   };
   ```

---

### Issue 7: Puzzle Logic Problems

**Symptoms**:
- Can't swap valid tiles
- Can swap invalid tiles
- Puzzle never shows as solved
- Move counter wrong

**Causes**:
- Adjacency calculation wrong
- Tile position tracking off
- Win condition logic broken
- Move counting logic wrong

**Solutions**:

1. **Test adjacency function**
   ```javascript
   import { getAdjacentTiles } from './src/utils/puzzleLogic';

   // Test positions
   console.log('Adjacent to 5 (4x4):', getAdjacentTiles(5, 4));
   // Should be: [1, 4, 6, 9]
   ```

2. **Verify tile structure**
   ```javascript
   // Tile should have:
   {
     id: 0,                    // Unique identifier
     position: 3,              // Current location
     correctPosition: 0,       // Target location
   }
   ```

3. **Check win condition**
   ```javascript
   const solved = tiles.every(
     tile => tile.position === tile.correctPosition
   );
   console.log('Puzzle solved?', solved);
   ```

4. **Verify move swap logic**
   ```javascript
   // After swap, check tiles:
   console.log('Tiles after swap:', tiles);
   // Positions of swapped tiles should be exchanged
   ```

---

### Issue 8: Memory Leaks

**Symptoms**:
- App gets slower over time
- App crashes after playing multiple levels
- Memory usage keeps increasing
- Battery drains quickly

**Causes**:
- useEffect cleanup missing
- Event listeners not removed
- Animations not cancelled
- Audio not unloaded

**Solutions**:

1. **Add cleanup to timers**
   ```javascript
   useEffect(() => {
     let interval = setInterval(() => {
       setTimer(t => t + 1);
     }, 1000);

     return () => clearInterval(interval);  // Clean up!
   }, []);
   ```

2. **Clean up event listeners**
   ```javascript
   useEffect(() => {
     const unsubscribe = navigation.addListener('focus', () => {
       // Do something
     });

     return unsubscribe;  // Clean up!
   }, [navigation]);
   ```

3. **Clean up audio**
   ```javascript
   import { cleanup } from './src/utils/audio';

   useEffect(() => {
     return () => {
       cleanup();  // On unmount
     };
   }, []);
   ```

4. **Monitor memory in DevTools**
   - Open DevTools (press 'd')
   - Select "Perf Monitor"
   - Watch memory usage while playing
   - Look for steady increases

---

## ❓ FAQ

### Q: Can I run this on Web?
**A**: Yes, with Expo Web. Run:
```bash
npm run web
```

### Q: How do I change the Bible stories?
**A**: Edit `src/constants/levels.js`:
```javascript
{
  id: 1,
  title: 'Your Story',
  story: 'Your text',
  bibleRef: 'Your reference',
}
```

### Q: Can I add more levels?
**A**: Yes, add to the LEVELS array in `src/constants/levels.js`. The app will automatically handle progression.

### Q: How do I change the game difficulty?
**A**: Adjust in `src/constants/levels.js`:
```javascript
{
  moves: 30,      // Lower = harder
  gridSize: 6,    // Larger = harder
}
```

### Q: Can I use local images instead of Unsplash?
**A**: Yes, replace URLs with local paths:
```javascript
image: require('../assets/images/creation.jpg'),
```

### Q: How do I add sound effects?
**A**:
1. Place MP3 files in `src/assets/audio/`
2. Load in `src/utils/audio.js`
3. Call `playVictorySound()` when needed

### Q: Can I change the colors?
**A**: Yes, edit `src/constants/colors.js`

### Q: How do I reset all player progress?
**A**: Temporarily add this to App.js:
```javascript
import { clearAllData } from './src/utils/storage';

useEffect(() => {
  clearAllData();  // This will reset everything
}, []);
```

### Q: Will this work offline?
**A**: Mostly yes, except:
- Images won't load (need to use local images)
- Consider pre-caching or bundling images

### Q: Can I add multiplayer?
**A**: Not in current version, but architecture supports it:
1. Add Firebase Realtime Database
2. Sync puzzle state across devices
3. Add multiplayer screens

### Q: How do I deploy to App Store?
**A**:
```bash
eas build --platform ios
# Follow prompts to build and submit
```

### Q: Can I use this code for commercial purposes?
**A**: Yes, it's MIT licensed. Attribution appreciated but not required.

### Q: How large is the app?
**A**:
- Code only: ~2.5MB
- With assets: ~5-10MB depending on images

---

## 📞 Getting Help

### Debug Mode
Enable detailed logging:
```javascript
// In App.js
if (__DEV__) {
  console.log('Debug mode enabled');
  // Your debug code here
}
```

### Check Logs
```bash
# iOS
npx react-native log-ios

# Android
adb logcat
```

### Test on Real Device
- Install Expo Go app
- Scan QR code
- Better performance and real results

### Enable Dev Menu
```bash
# While app running
d     # Opens dev menu
i     # iOS simulator
a     # Android emulator
r     # Reload JS
j     # Open debugger
```

---

## 🧪 Testing Procedures

### Before Deploying

1. **Test all screens**
   - Home → Levels → Game → Story → Levels (repeat)

2. **Test progression**
   - Level 1 only starts unlocked
   - Completing Level N unlocks Level N+1
   - Progress persists after app closes

3. **Test gameplay**
   - Tiles swap correctly
   - Move counter increments
   - Timer works
   - Win condition triggers

4. **Test animations**
   - 60fps consistently
   - No stuttering
   - Smooth transitions

5. **Test storage**
   - Data saves correctly
   - Data loads correctly
   - No corruption

---

## 🚨 Emergency Fixes

### App won't start
```bash
npm start -- -c
# Clear cache and restart
```

### Lost progress
```javascript
// Progress is stored in AsyncStorage
// Check @biblepuzzlequest_progress key
// Can be viewed in DevTools
```

### Corrupted data
```bash
# Clear all app data and start fresh
# Or call: clearAllData() from storage.js
```

---

**Still stuck? Check the documentation files (README.md, FEATURES.md, ARCHITECTURE.md) or review the relevant source files directly.**

---

*Last Updated: November 2024*
