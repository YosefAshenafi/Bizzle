import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LevelSelectionScreen } from '../screens/LevelSelectionScreen';
import { GameScreen } from '../screens/GameScreen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ animationTypeForReplace: 'pop' }}
        />
        <Stack.Screen
          name="Levels"
          component={LevelSelectionScreen}
          options={{
            animationTypeForReplace: 'fade',
          }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{
            animationTypeForReplace: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
