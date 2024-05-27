import React from 'react';
import { Redirect } from 'expo-router';
import { View } from 'react-native';
const RootTab = () => {
    return <Redirect href='/home' />;
};

export default RootTab;