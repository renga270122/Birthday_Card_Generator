# 🕉️ Thirupugazh Songs Mobile App

A beautiful React Native mobile application for Thirupugazh devotional songs, specially created for Thai Poosam. This app allows devotees to easily search and access Thirupugazh songs with multiple search options and voice input capability.

![Thai Poosam Special](https://img.shields.io/badge/Thai%20Poosam-Special-orange)
![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue)
![Expo](https://img.shields.io/badge/Expo-51.0.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-blue)

## ✨ Features

### 🔍 Multi-Criteria Song Search
- Search by **song number** (e.g., "1", "45", "100")
- Search by **problem/topic** (e.g., "health", "marriage", "wealth")
- Search by **place/location** (e.g., "Thiruchendur", "Swamimalai", "Palani")
- Real-time filtering as you type
- Support for both English and Tamil text

### 🎤 Voice Input
- Voice search button for hands-free searching
- Visual feedback when listening
- Automatic search trigger after recognition
- Demo implementation included

### 🎵 Song Display
- Beautiful song cards with essential information
- Display song number, name, place, and topics
- Full lyrics view with Tamil text support
- Clean, readable interface
- Easy navigation between songs

### 🎨 Beautiful UI
- Devotional-themed design with orange and red accents
- Tamil-friendly typography
- Responsive layout for different screen sizes
- Smooth transitions and animations
- High contrast for readability

## 📦 Database

The app includes **30 representative Thirupugazh songs** covering:
- Popular songs (Songs 1-104)
- Various sacred places:
  - Thiruchendur
  - Swamimalai
  - Palani
  - Thiruthani
  - Pazhamudhircholai
  - Thiruparankundram
- Different topics/problems:
  - Health, healing, disease
  - Marriage, relationships, family
  - Education, knowledge, wisdom
  - Wealth, prosperity, success
  - Protection, enemies, obstacles
  - Spiritual progress, devotion

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or later): [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **Expo Go** app on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

1. **Navigate to the app directory:**
   ```bash
   cd thirupugazh-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```
   or
   ```bash
   npm start
   ```

### Running on Your Device

#### Option 1: Expo Go (Easiest)

1. After starting the development server, a QR code will appear in your terminal
2. Open the **Expo Go** app on your mobile device
3. **On iOS**: Use the Camera app to scan the QR code
4. **On Android**: Use the Expo Go app to scan the QR code
5. The app will load on your device

#### Option 2: iOS Simulator (Mac only)

1. Press `i` in the terminal after starting the dev server
2. This will open the app in the iOS Simulator
3. Make sure you have Xcode installed

#### Option 3: Android Emulator

1. Press `a` in the terminal after starting the dev server
2. This will open the app in the Android Emulator
3. Make sure you have Android Studio installed with an emulator set up

## 📱 Usage Guide

### Searching for Songs

1. **Text Search:**
   - Tap on the search bar at the top
   - Type any keyword:
     - Song number: "1", "45", "100"
     - Place name: "Palani", "Thiruchendur"
     - Problem/topic: "health", "marriage", "education"
   - Results update automatically as you type

2. **Voice Search:**
   - Tap the microphone button (🎤) at the bottom right
   - Allow microphone permissions if prompted
   - Speak your search term clearly
   - The app will search using your spoken words
   - (Note: Current version includes demo implementation)

3. **Viewing Song Details:**
   - Tap on any song card to view full details
   - See complete lyrics in Tamil
   - View all topics/problems addressed by the song
   - Tap the back button to return to the search

### Example Searches

Try these searches to explore the app:
- "1" - Find song number 1
- "Palani" - Find all songs related to Palani temple
- "health" - Find songs for health-related problems
- "marriage" - Find songs for marriage blessings
- "protection" - Find songs for protection from enemies
- "education" - Find songs for knowledge and wisdom

## 🏗️ Project Structure

```
thirupugazh-app/
├── App.tsx                          # Main app entry point with navigation
├── app.json                         # Expo configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── .gitignore                       # Git ignore rules
├── README.md                        # This file
│
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Main screen with search and song list
│   │   └── SongDetailScreen.tsx    # Song details and lyrics view
│   │
│   ├── components/
│   │   ├── SearchBar.tsx           # Search input component
│   │   ├── SongCard.tsx            # Song list item component
│   │   └── VoiceButton.tsx         # Voice input button
│   │
│   ├── data/
│   │   └── thirupugazhSongs.ts     # Song database (30 songs)
│   │
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   │
│   └── utils/
│       └── searchHelpers.ts        # Search utility functions
│
└── assets/
    └── (app icons and images)
```

## 🛠️ Building for Production

### Build APK for Android

1. **Create production build:**
   ```bash
   expo build:android
   ```

2. **Or use EAS Build (recommended):**
   ```bash
   npm install -g eas-cli
   eas build --platform android
   ```

### Build for iOS

1. **Create production build:**
   ```bash
   expo build:ios
   ```

2. **Or use EAS Build (recommended):**
   ```bash
   npm install -g eas-cli
   eas build --platform ios
   ```

### Publishing Updates

```bash
expo publish
```

## 🧪 Testing Scenarios

The app has been designed to handle:

- ✅ Search by exact song number
- ✅ Search by partial place name
- ✅ Search by problem keyword
- ✅ Voice search (demo implementation)
- ✅ Empty search results handling
- ✅ Smooth navigation between screens
- ✅ Tamil text display on all devices
- ✅ Responsive design on various screen sizes

## 🔧 Configuration

### Permissions

The app requests the following permissions:
- **Microphone** (for voice search): Configured in `app.json`
- **Speech Recognition** (iOS): Configured in `app.json`

### Customization

You can customize the app by editing:
- **Colors**: Update the theme colors in each component's StyleSheet
- **Songs Database**: Add more songs in `src/data/thirupugazhSongs.ts`
- **App Name**: Change in `app.json`
- **App Icon**: Replace files in `assets/` folder

## 📚 Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Screen navigation
- **React Native Paper**: Material Design components
- **Expo Speech**: Voice recognition (configured for future use)

## 🎯 Future Enhancements

Potential features for future versions:
- Full speech-to-text integration with actual voice recognition
- Audio playback of songs
- Favorites/bookmarks functionality
- Share songs with others
- Multiple language support
- Offline mode
- Push notifications for special occasions
- Dark mode theme

## 🐛 Troubleshooting

### Common Issues

1. **"Command not found: expo"**
   - Install Expo CLI: `npm install -g expo-cli`

2. **Dependencies installation fails**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **App won't load on device**
   - Ensure your device and computer are on the same WiFi network
   - Check if Expo Go app is up to date
   - Try restarting the Expo dev server

4. **Tamil text not displaying correctly**
   - The app uses standard fonts that support Tamil Unicode
   - Ensure your device OS is up to date

5. **Voice search not working**
   - Current version includes a demo implementation
   - For production, integrate expo-speech or react-native-voice
   - Ensure microphone permissions are granted

## 📄 License

This project is created for devotional purposes. Feel free to use and modify for personal and community use.

## 🙏 Acknowledgments

- Thirupugazh songs by Arunagirinathar
- Created with devotion for Thai Poosam 2026
- Built with React Native and Expo

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review Expo documentation: https://docs.expo.dev/
3. Check React Native documentation: https://reactnative.dev/

---

**May Lord Murugan bless you!** 🕉️

**Vel Vel Muruga! Vetri Vel Muruga!** 🙏
