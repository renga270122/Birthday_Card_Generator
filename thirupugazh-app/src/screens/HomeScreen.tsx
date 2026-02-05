import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchBar } from '../components/SearchBar';
import { SongCard } from '../components/SongCard';
import { VoiceButton } from '../components/VoiceButton';
import { thirupugazhSongs } from '../data/thirupugazhSongs';
import { searchSongs } from '../utils/searchHelpers';
import { RootStackParamList, Song } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = useMemo(() => {
    return searchSongs(thirupugazhSongs, searchQuery);
  }, [searchQuery]);

  const handleSongPress = (song: Song) => {
    navigation.navigate('SongDetail', { song });
  };

  const handleVoiceResult = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🕉️ Thirupugazh Songs</Text>
        <Text style={styles.headerSubtitle}>Thai Poosam Special</Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by number, place, or problem..."
      />

      {filteredSongs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>😔 No songs found</Text>
          <Text style={styles.emptySubtext}>Try searching with different keywords</Text>
        </View>
      ) : (
        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SongCard song={item} onPress={() => handleSongPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <VoiceButton onResult={handleVoiceResult} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6B35',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffe0d6',
  },
  listContent: {
    paddingBottom: 80,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
