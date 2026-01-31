# GitHub Actions Workflows

This directory contains automated workflows for the Soulvest B'day Card Generator project.

## Available Workflows

### 🤖 Build Android App Bundle (`android-build.yml`)

Automated CI/CD pipeline for building production-ready Android App Bundles (AAB) for Google Play Store deployment.

#### Triggers

The workflow runs automatically on:

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **Pull requests to main**
   - Builds AAB for testing
   - Comments on PR with build results and download link

3. **Version tags** (e.g., `v1.0.0`, `v2.0`)
   ```bash
   git tag -a v1.0.0 -m "Release 1.0.0"
   git push origin v1.0.0
   ```
   - Builds AAB
   - Creates GitHub Release with AAB attached

4. **Manual trigger** (workflow_dispatch)
   - Go to Actions tab
   - Select "Build Android App Bundle"
   - Click "Run workflow"

#### What It Does

The workflow performs these steps in order:

1. **Environment Setup**
   - Checks out repository code
   - Sets up Node.js 20 with npm caching
   - Sets up Java 17 with Gradle caching
   - Installs dependencies with `npm ci`

2. **Build Web Assets**
   - Runs build script if available
   - Creates dist directory with web content
   - Ensures Capacitor has assets to sync

3. **Android Preparation**
   - Syncs Capacitor to Android platform
   - Sets up Android SDK and build tools
   - Grants execute permission to Gradle wrapper

4. **Quality Checks** (optional, non-blocking)
   - Runs Android lint checks
   - Executes unit tests if configured
   - Continues build even if these fail

5. **Keystore & Signing**
   - Decodes keystore from base64 (if secrets configured)
   - Sets up signing configuration
   - Falls back to unsigned build if no keystore

6. **Version Management**
   - Extracts version from git tags
   - Calculates version code from commit count
   - Updates `build.gradle` with version info

7. **Build AAB**
   - Builds release variant of Android App Bundle
   - Signs with keystore (if available)
   - Generates SHA256 checksum

8. **Artifact Management**
   - Renames AAB with version number
   - Generates build info file with checksums
   - Uploads as workflow artifact (90-day retention)

9. **PR Integration**
   - Comments on pull requests with build status
   - Includes download link and version info
   - Shows file size and checksum

10. **Release Creation** (on tags only)
    - Creates GitHub Release
    - Attaches AAB file and build info
    - Includes verification instructions

#### Required GitHub Secrets

For signed builds, configure these secrets in repository settings:

| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `KEYSTORE_FILE` | Base64-encoded keystore | See [KEYSTORE_SETUP.md](../KEYSTORE_SETUP.md) |
| `KEYSTORE_PASSWORD` | Keystore password | Created during keystore generation |
| `KEY_ALIAS` | Key alias name | Specified during keystore generation |
| `KEY_PASSWORD` | Key password | Created during keystore generation |

**Note:** Workflow works without secrets (produces unsigned AAB), but signed AAB is required for Play Store.

#### Outputs & Artifacts

After successful build:

**Workflow Artifacts:**
- `android-app-bundle.zip` containing:
  - `soulvest-bdaycard-v{version}.aab` - The app bundle
  - `build-info.txt` - Build metadata and checksums

**GitHub Release** (on tags):
- AAB file attached
- Release notes with version info
- SHA256 checksum for verification

**PR Comment** (on pull requests):
- Build status (✅/❌)
- Version and file size
- Download link to artifacts

#### Permissions

The workflow requires these permissions:

```yaml
permissions:
  contents: write        # For creating releases
  pull-requests: write   # For PR comments
```

These are already configured in the workflow file.

## Workflow Configuration

### Caching Strategy

The workflow uses GitHub Actions caching to speed up builds:

- **npm cache:** `~/.npm` directory
- **Gradle cache:** `~/.gradle` directory

Benefits:
- Faster dependency installation
- Reduced build time (5-10 min → 3-5 min)
- Lower bandwidth usage

### Build Environment

- **OS:** Ubuntu Latest (ubuntu-latest)
- **Node.js:** Version 20
- **Java:** Version 17 (Temurin distribution)
- **Gradle:** Managed by project wrapper

### Build Optimization

1. **Parallel execution:** Gradle builds use parallel execution
2. **Incremental builds:** Gradle's incremental compilation
3. **Cached dependencies:** npm and Gradle caches
4. **Fail-fast disabled:** Lint/test failures don't stop build

