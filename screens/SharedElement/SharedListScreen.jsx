import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import { SharedElement } from 'react-native-shared-element';

import users from './SharedElementScreen';
import DrawerButton from '../../components/DrawerButton';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_HEIGHT = height * 0.18

export default function SharedListScreen({ navigation }) {


    // useEffect(() => {
    //     console.log(users);
    // },[]);

    return (
        <SafeAreaView style={styles.container}>
            <DrawerButton navigation={navigation}/>
            <FlatList
                data={users}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                    padding: SPACING
                }}
                renderItem = {({item}) => {
                    return (
                        <TouchableOpacity 
                            style={{ marginBottom: SPACING, height: ITEM_HEIGHT }} 
                            onPress={() => {
                                navigation.navigate('Details', {item});
                            }}
                        >
                            <View style={{ flex: 1, padding: SPACING }}>
                                <SharedElement id={`item.${item.key}.bg`} style={{ ...StyleSheet.absoluteFillObject }}>
                                    <View style={{...StyleSheet.absoluteFillObject, backgroundColor: item.color, borderRadius: 16}}/>
                                </SharedElement>
                                <SharedElement id={`item.${item.key}.name`}>
                                    <Text style={styles.name}>{item.name}</Text>
                                </SharedElement>
                                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                                <Text>{item.key}</Text>
                                <SharedElement id={`item.${item.key}.image`} style={styles.image}>
                                    <Image source={{ uri: item.image }} style={styles.image}/>
                                </SharedElement>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            <SharedElement id="general.bg">
                <View style={styles.bg} />
            </SharedElement>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    name: {
        fontWeight: '700',
        fontSize: 18,
        position: 'absolute'
    },
    jobTitle: {
        fontSize: 11,
        opacity: 0.7,
        marginTop: 18 * 1.3,
    },
    image: {
        width: ITEM_HEIGHT * 0.8,
        height: ITEM_HEIGHT * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
        right: SPACING,
    },
    bg: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'blue',
        transform: [{ translateY: height }],
        borderRadius: 32,
    }
});
