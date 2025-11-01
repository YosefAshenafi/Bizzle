import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/colors';

export const AnimatedBackground = ({ children, variant = 'primary' }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.6, { duration: 3000, easing: Easing.ease }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const colors = variant === 'primary' ? GRADIENTS.primary : GRADIENTS.secondary;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.darker }}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: COLORS.white,
            },
            animatedStyle,
          ]}
        />
        <View style={{ flex: 1, position: 'relative' }}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};
