# 📦 Build Instructions for Android App Bundle

This guide explains how to build the Soulvest B'day Card Generator Android App Bundle (AAB) using GitHub Actions.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Building via GitHub Actions](#building-via-github-actions)
- [Manual Build (Local)](#manual-build-local)
- [Downloading the AAB](#downloading-the-aab)
- [Uploading to Google Play Store](#uploading-to-google-play-store)
- [Version Management](#version-management)
- [Troubleshooting](#troubleshooting)

## Overview

The project uses **GitHub Actions** for automated builds. You don't need Android Studio or a local development environment - everything runs in the cloud!

**Build Process:**
1. Code is pushed to GitHub
2. GitHub Actions automatically builds the AAB
3. AAB is signed with your keystore
4. AAB is available for download
5. Upload AAB to Google Play Console

## Prerequisites

### For Automated Builds (Recommended)
- ✅ GitHub account with repository access
- ✅ Keystore setup (see [KEYSTORE_SETUP.md](KEYSTORE_SETUP.md))
- ✅ GitHub Secrets configured

### For Manual Builds (Optional)
- Node.js 18 or 20
- Java JDK 17
- Android SDK
- Gradle

## Building via GitHub Actions

### Method 1: Automatic Build (on Push)

Builds automatically trigger when you:
- Push to `main` branch
- Create a pull request to `main`
- Create a version tag (e.g., `v1.0`, `v2.0`)

**No action needed** - just push your code!

```bash
git add .
git commit -m "Update app"
git push origin main
```

### Method 2: Manual Build (Workflow Dispatch)

Trigger a build manually from GitHub UI:

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Click **Build Android App Bundle** workflow (left sidebar)
4. Click **Run workflow** button (right side)
5. Select branch (usually `main`)
6. Click **Run workflow** (green button)

The build will start immediately!

### Method 3: Build on Tag (Version Release)

Create a version tag to build and release:

```bash
# Create and push a version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This will:
- Build the AAB
- Create a GitHub Release
- Attach the AAB file to the release
- Include version information and checksums

## Monitoring the Build

### Step 1: Navigate to Actions

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Find the latest workflow run

### Step 2: View Build Progress

- Click on the workflow run to see detailed logs
- Each step shows real-time progress
- Build typically takes 5-10 minutes

### Step 3: Check Build Status

**✅ Success:** Green checkmark - AAB is ready!  
**❌ Failed:** Red X - check logs for errors  
**🟡 In Progress:** Yellow dot - build is running

## Downloading the AAB

### From Workflow Artifacts

1. Go to **Actions** tab
2. Click on the successful workflow run
3. Scroll down to **Artifacts** section
4. Click **android-app-bundle** to download
5. Extract the ZIP file
6. Inside you'll find:
   - `soulvest-bdaycard-v{version}.aab` - The app bundle
   - `build-info.txt` - Build details and checksum

### From GitHub Releases (for tagged versions)

1. Go to **Releases** page
2. Find your version (e.g., v1.0.0)
3. Download the AAB file from **Assets**

### Verifying the Download

Check the SHA256 checksum to verify integrity:

**Linux/macOS:**
```bash
sha256sum soulvest-bdaycard-v1.0.0.aab
```

**Windows (PowerShell):**
```powershell
Get-FileHash soulvest-bdaycard-v1.0.0.aab -Algorithm SHA256
```

Compare with the checksum in `build-info.txt` or GitHub Release notes.

## Uploading to Google Play Store

### Prerequisites

1. **Google Play Console Account:** 
   - Sign up at [play.google.com/console](https://play.google.com/console)
   - One-time registration fee: $25

2. **App Created:**
   - Create app in Play Console if not already done
   - Package name must match: `com.soulvest.bdaycard`

### Upload Steps

#### Step 1: Access Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app (or create one if first time)

#### Step 2: Navigate to Release Section

- Click **Release** → **Production** (for full release)
- Or **Testing** → **Internal testing** (for testing first - recommended)

#### Step 3: Create New Release

1. Click **Create new release**
2. Upload the AAB file:
   - Click **Upload** button
   - Select your `soulvest-bdaycard-v{version}.aab` file
   - Wait for upload to complete (may take 1-2 minutes)

#### Step 4: Review Upload

Google Play will process your AAB and show:
- ✅ Version code and version name
- ✅ Supported devices (thousands!)
- ✅ APK sizes for different configurations
- ⚠️ Any warnings (usually safe to ignore)

#### Step 5: Add Release Notes

Write what's new in this version:

```
Version 1.0.0
- First release
- AI-powered birthday card generation
- 14+ hobby categories
- Share via WhatsApp, Email, or download
- Beautiful modern design
```

#### Step 6: Review and Rollout

1. Click **Review release**
2. Verify all details
3. Click **Start rollout to Production** (or Internal testing)
4. Confirm

### After Upload

- **Internal Testing:** Available in ~1 hour
- **Production:** Review by Google (1-7 days typically)
- You'll receive email updates on review status

## Version Management

### Automatic Version Management

The GitHub Actions workflow automatically:
- Increments `versionCode` based on git commits
- Sets `versionName` from git tags or commit history

### Version Code

Automatically calculated as the number of commits:
```
versionCode = number of git commits
```

Example:
- 50 commits = versionCode 50
- 51 commits = versionCode 51

### Version Name

**With git tags:**
```bash
git tag v1.0.0
git push origin v1.0.0
```
Result: versionName = "1.0.0"

**Without git tags:**
Uses git describe or defaults to "1.0.0"

### Manual Version Update

To manually set version, edit `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 2
    versionName "1.0.1"
    // ...
}
```

## Manual Build (Local)

If you need to build locally without GitHub Actions:

### Step 1: Setup Environment

```bash
# Install dependencies
npm install

# Install Capacitor CLI if not installed
npm install -g @capacitor/cli
```

### Step 2: Sync Capacitor

```bash
# Sync web assets to Android
npx cap sync android
```

### Step 3: Build AAB

```bash
cd android

# Build release AAB
./gradlew bundleRelease
```

### Step 4: Find the AAB

```bash
# AAB location
android/app/build/outputs/bundle/release/app-release.aab
```

### Step 5: Sign AAB (if not auto-signed)

If building without signing config, use `jarsigner`:

```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore /path/to/keystore.jks \
  app-release.aab \
  your-key-alias
```

## Troubleshooting

### Build Fails: "Keystore not found"

**Solution:** 
- Verify GitHub Secrets are set correctly
- See [KEYSTORE_SETUP.md](KEYSTORE_SETUP.md)
- Build will create unsigned AAB if secrets missing

### Build Fails: "npm ci failed"

**Solution:**
- Check `package.json` and `package-lock.json` are in sync
- Run `npm install` locally and commit changes

### Build Fails: "Gradle error"

**Solution:**
- Check `android/app/build.gradle` syntax
- Verify Android SDK versions are compatible
- Check GitHub Actions logs for specific error

### AAB Upload Fails on Play Console

**Error: "Version code already used"**
- Each upload needs a higher versionCode
- Create a new commit to increment versionCode
- Or manually update in build.gradle

**Error: "Signature mismatch"**
- You must use the same keystore for updates
- Cannot change keystore once app is published
- See [KEYSTORE_SETUP.md](KEYSTORE_SETUP.md) for recovery options

**Error: "Package name mismatch"**
- Package name must be `com.soulvest.bdaycard`
- Cannot change package name after first upload

### Workflow Permission Errors

**Solution:**
Add required permissions to workflow file (already configured in android-build.yml):
```yaml
permissions:
  contents: write
  pull-requests: write
```

### Large AAB Size

**Tips to reduce size:**
- Remove unused resources
- Enable R8/ProGuard minification
- Use Android App Bundles (already doing this!)
- Compress images

Current expected size: **5-15 MB** (very reasonable!)

## Build Logs and Artifacts

### Accessing Logs

1. Go to **Actions** → Your workflow run
2. Click on **Build Android App Bundle** job
3. Expand any step to see detailed logs

### Available Artifacts

After successful build:
- `android-app-bundle.zip` - Contains AAB and build info
- `lint-reports.zip` - Lint check results (if available)

Artifacts are kept for **90 days**.

## Continuous Integration

The workflow includes:
- ✅ Dependency installation
- ✅ Web asset building
- ✅ Capacitor sync
- ✅ Android lint checks
- ✅ Unit tests (if configured)
- ✅ AAB building
- ✅ Signing with keystore
- ✅ Artifact upload
- ✅ Release creation

All automated - push code and let GitHub Actions handle the rest!

## Advanced Topics

### Caching

The workflow uses caching to speed up builds:
- Node modules cache
- Gradle cache
- Speeds up builds from ~10 min to ~5 min

### Matrix Builds

To build for multiple configurations, modify workflow:
```yaml
strategy:
  matrix:
    node-version: [18, 20]
    java-version: [17, 21]
```

### Environment Variables

Add custom environment variables in workflow:
```yaml
env:
  APP_ENV: production
  API_URL: https://api.example.com
```

## Support

### Documentation
- [KEYSTORE_SETUP.md](KEYSTORE_SETUP.md) - Keystore generation
- [README.md](README.md) - Project overview
- [.github/workflows/README.md](.github/workflows/README.md) - Workflow details

### Need Help?
- Open an issue on GitHub
- Check Android build logs
- Contact the development team

---

**Happy Building! 🚀**

Your Android App Bundle will be ready in minutes with GitHub Actions!
