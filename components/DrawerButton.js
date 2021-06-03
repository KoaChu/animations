import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function DrawerButton({ navigation }) {
    return (
        <TouchableOpacity style={styles.button}  onPress={() => { navigation.toggleDrawer() }}>
            <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        top: 75,
        left: 25,
        zIndex: 99,
        backgroundColor: '#3a9fbf',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
