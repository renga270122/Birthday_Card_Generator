import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { IconButton, ActivityIndicator } from 'react-native-paper';
import * as Speech from 'expo-speech';

interface VoiceButtonProps {
  onResult: (text: string) => void;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = async () => {
    try {
      // Note: For a production app, you would use expo-speech or react-native-voice
      // For this demo, we'll show how it would work
      
      Alert.alert(
        'Voice Search',
        'Voice search feature requires device microphone access. This is a demo implementation. In a real app, this would use speech recognition to convert your speech to text.',
        [
          {
            text: 'Try Demo',
            onPress: () => {
              setIsListening(true);
              // Simulate speech recognition
              setTimeout(() => {
                setIsListening(false);
                // Demo: simulate some search terms
                const demoSearches = ['Palani', 'health', 'marriage', '1', 'Thiruchendur'];
                const randomSearch = demoSearches[Math.floor(Math.random() * demoSearches.length)];
                onResult(randomSearch);
                Alert.alert('Voice Recognized', `Search for: "${randomSearch}"`);
              }, 2000);
            }
          },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Voice input is not available on this device.');
    }
  };

  return (
    <TouchableOpacity onPress={handleVoiceInput} style={styles.container}>
      {isListening ? (
        <ActivityIndicator size="small" color="#FF6B35" />
      ) : (
        <IconButton
          icon="microphone"
          iconColor="#FF6B35"
          size={28}
          onPress={handleVoiceInput}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
