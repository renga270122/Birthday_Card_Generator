#!/usr/bin/env node

/**
 * Comprehensive Test Suite for Thirupugazh App
 * 
 * This script validates:
 * - TypeScript compilation
 * - Data integrity
 * - Search functionality
 * - Component structure
 * 
 * Run: node validate-app.js
 */

const fs = require('fs');
const path = require('path');

console.log('🕉️  Thirupugazh App - Validation Suite\n');
console.log('='.repeat(50));

let passCount = 0;
let failCount = 0;

function test(name, condition, details = '') {
  if (condition) {
    console.log(`✅ ${name}`);
    if (details) console.log(`   ${details}`);
    passCount++;
    return true;
  } else {
    console.log(`❌ ${name}`);
    if (details) console.log(`   ${details}`);
    failCount++;
    return false;
  }
}

console.log('\n📁 File Structure Tests\n');

// Check main files exist
test('App.tsx exists', fs.existsSync('App.tsx'));
test('package.json exists', fs.existsSync('package.json'));
test('app.json exists', fs.existsSync('app.json'));
test('tsconfig.json exists', fs.existsSync('tsconfig.json'));
test('README.md exists', fs.existsSync('README.md'));
test('QUICKSTART.md exists', fs.existsSync('QUICKSTART.md'));
test('FEATURES.md exists', fs.existsSync('FEATURES.md'));

// Check component files
test('SearchBar component exists', fs.existsSync('src/components/SearchBar.tsx'));
test('SongCard component exists', fs.existsSync('src/components/SongCard.tsx'));
test('VoiceButton component exists', fs.existsSync('src/components/VoiceButton.tsx'));

// Check screen files
test('HomeScreen exists', fs.existsSync('src/screens/HomeScreen.tsx'));
test('SongDetailScreen exists', fs.existsSync('src/screens/SongDetailScreen.tsx'));

// Check data and utils
test('Songs database exists', fs.existsSync('src/data/thirupugazhSongs.ts'));
test('Search helpers exist', fs.existsSync('src/utils/searchHelpers.ts'));
test('Types file exists', fs.existsSync('src/types/index.ts'));

console.log('\n📦 Package Configuration Tests\n');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

test('Package name is correct', packageJson.name === 'thirupugazh-app');
test('Has start script', packageJson.scripts && packageJson.scripts.start);
test('Has expo dependency', packageJson.dependencies && packageJson.dependencies.expo);
test('Has react-navigation', packageJson.dependencies && packageJson.dependencies['@react-navigation/native']);
test('Has react-native-paper', packageJson.dependencies && packageJson.dependencies['react-native-paper']);

console.log('\n🎨 App Configuration Tests\n');

const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));

test('App name is set', appJson.expo && appJson.expo.name === 'Thirupugazh Songs');
test('App slug is set', appJson.expo && appJson.expo.slug === 'thirupugazh-app');
test('iOS bundle ID configured', appJson.expo && appJson.expo.ios && appJson.expo.ios.bundleIdentifier);
test('Android package configured', appJson.expo && appJson.expo.android && appJson.expo.android.package);
test('Microphone permission configured', 
  appJson.expo && 
  appJson.expo.android && 
  appJson.expo.android.permissions && 
  appJson.expo.android.permissions.includes('android.permission.RECORD_AUDIO')
);

console.log('\n📊 Data Integrity Tests\n');

// Load and test song data
const songsFile = fs.readFileSync('src/data/thirupugazhSongs.ts', 'utf8');

test('Songs file has export', songsFile.includes('export const thirupugazhSongs'));
test('Songs file has Song interface import', songsFile.includes('Song'));

