import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ScrollingYScreen from '../screens/ScrollingYScreen';
import GalleryScreen from '../screens/GalleryScreen';
import SharedListScreen from '../screens/SharedElement/SharedListScreen';
import SharedDetailsScreen from '../screens/SharedElement/SharedDetailsScreen';
import ButtonTransitionScreen from '../screens/ButtonTransitionScreen';
import CircularListScreen from '../screens/CircularListScreen';

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();

export default MainDrawer = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerPosition={'left'} drawerType={'front'} initialRouteName="Home">
                <Drawer.Screen name='Home' component={HomeScreen} />
                <Drawer.Screen name='Scroll X' component={ScrollingYScreen} />
                <Drawer.Screen name='Gallery' component={GalleryScreen} />
                <Drawer.Screen name='Shared Element' component={SharedStack} />
                <Drawer.Screen name='Button Transition' component={ButtonTransitionScreen} />
                <Drawer.Screen name='Circle List' component={CircularListScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export const SharedStack = () => {
    return (
        <Stack.Navigator screenOptions={null} headerMode={'none'} initialRouteName="Shared Element">
            <Stack.Screen name='List' component={SharedListScreen} />
            <Stack.Screen name='Details' component={SharedDetailsScreen} />
        </Stack.Navigator>
    );
}

// const options = () => ({
//     gestureEnabled: false,
//     transitionSpec: {
//       open: {animation: 'timing', config: {duration: 1000}},
//       close: {animation: 'timing', config: {duration: 0}},
//     },
//     cardStyleInterpolator: ({current: {progress}}) => ({
//       cardStyle: {opacity: progress },
//     }),
//   });