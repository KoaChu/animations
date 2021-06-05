import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated'
import { StyleSheet, Text, View } from 'react-native';

import MainDrawer from './navigator/navigator';

export default function App() {
  return (
    <MainDrawer />
  );
}
