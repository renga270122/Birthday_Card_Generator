import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type SongDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SongDetail'
>;

type SongDetailScreenRouteProp = RouteProp<RootStackParamList, 'SongDetail'>;

interface SongDetailScreenProps {
  navigation: SongDetailScreenNavigationProp;
  route: SongDetailScreenRouteProp;
}

export const SongDetailScreen: React.FC<SongDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { song } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
      
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor="#fff"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Song Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.songNumberContainer}>
          <Text style={styles.songNumberLabel}>Song Number</Text>
          <Text style={styles.songNumber}>{song.songNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.titleTamil}>{song.titleTamil}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Place:</Text>
            <View>
              <Text style={styles.infoValue}>{song.place}</Text>
              <Text style={styles.infoValueTamil}>{song.placeTamil}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🙏 Topics:</Text>
            <View style={styles.topicsContainer}>
              {song.problem.map((problem, index) => (
                <View key={index} style={styles.topicBadge}>
                  <Text style={styles.topicText}>{problem}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.lyricsSection}>
          <Text style={styles.lyricsTitle}>🎵 Lyrics</Text>
          <View style={styles.lyricsCard}>
            <Text style={styles.lyrics}>{song.lyrics}</Text>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  songNumberContainer: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  songNumberLabel: {
    color: '#ffe0d6',
    fontSize: 14,
    marginBottom: 4,
  },
  songNumber: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  titleTamil: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#34495e',
    width: 100,
  },
  infoValue: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  infoValueTamil: {
    fontSize: 14,
    color: '#888',
  },
  topicsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicBadge: {
    backgroundColor: '#FFE8E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  topicText: {
    color: '#FF6B35',
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  lyricsSection: {
    marginBottom: 16,
  },
  lyricsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  lyricsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  lyrics: {
    fontSize: 16,
    lineHeight: 28,
    color: '#34495e',
  },
});
