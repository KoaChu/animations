import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Animated, FlatList, TouchableOpacity, Dimensions, useWindowDimensions, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import DrawerButton from '../components/DrawerButton';

const {width, height} = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;


export default function ScrollingYScreen({ navigation }) {
    // const { width, height } = useWindowDimensions();
    const [testData, setTestData] = useState([
        {title: 'left-spacer'},
        {title: 'first'},
        {title: 'second'},
        {title: 'third'},
        {title: 'fourth'},
        {title: 'fifth'},
        {title: 'sixth'},
        {title: 'seventh'},
        {title: 'eighth'},
        {title: 'ninth'},
        {title: 'tenth'},
        {title: 'right-spacer'}
    ]);

    const scrollX = useRef(new Animated.Value(0)).current;

    const Backdrop = ({ testData, scrollX }) => {
        // console.log(testData);
        
        const uris = ['https://speedtest.xfinity.com/images/speedtest-preview.png', 'http://www.testufo.com/images/testufo-banner.png']
        const [uri, setUri] = useState(0);
        // setInterval(() => {
        //     if (uri == 0) {
        //         setUri(1);
        //     } else {
        //         setUri(0);
        //     }
        // }, 3000);
        
        return (
            <View style={{position: 'absolute', width, height: BACKDROP_HEIGHT}}>
                <FlatList
                    data={testData}
                    removeClippedSubviews={false}
                    keyExtractor={(_, i) => i.toString() + '-bd'}
                    contentContainerStyle={{width, height: BACKDROP_HEIGHT, position: 'absolute'}}
                    renderItem={({ item, index }) => {
                        const translateX = scrollX.interpolate({
                            inputRange: [(index-2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                            outputRange: [0, width]
                        });
                        return (
                            <Animated.View 
                                style={{ position: 'absolute', width, height, overflow: 'hidden' }}
                                removeClippedSubviews={false}
                            >
                                <Image
                                    source={{uri: uris[uri] }}
                                    style={{
                                        width,
                                        height: BACKDROP_HEIGHT,
                                        resizeMode: 'cover',
                                        position: 'absolute'
                                    }}
                                />
                            </Animated.View>
                        );
                    }}
                />
                <LinearGradient 
                    colors={['transparent', '#fff']}
                    style={{
                        width,
                        height: BACKDROP_HEIGHT,
                        position: 'absolute',
                        bottom: 0,
                    }}
                />
            </View>
        );
    };

    const renderPost = ({ item, index }) => {
        if (item.title.includes('spacer')) {
            return <View style={{ width: SPACER_SIZE }}/>;
        }
        const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE
        ];
        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100]
        });
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4]
        });
        return (
            <Animated.View 
                style={{
                    width: ITEM_SIZE,
                    transform: [{ translateY }],
                    opacity: opacity,
                }}
            >
                <View style={{...styles.listItem, backgroundColor: index % 2 == 0 ? 'orange' : 'purple'}}>
                    <Text>{item.title}</Text>
                    <Text>{index}</Text>
                </View>
            </Animated.View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // width: width,
            // height: height,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: 'white',
        },
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
        list: {
            // justifyContent: 'center',
            alignItems: 'center',
        },
        listItem: {
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.4,
            // backgroundColor: 'orange',
            padding: SPACING * 2,
            marginHorizontal: SPACING,
            borderRadius: 32,
        },  
    });

    return (
        <View style={styles.container}>
            {/* <StatusBar style="light" /> */}
            <TouchableOpacity style={styles.button}  onPress={() => { navigation.toggleDrawer() }}>
                <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <Backdrop testData={testData} scrollX={scrollX} />
            <Animated.FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
                data={testData}
                // extraData={testData}
                bounces={false}
                scrollEventThrottle={16}
                renderItem={(item) => { return( renderPost(item) ) }}
                keyExtractor={(_, i) => i.toString()}
                horizontal
                // pagingEnabled
                snapToInterval={ITEM_SIZE}
                snapToAlignment={'start'}
                decelerationRate={0}
            />
        </View>
    )
}

