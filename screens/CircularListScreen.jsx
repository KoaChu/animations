import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Easing, FlatList } from 'react-native'

import DrawerButton from "../components/DrawerButton";

const { width, height } = Dimensions.get('window');
const LARGE_CIRCLE_SIZE = width;
const RADIUS = LARGE_CIRCLE_SIZE / 2;
const SMALL_CIRCLE_SIZE = width / 2;
const SPACING = 10;
const ITEM_HEIGHT = 50;
const ITEM_SIZE = ITEM_HEIGHT + SPACING * 2;
const SNAPSHOT = 50;

const colors = [
    { color: '', key: '-1' },
    { color: '#82E0AA', key: '1' },
    { color: '#9B59B6', key: '2' },
    { color: '#F1948A', key: '3' },
    { color: '#F7F9F9', key: '4' },
    { color: '#EB984E', key: '5' },
    { color: '#85C1E9', key: '6' },
    { color: '#F1C40F', key: '7' },
    { color: '#ABB2B9', key: '8' },
    { color: '#F5B7B1', key: '9' },
    { color: '#FAE5D3', key: '10' },
    { color: '#E8DAEF', key: '11' },
    { color: '#21618C', key: '12' },
    { color: '#ABEBC6', key: '13' },
    { color: '#76448A', key: '14' },
    { color: '#F9E79F', key: '15' },
    { color: '#616A6B', key: '16' },
    { color: '#D35400', key: '17' },
    { color: '#F2D7D5', key: '18' },
    { color: '#D1F2EB', key: '19' },
    { color: '#FDF2E9', key: '20' },
    { color: '', key: '999' },
]

const CircleList = ({ animatedPosValue, setColor }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [activeIndex, setActiveIndex] = useState(0);

    const translateXShow = animatedPosValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, -LARGE_CIRCLE_SIZE / 2],
    });

    const scrollActiveIndex = (index) => {
        setActiveIndex(index);
        setColor(colors[index + 1].color);
    }

    return (
        <Animated.View 
            style={{
                backgroundColor: '#212F3D',
                justifyContent: 'center',
                alignItems: 'center',
                width: LARGE_CIRCLE_SIZE,
                height: LARGE_CIRCLE_SIZE,
                borderRadius: LARGE_CIRCLE_SIZE / 2,
                position: 'absolute',
                top: height / 2 - LARGE_CIRCLE_SIZE / 2,
                transform: [
                    { translateX: translateXShow },
                ]
            }}
        >
            <FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={(ev) => {
                    scrollActiveIndex(Math.floor(ev.nativeEvent.contentOffset.y / ITEM_SIZE))
                }}
                showsVerticalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
                data={colors}
                keyExtractor={item => item.key}
                style={styles.list}
                contentContainerStyle={{
                    marginLeft: LARGE_CIRCLE_SIZE / 1.65,
                }}
                snapToInterval={ITEM_SIZE}
                snapToAlignment={'start'}
                decelerationRate={0}
                renderItem={({ item, index }) => {
                    const inputRange =[(index - 3) * ITEM_SIZE, (index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, (index) * ITEM_SIZE, (index + 1) * ITEM_SIZE];
                    const opacity = scrollY.interpolate({
                        inputRange,
                        outputRange: [0.2, 0.4, 1, 0.4, 0.2]
                    });

                    const translateXItem = scrollY.interpolate({
                        inputRange,
                        outputRange: [-100, -35, 0, -35, -100]
                    });

                    return (
                        <Animated.View
                            style={{
                                // backgroundColor: 'blue',
                                width: '100%',
                                height: item.color === '' ? LARGE_CIRCLE_SIZE / 2.75 : ITEM_HEIGHT,
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: SPACING,
                                opacity: opacity,
                                transform: [
                                    {
                                        translateX: translateXItem,
                                    },
                                ]
                            }}
                        >
                            <Text 
                                style= {{
                                    color: 'white',
                                    fontSize: 24,
                                }}
                            >
                                {item.color}
                            </Text>
                        </Animated.View>
                    )
                }}
            />
        </Animated.View>
    );
}

export default function CircularListScreen({ navigation }) {
    const animatedPosValue = useRef(new Animated.Value(0)).current;

    const [opened, setOpened] = useState(false);
    const [color, setColor] = useState('#82E0AA');

    const openList = (toValue) => 
        Animated.timing(animatedPosValue, {
            toValue,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.elastic(1)
        });

    const toggleList = () => {
        openList(opened ? 0 : 1).start();
        setOpened(!opened);
    }

    return (
        <View 
            style={{
                flex: 1,
                backgroundColor: color || '#82E0AA',
            }}
        >
            <DrawerButton navigation={navigation} />
            <CircleList setColor={setColor} animatedPosValue={animatedPosValue} />
            <TouchableOpacity
                onPress={toggleList}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{opened ? 'close' : 'open'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#82E0AA',
    },
    button: {
        backgroundColor: '#212F3D',
        width: SMALL_CIRCLE_SIZE,
        height: SMALL_CIRCLE_SIZE,
        borderRadius: SMALL_CIRCLE_SIZE / 2,
        position: 'absolute',
        right: -SMALL_CIRCLE_SIZE / 2,
        top: height - SMALL_CIRCLE_SIZE / 2,
    },  
    buttonText: {
        color: 'white',
        fontSize: 18,
        position: 'absolute',
        top: SMALL_CIRCLE_SIZE / 4.5,
        left: SMALL_CIRCLE_SIZE / 4.5,
    },
    list: {
        alignSelf: 'center'
    },  
});
