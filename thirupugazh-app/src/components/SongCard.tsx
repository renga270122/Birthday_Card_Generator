import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  onPress: () => void;
}

export const SongCard: React.FC<SongCardProps> = ({ song, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{song.songNumber}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{song.title}</Text>
              <Text style={styles.titleTamil}>{song.titleTamil}</Text>
            </View>
          </View>
          
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>📍 Place:</Text>
              <Text style={styles.value}>{song.place}</Text>
              <Text style={styles.valueTamil}>({song.placeTamil})</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>🙏 Topics:</Text>
              <Text style={styles.value}>{song.problem.slice(0, 2).join(', ')}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  numberBadge: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  titleTamil: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  details: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34495e',
    marginRight: 6,
  },
  value: {
    fontSize: 13,
    color: '#555',
    marginRight: 4,
  },
  valueTamil: {
    fontSize: 13,
    color: '#888',
  },
});
