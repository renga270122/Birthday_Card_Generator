# Android Build Setup - Required Manual Step

## 🔧 What Needs to be Done

Since Java path isn't set up automatically, we need to configure it. Here are your options:

### **Option 1: Open Project in Android Studio (Recommended)**

1. **Open Android Studio**
2. Click **File** → **Open**
3. Navigate to: `d:\Personal\Birthday_Card_Generator\android`
4. Click **OK** to open the Android project
5. Wait for Gradle sync to complete (may take 2-3 minutes)
6. Once synced, go to: **Build** → **Build Bundle(s) / APK(s)** → **Build Bundle(s) (AAB)**
7. Android Studio will:
   - Download any required dependencies
   - Compile your app
   - Create the Android App Bundle
8. A popup will show the build successful with file location

### **Output Location:**
After building, your AAB file will be at:
```
d:\Personal\Birthday_Card_Generator\android\app\release\app-release.aab
```

---

### **Option 2: Set JAVA_HOME (Advanced)**

If you prefer command line:

1. Find Java installation in Android Studio:
   - Usually at: `C:\Program Files\Android\Android Studio\jre`
   
2. Set environment variable:
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jre"
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jre", "User")
```

3. Then build from command line:
```bash
cd "d:\Personal\Birthday_Card_Generator\android"
.\gradlew.bat bundleRelease
```

---

## ✅ Recommended Steps

1. **Open Android Studio**
2. **Open the `android` folder** as a project
3. **Wait for Gradle sync**
4. **Build → Build Bundle(s) (AAB)**
5. **Done!** Your AAB file is ready

---

## Next: Create Signing Key

After building, you'll need to sign the APK:

1. In Android Studio: **Build** → **Generate Signed Bundle/APK**
2. Select **Android App Bundle (AAB)**
3. Click **Create new** to make a keystore
4. Fill in details (choose a strong password!)
5. The signed AAB will be saved to `app/release/`

---

## Then: Upload to Play Store

1. Go to https://play.google.com/console
2. Create developer account ($25)
3. Create new app
4. Upload your signed AAB file
5. Add screenshots and description
6. Submit for review
7. Approved in 2-4 hours!

---

**Proceed with Option 1 (Android Studio) for easiest experience!**
