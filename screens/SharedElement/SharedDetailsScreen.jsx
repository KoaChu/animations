import React, {useEffect} from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';
import { SharedElement } from 'react-native-shared-element';

import { detailsIcons } from './SharedElementScreen';

import DrawerButton from '../../components/DrawerButton';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_HEIGHT = height * 0.18;
const TOP_HEADER_HEIGHT = height * 0.3;
const DURATION = 400;

const SharedDetailsScreen = ({ navigation, route }) => {

    // useEffect(() => {
    //     console.log(detailsIcons);
    // },[]);

    const { item } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    position: 'absolute',
                    top: 75,
                    left: 25,
                    zIndex: 999,
                }}
            >
                <AntDesign name="arrowleft" size={32} color='black'/>
            </TouchableOpacity>
            <SharedElement id={`item.${item.key}.bg`}>
                <View 
                    style={{
                        ...StyleSheet.absoluteFillObject, 
                        backgroundColor: item.color, 
                        borderRadius: 0,
                        height: TOP_HEADER_HEIGHT + 32,
                    }}
                />
            </SharedElement>
            <SharedElement id={`item.${item.key}.name`}>
                <Text style={styles.name}>{item.name}</Text>
            </SharedElement>
            {/* <Text style={styles.jobTitle}>{item.jobTitle}</Text> */}
            <SharedElement id={`item.${item.key}.image`}>
                <Image source={{ uri: item.image }} style={styles.image}/>
            </SharedElement>
            <SharedElement id="general.bg">
                <View style={styles.bg}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: SPACING, marginBottom: SPACING + 32 }}>
                            {detailsIcons.map((detail, index) => {
                                return (
                                    <Animatable.View 
                                        animation='bounceIn'
                                        delay={DURATION + index * 100}
                                        key={`${detail.icon}-${index}`}
                                        style={{
                                            backgroundColor: detail.color,
                                            height: 64,
                                            width: 64,
                                            borderRadius: 32,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <AntDesign name={detail.icon} size={22} color={'white'} />
                                    </Animatable.View>
                                );
                            })}
                        </View>
                        <Text>{item.key}</Text>
                        <View>
                            {item.categories.map((category, index) => {
                                return (
                                    <Animatable.View 
                                        animation='fadeInUp'
                                        delay={DURATION * 2 + index * 200}
                                        key={category.key} 
                                        style={{ marginVertical: SPACING }}
                                    >
                                        <Text style={styles.title}>{category.title}</Text>
                                        {category.subcats.map((subcat, index) => {
                                            return (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING / 2, marginLeft: SPACING, }}>
                                                    <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: 'gold', marginRight: SPACING }}/>
                                                    <Text style={styles.subTitle}>{subcat}</Text>
                                                </View>
                                            )
                                        })}
                                    </Animatable.View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </SharedElement>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    name: {
        fontWeight: '700',
        fontSize: 20,
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - SPACING * 4,
        left: SPACING,
    },
    jobTitle: {
        fontSize: 11,
        opacity: 0.7,
    },
    image: {
        width: ITEM_HEIGHT * 0.8,
        height: ITEM_HEIGHT * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8 + 10,
        right: SPACING,
    },
    bg: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'white',
        transform: [{ translateY: TOP_HEADER_HEIGHT }],
        borderRadius: 32,
        padding: SPACING,
        paddingTop: 32 + SPACING,
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        marginBottom: SPACING,
    },
    subTitle: {
        fontSize: 14,
        opacity: 0.8
    },
});

SharedDetailsScreen.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    // console.log("TEST -> " + JSON.stringify(item, null, 3));

    return [
        {
            id: `item.${item.key}.bg`,
            animation: 'move',
        },
        {
            id: `item.${item.key}.name`,
            animation: 'move',
        },
        {
            id: `item.${item.key}.image`,
            animation: 'move',
        },
        {
            id: 'general.bg',
            animation: 'move',
        },
    ];
};

export default SharedDetailsScreen;
