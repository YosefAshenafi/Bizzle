import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

let victorySound = null;
let backgroundMusic = null;
let levelSounds = {};
let currentLevelSound = null;

export const initAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};

// Load and play level-specific sound
export const loadLevelSound = async (soundFile) => {
  try {
    if (!soundFile) return null;

    const soundKey = soundFile.toString();

    // Remove previous level sound if exists
    if (levelSounds[soundKey]) {
      try {
        if (levelSounds[soundKey].sound) {
          await levelSounds[soundKey].sound.unloadAsync();
        }
      } catch (unloadError) {
        console.log('Error removing previous sound:', unloadError);
      }
    }

    // Create new sound object
    const { sound } = await Audio.Sound.createAsync(
      soundFile,
      { shouldPlay: false, isLooping: true, volume: 0.5 }
    );

    levelSounds[soundKey] = { soundFile, sound };
    return levelSounds[soundKey];
  } catch (error) {
    console.error('Error loading level sound:', error);
    return null;
  }
};

export const isSoundEnabled = async () => {
  try {
    const soundPref = await AsyncStorage.getItem('@biblepuzzlequest_sound_enabled');
    return soundPref === null ? true : soundPref === 'true';
  } catch (error) {
    console.error('Error checking sound setting:', error);
    return true; // Default to enabled
  }
};

export const playLevelSound = async (soundFile) => {
  try {
    if (!soundFile) return;

    // Check if sound is enabled
    const soundEnabled = await isSoundEnabled();
    if (!soundEnabled) {
      console.log('Sound is disabled in settings');
      return;
    }

    const soundKey = soundFile.toString();
    let soundObj = levelSounds[soundKey];

    // If sound not loaded, load it first
    if (!soundObj || !soundObj.sound) {
      console.log('Loading sound...');
      soundObj = await loadLevelSound(soundFile);
    }

    if (soundObj && soundObj.sound) {
      // Stop and reset if already playing
      const status = await soundObj.sound.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await soundObj.sound.stopAsync();
        }
        await soundObj.sound.setPositionAsync(0);
        await soundObj.sound.playAsync();
        currentLevelSound = soundKey;
        console.log('Sound playing successfully');
      }
    }
  } catch (error) {
    console.error('Error playing level sound:', error);
  }
};

export const stopLevelSound = async (soundFile) => {
  try {
    if (!soundFile) return;

    const soundKey = soundFile.toString();
    if (levelSounds[soundKey] && levelSounds[soundKey].sound) {
      const status = await levelSounds[soundKey].sound.getStatusAsync();
      if (status.isLoaded) {
        await levelSounds[soundKey].sound.stopAsync();
        await levelSounds[soundKey].sound.unloadAsync();
      }
      delete levelSounds[soundKey]; // Remove from object
    }

    // Clear current level sound if it matches
    if (currentLevelSound === soundKey) {
      currentLevelSound = null;
    }
  } catch (error) {
    console.error('Error stopping level sound:', error);
  }
};

// Create a simple beep sound effect using synthesized audio
export const playVictorySound = async () => {
  try {
    // Use a simple built-in sound or skip if not available
    // In production, you would load an actual audio file
    if (victorySound) {
      victorySound.play();
    }
  } catch (error) {
    console.error('Error playing victory sound:', error);
  }
};

export const playClickSound = async () => {
  try {
    // Click sound effect
    // In production, load actual audio file
    // const player = new AudioPlayer(require('../assets/click.mp3'));
    // player.play();
  } catch (error) {
    console.error('Error playing click sound:', error);
  }
};

export const stopBackgroundMusic = async () => {
  try {
    if (backgroundMusic) {
      const status = await backgroundMusic.getStatusAsync();
      if (status.isLoaded) {
        await backgroundMusic.stopAsync();
        await backgroundMusic.unloadAsync();
      }
      backgroundMusic = null;
    }
  } catch (error) {
    console.error('Error stopping background music:', error);
  }
};

// Stop all level sounds immediately
export const stopAllLevelSounds = async () => {
  try {
    const soundKeys = Object.keys(levelSounds);
    for (const soundKey of soundKeys) {
      if (levelSounds[soundKey] && levelSounds[soundKey].sound) {
        try {
          const status = await levelSounds[soundKey].sound.getStatusAsync();
          if (status.isLoaded) {
            await levelSounds[soundKey].sound.stopAsync();
            await levelSounds[soundKey].sound.unloadAsync();
          }
        } catch (error) {
          console.log('Error stopping sound during cleanup:', error);
        }
      }
    }
    levelSounds = {};
    currentLevelSound = null;
  } catch (error) {
    console.error('Error stopping all level sounds:', error);
  }
};

export const cleanup = async () => {
  try {
    await stopBackgroundMusic();
    if (victorySound) {
      const status = await victorySound.getStatusAsync();
      if (status.isLoaded) {
        await victorySound.unloadAsync();
      }
      victorySound = null;
    }

    await stopAllLevelSounds();
  } catch (error) {
    console.error('Error cleaning up audio:', error);
  }
};