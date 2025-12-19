import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';

/**
 * Voice Guidance Component for Rural App (React Native + Expo)
 * Fully fixed version that handles all TTS edge cases
 */

const VoiceGuidance = ({ 
  guidance = [], 
  onHighlight = () => {},
  autoStart = false,
  containerStyle = {}
}) => {
  const [language, setLanguage] = useState('hi'); // 'hi' or 'en'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTtsReady, setIsTtsReady] = useState(false);
  
  const timeoutRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isMountedRef = useRef(true);

  // Initialize TTS
  useEffect(() => {
    isMountedRef.current = true;
    
    const initTts = async () => {
      try {
        // Initialize TTS settings
        await Tts.setDefaultLanguage(language === 'hi' ? 'hi-IN' : 'en-US');
        await Tts.setDefaultRate(0.45);
        await Tts.setDefaultPitch(1.0);
        
        if (isMountedRef.current) {
          setIsTtsReady(true);
        }
      } catch (error) {
        console.error('TTS initialization error:', error);
        // Still set as ready even if there's an error
        if (isMountedRef.current) {
          setIsTtsReady(true);
        }
      }
    };

    initTts();

    // Cleanup
    return () => {
      isMountedRef.current = false;
      
      // Clear any pending timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // Safely stop TTS
      if (isTtsReady) {
        try {
          Tts.stop();
        } catch (err) {
          // Silently ignore stop errors on unmount
          console.log('TTS stop on unmount:', err.message);
        }
      }
    };
  }, []);

  // Update language when it changes
  useEffect(() => {
    if (isMountedRef.current && isTtsReady) {
      Tts.setDefaultLanguage(language === 'hi' ? 'hi-IN' : 'en-US').catch(err => 
        console.error('Error setting language:', err)
      );
    }
  }, [language, isTtsReady]);

  // Toggle language between Hindi and English
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
    if (isPlaying) {
      stopGuidance();
    }
  };

  // Toggle sound on/off
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    if (isPlaying && soundEnabled) {
      stopGuidance();
    }
  };

  // Stop current guidance
  const stopGuidance = () => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Stop TTS if ready and playing
    if (isTtsReady && isPlayingRef.current) {
      try {
        Tts.stop();
      } catch (error) {
        console.error('Error stopping TTS:', error);
      }
    }
    
    isPlayingRef.current = false;
    if (isMountedRef.current) {
      setIsPlaying(false);
      onHighlight(null);
    }
  };

  // Speak a single guidance item
  const speakText = async (text, highlightId, duration) => {
    if (!isMountedRef.current) return;
    
    // Highlight the button
    onHighlight(highlightId);

    if (soundEnabled && text && isTtsReady) {
      try {
        await Tts.speak(text);
        
        // Wait a bit after speech if still playing
        if (isPlayingRef.current && isMountedRef.current) {
          await new Promise(resolve => {
            timeoutRef.current = setTimeout(resolve, 500);
          });
        }
      } catch (error) {
        console.error('TTS speak error:', error);
        // Fallback timing if TTS fails
        if (isPlayingRef.current && isMountedRef.current) {
          await new Promise(resolve => {
            timeoutRef.current = setTimeout(resolve, duration || 3000);
          });
        }
      }
    } else {
      // If sound is disabled or TTS not ready, just show highlight for duration
      if (isPlayingRef.current && isMountedRef.current) {
        await new Promise(resolve => {
          timeoutRef.current = setTimeout(resolve, duration || 3000);
        });
      }
    }
  };

  // Play all guidance items sequentially
  const playGuidance = async () => {
    if (guidance.length === 0) {
      console.warn('No guidance items provided');
      return;
    }
    
    if (!isTtsReady) {
      console.warn('TTS not ready yet');
      return;
    }
    
    isPlayingRef.current = true;
    if (isMountedRef.current) {
      setIsPlaying(true);
    }
    
    try {
      for (let i = 0; i < guidance.length; i++) {
        if (!isPlayingRef.current || !isMountedRef.current) {
          break;
        }
        
        const item = guidance[i];
        const text = item.text[language];
        
        if (!text) {
          console.warn(`No text found for language ${language} at index ${i}`);
          continue;
        }
        
        await speakText(text, item.highlightId, item.duration);
        
        // Small pause between items
        if (i < guidance.length - 1 && isPlayingRef.current && isMountedRef.current) {
          await new Promise(resolve => {
            timeoutRef.current = setTimeout(resolve, 300);
          });
        }
      }
    } catch (error) {
      console.error('Guidance playback error:', error);
    } finally {
      // Clean up after completion
      isPlayingRef.current = false;
      if (isMountedRef.current) {
        setIsPlaying(false);
        onHighlight(null);
      }
    }
  };

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && guidance.length > 0 && isMountedRef.current && isTtsReady) {
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          playGuidance();
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, isTtsReady]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.controls}>
        {/* Language Toggle */}
        <TouchableOpacity 
          style={[styles.button, styles.languageButton]}
          onPress={toggleLanguage}
          activeOpacity={0.7}
          disabled={!isTtsReady}
        >
          <Text style={styles.buttonText}>
            {language === 'hi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </Text>
        </TouchableOpacity>

        {/* Sound Toggle */}
        <TouchableOpacity 
          style={[styles.button, styles.soundButton]}
          onPress={toggleSound}
          activeOpacity={0.7}
          disabled={!isTtsReady}
        >
          <Text style={styles.buttonText}>
            {soundEnabled ? '🔊 ध्वनि' : '🔇 मौन'}
          </Text>
        </TouchableOpacity>

        {/* Play/Stop Button */}
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.playButton, 
            isPlaying && styles.playButtonActive,
            !isTtsReady && styles.buttonDisabled
          ]}
          onPress={isPlaying ? stopGuidance : playGuidance}
          activeOpacity={0.7}
          disabled={!isTtsReady || guidance.length === 0}
        >
          <Text style={styles.buttonText}>
            {!isTtsReady ? '⏳ लोड...' : isPlaying ? '⏹ रोकें' : '▶ मार्गदर्शन'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  languageButton: {
    backgroundColor: '#2196F3',
  },
  soundButton: {
    backgroundColor: '#FF9800',
  },
  playButton: {
    backgroundColor: '#4CAF50',
  },
  playButtonActive: {
    backgroundColor: '#f44336',
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default VoiceGuidance;