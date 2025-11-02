# Firebase Setup Guide

This guide will help you set up Firebase for the Bible Puzzle Quest app's authentication and leaderboard features.

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "bible-puzzle-quest")
4. Follow the setup steps

## 2. Enable Authentication

1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" and "Google" providers
3. For Google provider, you'll need to configure OAuth consent screen

## 3. Enable Firestore

1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (for development)
3. Select a location

## 4. Add Apps to Firebase

### Android App

1. In Firebase Console, click "Add app" → Android
2. Package name: `com.biblepuzzlequest.app`
3. Download `google-services.json`
4. Replace the placeholder file in the project root
5. Update the configuration in `src/config/firebase.js`

### iOS App

1. In Firebase Console, click "Add app" → iOS
2. Bundle ID: `com.biblepuzzlequest.app`
3. Download `GoogleService-Info.plist`
4. Replace the placeholder file in `ios/BiblePuzzleQuest/`
5. Update the configuration in `src/config/firebase.js`

## 5. Update Configuration Files

### Update `src/config/firebase.js`

Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

### Update Google Sign-in Configuration

In `src/contexts/AuthContext.js`, update the web client ID:

```javascript
GoogleSignin.configure({
  webClientId: 'your-actual-web-client-id',
});
```

## 6. Configure Firestore Rules

In Firebase Console → Firestore → Rules, add these rules for security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Leaderboard is readable by all authenticated users
    match /leaderboard/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. Build and Run

After completing the setup:

1. For Android: Run `npm run android`
2. For iOS: Run `npm run ios`

The app will now have:
- Gmail authentication
- Email/password authentication  
- User profiles with stats tracking
- Global leaderboard with rankings
- Score tracking and comparison

## 8. Test the Features

1. Open the app and sign in with Google or email
2. Complete a puzzle level
3. Check the leaderboard (🏆 button)
4. Your score should appear on the leaderboard
5. Sign out and sign in with different account to test multiple users

## Troubleshooting

- **Google Sign-in not working**: Make sure SHA-1 fingerprint is added to Firebase Android app settings
- **Firestore permissions denied**: Check Firestore rules in Firebase Console
- **Build errors**: Make sure all Firebase config files are properly updated with real values