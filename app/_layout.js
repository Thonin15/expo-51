import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContextProvider } from '../context/authContext'; // Ensure this is the correct path

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='(tabs)' />
                    <Stack.Screen name='signIn' />
                </Stack>
            </GestureHandlerRootView>
        </AuthContextProvider>
    );
}