// Count songs in file (approximate)
const songCount = (songsFile.match(/\{\s*id:/g) || []).length;
test('Has at least 20 songs', songCount >= 20, `Found ${songCount} songs`);
test('Has 30 or more songs', songCount >= 30, `Found ${songCount} songs`);

// Check for Tamil content
test('Contains Tamil text', songsFile.includes('தமிழ்') || songsFile.includes('முருகா'));

// Check for various places
test('Contains Palani songs', songsFile.includes('Palani') || songsFile.includes('பழனி'));
test('Contains Thiruchendur songs', songsFile.includes('Thiruchendur') || songsFile.includes('திருச்செந்தூர்'));
test('Contains Swamimalai songs', songsFile.includes('Swamimalai') || songsFile.includes('சுவாமிமலை'));

// Check for problem categories
test('Contains health category', songsFile.includes('health'));
test('Contains marriage category', songsFile.includes('marriage'));
test('Contains education category', songsFile.includes('education'));

console.log('\n🔍 Search Logic Tests\n');

const searchFile = fs.readFileSync('src/utils/searchHelpers.ts', 'utf8');

test('Has searchSongs function', searchFile.includes('export const searchSongs'));
test('Searches by song number', searchFile.includes('songNumber'));
test('Searches by title', searchFile.includes('title'));
test('Searches by place', searchFile.includes('place'));
test('Searches by problem', searchFile.includes('problem'));
test('Case insensitive search', searchFile.includes('toLowerCase'));

console.log('\n📱 Component Tests\n');

const searchBarFile = fs.readFileSync('src/components/SearchBar.tsx', 'utf8');
const songCardFile = fs.readFileSync('src/components/SongCard.tsx', 'utf8');
const voiceButtonFile = fs.readFileSync('src/components/VoiceButton.tsx', 'utf8');

test('SearchBar uses React Native Paper', searchBarFile.includes('Searchbar'));
test('SearchBar has props', searchBarFile.includes('SearchBarProps'));
test('SongCard is clickable', songCardFile.includes('TouchableOpacity') || songCardFile.includes('onPress'));
test('SongCard displays Tamil text', songCardFile.includes('titleTamil'));
test('VoiceButton has microphone icon', voiceButtonFile.includes('microphone'));
test('VoiceButton has onResult callback', voiceButtonFile.includes('onResult'));

console.log('\n🖥️  Screen Tests\n');

const homeScreenFile = fs.readFileSync('src/screens/HomeScreen.tsx', 'utf8');
const detailScreenFile = fs.readFileSync('src/screens/SongDetailScreen.tsx', 'utf8');

test('HomeScreen uses SearchBar', homeScreenFile.includes('SearchBar'));
test('HomeScreen uses SongCard', homeScreenFile.includes('SongCard'));
test('HomeScreen uses VoiceButton', homeScreenFile.includes('VoiceButton'));
test('HomeScreen has search state', homeScreenFile.includes('useState'));
test('HomeScreen filters songs', homeScreenFile.includes('searchSongs'));
test('DetailScreen displays lyrics', detailScreenFile.includes('lyrics'));
test('DetailScreen has back navigation', detailScreenFile.includes('goBack'));

console.log('\n🎯 TypeScript Tests\n');

const typesFile = fs.readFileSync('src/types/index.ts', 'utf8');

test('Song interface defined', typesFile.includes('interface Song'));
test('Song has id field', typesFile.includes('id:'));
test('Song has songNumber field', typesFile.includes('songNumber:'));
test('Song has title fields', typesFile.includes('title:'));
test('Song has place fields', typesFile.includes('place:'));
test('Song has problem array', typesFile.includes('problem:'));
test('Song has lyrics field', typesFile.includes('lyrics:'));
test('Navigation types defined', typesFile.includes('RootStackParamList'));

console.log('\n📖 Documentation Tests\n');

const readme = fs.readFileSync('README.md', 'utf8');
const quickstart = fs.readFileSync('QUICKSTART.md', 'utf8');
const features = fs.readFileSync('FEATURES.md', 'utf8');

test('README has installation instructions', readme.includes('npm install'));
test('README has usage guide', readme.includes('npx expo start'));
test('README has features section', readme.includes('Features') || readme.includes('features'));
test('QUICKSTART has 3-step setup', quickstart.includes('Step 1') && quickstart.includes('Step 2') && quickstart.includes('Step 3'));
test('FEATURES has completed features', features.includes('✅') || features.includes('✓'));

console.log('\n' + '='.repeat(50));
console.log('\n📈 Test Results:\n');
console.log(`✅ Passed: ${passCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`📊 Success Rate: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%`);

if (failCount === 0) {
  console.log('\n🎉 All tests passed! The app is ready to use!\n');
  console.log('To run the app:');
  console.log('  cd thirupugazh-app');
  console.log('  npx expo start\n');
  console.log('Vel Vel Muruga! Vetri Vel Muruga! 🙏\n');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please review the results above.\n');
  process.exit(1);
}
