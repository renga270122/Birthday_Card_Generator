# 🔐 Keystore Setup Guide

This guide explains how to generate a keystore for signing your Android App Bundle and configure GitHub Actions to use it.

## Table of Contents
- [What is a Keystore?](#what-is-a-keystore)
- [Generating a Keystore](#generating-a-keystore)
- [Converting Keystore to Base64](#converting-keystore-to-base64)
- [Adding Secrets to GitHub](#adding-secrets-to-github)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

## What is a Keystore?

A keystore is a binary file that contains your app's signing key. You need it to:
- Sign release versions of your Android app
- Upload apps to Google Play Store
- Update existing apps (must use the same keystore)

**⚠️ IMPORTANT:** Keep your keystore safe! If you lose it, you cannot update your app on Play Store.

## Generating a Keystore

### Prerequisites
- Java JDK installed on your system
- Command line / Terminal access

### Step 1: Generate the Keystore

Open your terminal and run:

```bash
keytool -genkey -v -keystore soulvest-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias soulvest-key-alias
```

**Parameters explained:**
- `soulvest-release-key.jks` - Name of your keystore file (you can change this)
- `-keyalg RSA` - Encryption algorithm
- `-keysize 2048` - Key size (2048 bits is secure)
- `-validity 10000` - Valid for 10,000 days (~27 years)
- `soulvest-key-alias` - Alias for your key (you can change this)

### Step 2: Answer the Prompts

You'll be asked several questions:

```
Enter keystore password: [Create a strong password]
Re-enter new password: [Confirm password]

What is your first and last name?
  [Unknown]: Your Name or Company Name

What is the name of your organizational unit?
  [Unknown]: Development

What is the name of your organization?
  [Unknown]: Soulvest

What is the name of your City or Locality?
  [Unknown]: Your City

What is the name of your State or Province?
  [Unknown]: Your State

What is the two-letter country code for this unit?
  [Unknown]: US

Is CN=..., OU=..., O=..., L=..., ST=..., C=... correct?
  [no]: yes

Enter key password for <soulvest-key-alias>
  (RETURN if same as keystore password): [Press ENTER or create different password]
```

**Important Notes:**
- Use a **strong password** (at least 12 characters, mix of letters, numbers, symbols)
- **Save these values** - you'll need them for GitHub Secrets:
  - Keystore password
  - Key alias (`soulvest-key-alias`)
  - Key password (if different from keystore password)

### Step 3: Verify Keystore Creation

Check that the keystore was created:

```bash
ls -lh soulvest-release-key.jks
```

You should see a file around 2-3 KB in size.

## Converting Keystore to Base64

GitHub Actions cannot directly use binary files as secrets, so we need to convert the keystore to base64 text.

### On Linux/macOS:

```bash
base64 soulvest-release-key.jks > keystore.base64
```

### On Windows (PowerShell):

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("soulvest-release-key.jks")) | Out-File keystore.base64
```

### On Windows (Git Bash):

```bash
base64 soulvest-release-key.jks > keystore.base64
```

This creates a `keystore.base64` file containing your keystore in base64 format.

## Adding Secrets to GitHub

### Step 1: Open Your Repository Settings

1. Go to your GitHub repository
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Step 2: Add Required Secrets

Add these four secrets one by one:

#### 1. KEYSTORE_FILE
- **Name:** `KEYSTORE_FILE`
- **Value:** Copy the entire contents of `keystore.base64` file
  ```bash
  cat keystore.base64
  ```
  Copy everything and paste into the secret value

#### 2. KEYSTORE_PASSWORD
- **Name:** `KEYSTORE_PASSWORD`
- **Value:** The keystore password you created earlier

#### 3. KEY_ALIAS
- **Name:** `KEY_ALIAS`
- **Value:** `soulvest-key-alias` (or the alias you chose)

#### 4. KEY_PASSWORD
- **Name:** `KEY_PASSWORD`
- **Value:** The key password (same as keystore password if you pressed ENTER)

### Step 3: Verify Secrets

After adding all secrets, you should see:
- ✅ KEYSTORE_FILE
- ✅ KEYSTORE_PASSWORD
- ✅ KEY_ALIAS
- ✅ KEY_PASSWORD

## Security Best Practices

### 🔒 Keep Your Keystore Safe

1. **Backup the keystore file** to multiple secure locations:
   - Encrypted USB drive
   - Secure cloud storage (encrypted)
   - Password manager with file attachment support

2. **Never commit keystore to Git:**
   ```bash
   # Add to .gitignore
   echo "*.jks" >> .gitignore
   echo "*.keystore" >> .gitignore
   echo "keystore.base64" >> .gitignore
   ```

3. **Store passwords securely:**
   - Use a password manager
   - Document password location for team members
   - Never share passwords via email or chat

4. **Limit access:**
   - Only trusted team members should have access
   - Use GitHub's environment protection rules
   - Rotate passwords if someone leaves the team

### 🔐 Keystore Recovery Plan

Document these details in a secure location:

```
Application: Soulvest B'day Card Generator
Package Name: com.soulvest.bdaycard
Keystore File: soulvest-release-key.jks
Key Alias: soulvest-key-alias
Keystore Password: [REDACTED - stored in password manager]
Key Password: [REDACTED - stored in password manager]
Created Date: [Date]
Backup Locations:
  1. [Location 1]
  2. [Location 2]
```

## Troubleshooting

### Problem: "keytool: command not found"

**Solution:** Java JDK is not installed or not in PATH.

- **Install Java JDK:**
  - Ubuntu/Debian: `sudo apt-get install default-jdk`
  - macOS: `brew install openjdk@17`
  - Windows: Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [Adoptium](https://adoptium.net/)

- **Verify installation:**
  ```bash
  java -version
  keytool
  ```

### Problem: GitHub Actions build fails with signing error

**Possible causes:**

1. **Base64 encoding issue:**
   - Re-encode the keystore
   - Make sure no extra newlines or spaces

2. **Wrong password:**
   - Double-check KEYSTORE_PASSWORD and KEY_PASSWORD
   - Re-create the secrets if needed

3. **Wrong alias:**
   - Verify the KEY_ALIAS matches your keystore
   - List aliases: `keytool -list -v -keystore soulvest-release-key.jks`

### Problem: Lost keystore or password

**If you haven't published to Play Store yet:**
- Generate a new keystore (follow this guide again)
- Update GitHub Secrets

**If app is already on Play Store:**
- ⚠️ You CANNOT update the app without the original keystore
- Contact Google Play Support for options
- You may need to publish as a new app (lose existing users/reviews)

### Problem: Keystore expires

Your keystore is valid for 10,000 days (~27 years). If it expires:
- Generate a new keystore
- Upload new app update with new signing key to Play Store
- Google Play handles key rotation automatically for new installations

## Verifying Your Setup

Test that your keystore works:

```bash
# List keystore contents
keytool -list -v -keystore soulvest-release-key.jks

# Expected output:
# - Alias name: soulvest-key-alias
# - Creation date: [date]
# - Entry type: PrivateKeyEntry
# - Valid from: [date] until: [date]
```

## Next Steps

After setting up your keystore:

1. ✅ Secrets added to GitHub
2. ✅ Keystore backed up securely
3. ✅ Read [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md) for building your app
4. ✅ Trigger a workflow to test the setup

---

## Additional Resources

- [Android Developer: Sign your app](https://developer.android.com/studio/publish/app-signing)
- [Android Developer: Manage signing keys](https://developer.android.com/studio/publish/app-signing#manage-key)
- [Google Play: Upload key requirements](https://support.google.com/googleplay/android-developer/answer/9842756)

---

**Need Help?** Open an issue on GitHub or contact the development team.
