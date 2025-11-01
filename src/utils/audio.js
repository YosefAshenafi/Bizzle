import { Audio } from 'expo-av';

let victorySound = null;
let backgroundMusic = null;

export const initAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};

// Create a simple beep sound effect using synthesized audio
export const playVictorySound = async () => {
  try {
    // Use a simple built-in sound or skip if not available
    // In production, you would load an actual audio file
    if (victorySound) {
      await victorySound.playAsync();
    }
  } catch (error) {
    console.error('Error playing victory sound:', error);
  }
};

export const playClickSound = async () => {
  try {
    // Click sound effect
    if (Audio.Sound) {
      const sound = new Audio.Sound();
      // In production, load actual audio file
      // await sound.loadAsync(require('../assets/click.mp3'));
      // await sound.playAsync();
    }
  } catch (error) {
    console.error('Error playing click sound:', error);
  }
};

export const stopBackgroundMusic = async () => {
  try {
    if (backgroundMusic) {
      await backgroundMusic.stopAsync();
      await backgroundMusic.unloadAsync();
      backgroundMusic = null;
    }
  } catch (error) {
    console.error('Error stopping background music:', error);
  }
};

export const cleanup = async () => {
  try {
    await stopBackgroundMusic();
    if (victorySound) {
      await victorySound.unloadAsync();
      victorySound = null;
    }
  } catch (error) {
    console.error('Error cleaning up audio:', error);
  }
};
