import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useAuth } from '../../../context/authContext'; // Ensure the path is correct

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (typeof isAuthenticated === 'undefined') return;
        const inUpload = segments[0] === '(tabs)' && segments[1] === 'upload';
        if (isAuthenticated && !inUpload) {
            router.replace('/(tabs)/upload');
        } else if (isAuthenticated === false) {
            router.replace('/signIn');
        }
    }, [isAuthenticated]);

    return <Slot />;
};

export default MainLayout;