### Customization

#### Change Node.js Version

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'  # Change to 18, 20, etc.
```

#### Change Java Version

```yaml
- name: Setup Java
  uses: actions/setup-java@v4
  with:
    java-version: '17'  # Change to 17, 21, etc.
```

#### Add Build Steps

Add custom steps between existing ones:

```yaml
- name: Run custom script
  run: npm run custom-script
```

#### Modify Triggers

Add or remove triggers:

```yaml
on:
  push:
    branches: [ main, develop ]  # Add more branches
  schedule:
    - cron: '0 0 * * 0'  # Weekly builds
```

## Troubleshooting Workflows

### Workflow Fails: "npm ci failed"

**Cause:** Dependencies or lock file issue

**Solution:**
```bash
# Locally:
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Fix dependencies"
git push
```

### Workflow Fails: "Gradle build failed"

**Cause:** Gradle configuration or Android SDK issue

**Solutions:**
1. Check `android/app/build.gradle` syntax
2. Verify SDK versions are compatible
3. Check error logs in workflow details
4. Test locally: `cd android && ./gradlew bundleRelease`

### Workflow Fails: "Signing failed"

**Cause:** Invalid keystore or secrets

**Solutions:**
1. Verify all 4 secrets are set correctly
2. Check keystore base64 encoding
3. Ensure passwords are correct
4. See [KEYSTORE_SETUP.md](../KEYSTORE_SETUP.md) for details

### No Artifact Generated

**Cause:** Build succeeded but upload failed

**Solution:**
- Check workflow logs for upload step
- Verify file paths in workflow
- Ensure sufficient storage in GitHub

### Permission Denied Errors

**Cause:** Insufficient workflow permissions

**Solution:**
- Ensure permissions are set in workflow file
- Check repository settings → Actions → General
- Enable "Read and write permissions"

## Monitoring Workflows

### View Active Workflows

```
Repository → Actions → All workflows
```

### Check Workflow Status

- 🟢 Green: Success
- 🔴 Red: Failed
- 🟡 Yellow: In progress
- ⚪ Gray: Queued

### Download Logs

1. Click workflow run
2. Click job name
3. Click ⋮ (three dots) → View raw logs
4. Or download from top-right

## Best Practices

### Before Pushing

1. ✅ Test changes locally
2. ✅ Ensure `package-lock.json` is committed
3. ✅ Check for syntax errors
4. ✅ Review changed files

### Managing Secrets

1. 🔒 Never commit secrets to Git
2. 🔒 Rotate secrets periodically
3. 🔒 Use environment protection for sensitive workflows
4. 🔒 Limit secret access to required workflows

### Version Control

1. 📌 Use semantic versioning (v1.0.0, v1.1.0, v2.0.0)
2. 📌 Tag releases consistently
3. 📌 Write clear commit messages
4. 📌 Document breaking changes

### Workflow Maintenance

1. 🔧 Keep actions up to date (@v4, @v3, etc.)
2. 🔧 Review and optimize caching strategy
3. 🔧 Monitor workflow execution times
4. 🔧 Remove unused workflows

## Metrics & Insights

Access workflow metrics:

```
Repository → Insights → Actions
```

View:
- Workflow run duration trends
- Success/failure rates
- Most active workflows
- Billable time (for private repos)

## Adding New Workflows

To add a new workflow:

1. Create new `.yml` file in `.github/workflows/`
2. Define triggers and jobs
3. Test with manual trigger first
4. Document in this README

Example workflow template:

```yaml
name: My New Workflow

on:
  workflow_dispatch:

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Run something
        run: echo "Hello World"
```

## Resources

### Documentation
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Android Actions](https://github.com/marketplace?type=actions&query=android)

### Related Files
- [BUILD_INSTRUCTIONS.md](../BUILD_INSTRUCTIONS.md) - How to build the app
- [KEYSTORE_SETUP.md](../KEYSTORE_SETUP.md) - Keystore configuration
- [README.md](../README.md) - Project overview

## Support

### Getting Help

1. Check workflow logs for error messages
2. Review this documentation
3. Open an issue on GitHub
4. Contact the development team

### Reporting Issues

When reporting workflow issues, include:
- Workflow name
- Run number
- Error message
- Steps to reproduce

---

**Last Updated:** 2026-01-31  
**Maintained by:** Soulvest Development Team
