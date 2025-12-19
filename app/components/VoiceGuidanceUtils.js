import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * Button Highlight Utility for React Native
 * Provides animation and styling for highlighting buttons during voice guidance
 */

// Create animated pulse effect for highlighted buttons
export const createPulseAnimation = () => {
  const pulseAnim = new Animated.Value(1);
  let animation = null;
  
  const startPulse = () => {
    animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
  };
  
  const stopPulse = () => {
    if (animation) {
      animation.stop();
    }
    pulseAnim.setValue(1);
  };
  
  return { pulseAnim, startPulse, stopPulse };
};

// Styles for highlighted buttons
export const highlightStyles = {
  highlighted: {
    borderWidth: 3,
    borderColor: '#FFD700',
    backgroundColor: '#FFF9E6',
    elevation: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
};

// Hook to manage button highlighting
export const useButtonHighlight = () => {
  const [highlightedButton, setHighlightedButton] = useState(null);
  const pulseAnimations = useRef({});
  
  const highlightButton = (buttonId) => {
    // Stop previous animation if any
    if (highlightedButton && pulseAnimations.current[highlightedButton]) {
      pulseAnimations.current[highlightedButton].stopPulse();
    }
    
    setHighlightedButton(buttonId);
    
    // Start new animation
    if (buttonId) {
      if (!pulseAnimations.current[buttonId]) {
        pulseAnimations.current[buttonId] = createPulseAnimation();
      }
      pulseAnimations.current[buttonId].startPulse();
    }
  };
  
  const clearHighlight = () => {
    if (highlightedButton && pulseAnimations.current[highlightedButton]) {
      pulseAnimations.current[highlightedButton].stopPulse();
    }
    setHighlightedButton(null);
  };
  
  const isHighlighted = (buttonId) => highlightedButton === buttonId;
  
  const getButtonStyle = (buttonId) => {
    if (isHighlighted(buttonId)) {
      return highlightStyles.highlighted;
    }
    return {};
  };
  
  const getAnimatedStyle = (buttonId) => {
    if (isHighlighted(buttonId) && pulseAnimations.current[buttonId]) {
      return {
        transform: [{ scale: pulseAnimations.current[buttonId].pulseAnim }],
      };
    }
    return {};
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(pulseAnimations.current).forEach(anim => {
        if (anim && anim.stopPulse) {
          anim.stopPulse();
        }
      });
    };
  }, []);
  
  return {
    highlightedButton,
    highlightButton,
    clearHighlight,
    isHighlighted,
    getButtonStyle,
    getAnimatedStyle,
  };
};

export default {
  createPulseAnimation,
  highlightStyles,
  useButtonHighlight,
};