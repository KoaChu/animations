import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('screen');

const KEY = '563492ad6f9170000100000175a7100546324c239291fc4852dba7cc';
const API_URL = `https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20`
const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImagesFromPexels = async () => {
    const data = await fetch(API_URL, {
        headers: {
            'Authorization': KEY
        }    
    });
    const { photos } = await data.json();

    return photos;
}

export default function GalleryScreen({ navigation }) {
    const [images, setImages] = useState(null);
    useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchImagesFromPexels();
            
            setImages(images);
        }

        fetchImages();
    },[]);

    const topRef = useRef();
    const thumbRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollActiveIndex = (index) => {
        //set index
        setActiveIndex(index);
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true,
        })
        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            thumbRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true
            })
        } else {
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }
        //scroll flatlists


    }

    if (!images) {
        return <Text>Loading...</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#000'
            }}
        >
            <TouchableOpacity style={styles.button}  onPress={() => { navigation.toggleDrawer() }}>
                <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <FlatList
                ref={topRef}
                data={images}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <View style={{width, height}}>
                            <Image
                                source={{uri: item.src.portrait}}
                                style={styles.fillScreen}
                            />
                        </View>
                    )
                }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={ev => {
                    scrollActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
                }}
            />
            <FlatList
                ref={thumbRef}
                style={{
                    position: 'absolute',
                    bottom: IMAGE_SIZE,
                }}
                contentContainerStyle={{
                    paddingHorizontal: SPACING
                }}
                data={images}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                scrollActiveIndex(index)
                            }}
                        >
                            <Image
                                source={{uri: item.src.portrait}}
                                style={{
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    borderRadius: 12,
                                    marginRight: SPACING,
                                    borderWidth: 2,
                                    borderColor: activeIndex === index ? 'white' : 'transparent'
                                }}
                            />
                        </TouchableOpacity>
                    )
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
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
        backgroundColor: '#3a9fbf',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    fillScreen: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    }
});
