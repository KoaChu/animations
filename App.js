import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainDrawer from './navigator/navigator';

export default function App() {
  return (
    <MainDrawer />
  );
}
