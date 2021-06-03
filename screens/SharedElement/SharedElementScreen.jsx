// import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
import faker from 'faker';
import niceColors from 'nice-color-palettes';

const colors = [
    ...niceColors[1].slice(1, niceColors[1].length),
    ...niceColors[55].slice(0, 3),
];

const data = [
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3530/3530682.png'
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/3529/3529992.png'
    },
];

export const detailsIcons = [
    { color: '#9fd7f1', icon: 'isv' },
    { color: '#f3b000', icon: 'Trophy' },
    { color: '#f2988f', icon: 'edit' },
];

export default data.map((item, index) => ({
    ...item,
    key: faker.datatype.uuid(),
    color: colors[index % colors.length],
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    categories: [...Array(3).keys()].map(() => {
        return {
            key: faker.datatype.uuid(),
            title: faker.name.jobType(),
            subcats: [...Array(3).keys()].map(faker.name.jobType),
        };
    }),
}));
