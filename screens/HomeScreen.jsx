import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {

    const openDrawer = () => {
        navigation.toggleDrawer();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <TouchableOpacity style={styles.button}  onPress={() => { openDrawer() }}>
                <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <Animatable.Text animation="pulse" easing="ease" duration={2000} iterationDelay={2000} iterationCount="infinite" style={styles.title}>
                Choose an animation
            </Animatable.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    title: {
        fontSize: 24,
        color: '#3a9fbf',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        top: 75,
        left: 25,
        backgroundColor: '#3a9fbf',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

