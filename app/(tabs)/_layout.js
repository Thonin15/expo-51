import { Tabs } from 'expo-router';
import TabButton from '../../components/TabButton';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name='index'
                options={{ href: null }}
            />
            <Tabs.Screen
                name='home'
                options={{
                    tabBarButton: (props) => (
                        <TabButton
                            {...props}
                            iconName={
                                props?.accessibilityState?.selected
                                    ? 'home'
                                    : 'home-outline'
                            }
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='upload'
                options={{
                    tabBarButton: (props) => (
                        <TabButton
                            {...props}
                            iconName={
                                props?.accessibilityState?.selected
                                    ? 'cloud-upload'
                                    : 'cloud-upload-outline'
                            }
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
