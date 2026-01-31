# 🎂 Soulvest B'day Card Generator

> **The First AI-Powered Birthday Card Generator App** 🎉

Create hilarious, personalized birthday messages in seconds! Generate unique, funny birthday cards with AI and share them via WhatsApp, Email, or download as images.

## ✨ Features

- 🤖 **AI-Powered Message Generation** - Intelligent, personalized birthday messages
- 📸 **Photo Upload** - Add personal photos to your cards
- 🎵 **Happy Birthday Music** - NEW! Background music with controls
  - 3 instrumental versions (Classic, Jazz, Piano)
  - Play/pause controls
  - Volume slider and mute button
  - Progress bar with time display
  - Loop option
  - Download card with music as video
- 💬 **Multiple Sharing Options**:
  - Share directly to WhatsApp
  - Send via Email
  - Download as PNG images
  - Download with music as video
  - Copy to clipboard
- 🎯 **14+ Hobby Categories** - Messages tailored to interests
- 🎨 **Beautiful Design** - Modern, responsive interface
- ✅ **100% Free** - No ads, no hidden charges
- 🔐 **Privacy First** - No data collection

## 🎯 How It Works

1. **Enter Details**
   - Person's name
   - Their age
   - Their favorite hobby

2. **Customize** (Optional)
   - Upload a birthday photo

3. **Add Music** (Optional)
   - Select music version (Classic, Jazz, or Piano)
   - Play background music while viewing card
   - Control volume and playback

4. **Generate & Share**
   - Get a funny personalized message
   - Copy, download, or share instantly
   - Download with music as video

## 📱 Platform Support

- **Web**: Works on all modern browsers
- **Mobile**: Android app available on Google Play Store
- **Responsive**: Optimized for phones, tablets, and desktops

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Audio**: HTML5 Audio API, Web Audio API
- **Video**: MediaRecorder API for video generation
- **Mobile**: Capacitor + Android
- **Build**: Gradle, npm
- **Design**: Responsive, mobile-first approach

## 📦 Project Structure

```
Birthday_Card_Generator/
├── index.html                 # Main web app
├── audio/                     # Music files folder
│   ├── README.md              # Audio setup instructions
│   └── *.mp3                  # Happy Birthday music (add these)
├── dist/                      # Built web files
├── android/                   # Android project
│   ├── app/                   # App module
│   ├── gradle/                # Gradle build system
│   └── build.gradle
├── package.json               # Dependencies
├── capacitor.config.json      # Capacitor config
└── docs/                      # Documentation
    ├── ANDROID_BUILD_GUIDE.md
    ├── RELEASE_NOTES.md
    └── MONETIZATION_GUIDE.md
```

## 💻 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Android Studio (for mobile build)
- Java 11+ (comes with Android Studio)

### Web Development

```bash
# Clone the repository
git clone https://github.com/yourusername/Birthday_Card_Generator.git
cd Birthday_Card_Generator

# Install dependencies
npm install

# Open in browser
# Just open index.html in your browser
# Or use a local server:
npx http-server
```

### Android Build

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Sync web to Android
npx cap sync android

# Build release bundle
# Open Android Studio and use Build > Generate Signed Bundle
```

### Adding Music Files

To enable the music feature, add royalty-free Happy Birthday instrumental MP3 files to the `/audio` folder:

```bash
# Required files:
audio/happy-birthday-classic.mp3
audio/happy-birthday-jazz.mp3
audio/happy-birthday-piano.mp3
```

See `audio/README.md` for sources of royalty-free music.

## 🎮 Usage

1. Open the app (web or Android)
2. Enter the birthday person's name
3. Enter their age
4. Select their hobby from the dropdown
5. (Optional) Upload a birthday photo
6. Click "Generate Birthday Message"
7. (Optional) Play background music
   - Select music version
   - Control playback and volume
   - Toggle loop option
8. Choose how to share:
   - Download as image
   - Download with music (video)
   - Share to WhatsApp
   - Send via Email
   - Copy to clipboard

## 📊 Example Messages

**For a Gamer, Age 30:**
> "Congratulations on leveling up to 30! 🎮 You're now 30 achievements older, but still no match for my gaming skills!"

**For a Fitness Enthusiast, Age 25:**
> "Happy 25th Birthday! Your body might be getting older, but your spirit is still crushing it like a personal trainer! 💪"

**For a Reader, Age 35:**
> "Happy 35th Birthday! You've been aging at chapter 35 of your life's great novel. Can't wait to read the next chapter! 📖"

## 🎨 Customization

### Hobby Categories
- Gaming
- Reading
- Cooking
- Sports
- Music
- Art
- Travel
- Gardening
- Photography
- Fitness
- Movies
- Yoga
- Dancing
- Writing

Edit the `messages` object in `index.html` to add more hobbies or customize messages.

## 📈 Analytics & Tracking

The app supports integration with:
- Google Analytics
- Firebase Crashlytics
- AdMob (for monetization)

## 🔐 Privacy & Security

✅ No user registration required
✅ No personal data collection
✅ All processing done locally
✅ No tracking or analytics by default
✅ No third-party service integration

## 📝 Documentation

- [Android Build Guide](./ANDROID_BUILD_GUIDE.md)
- [Quick Build Steps](./QUICK_BUILD.md)
- [Release Notes](./RELEASE_NOTES.md)
- [Monetization Guide](./MONETIZATION_GUIDE.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest new features
- Improve documentation
- Add new hobby categories

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Roadmap

- [ ] More message variations
- [ ] Additional hobby categories
- [ ] User-generated messages
- [ ] Birthday reminders
- [ ] Share with multiple recipients
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Premium features

## 👥 About

**Soulvest** is dedicated to spreading joy and making celebrations more fun and meaningful. 

**Mission**: Spreading Joy, One Birthday at a Time 💝

## 📞 Support

For issues, suggestions, or questions:
- 📧 Email: support@soulvest.app (coming soon)
- 🐛 Report bugs on GitHub Issues
- 💬 Suggestions welcome in GitHub Discussions

## 🙏 Acknowledgments

- Built with ❤️ using Capacitor
- Icons & emojis for visual appeal
- Google Play Store for distribution

## 📱 Download

- **Google Play Store**: [Soulvest B'day Card Generator](https://play.google.com/store/apps/details?id=com.soulvest.bdaycard)
- **Web**: [soulvest-birthday.com](https://soulvest-birthday.com)

---

**Made with 💝 by the Soulvest Team**

**Spreading Joy, One Birthday at a Time! 🎉**
