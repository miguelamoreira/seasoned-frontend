import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabBarProps = {
    isLoggedIn: boolean;
    currentPage: string;
    onNavigate: (page: string, userId?: number) => void;
    userId?: number;
};

export default function TabBar(props: TabBarProps) {
    const { isLoggedIn, currentPage, onNavigate, userId } = props;
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const tabs = isLoggedIn
        ? [
              { name: 'Home', icon: 'home' },
              { name: 'Search', icon: 'search' },
              { name: 'Notifications', icon: 'notifications' },
              { name: 'Profile', icon: 'person' },
          ]
        : [
              { name: 'Home', icon: 'home' },
              { name: 'Search', icon: 'search' },
              { name: 'Profile', icon: 'person' },
          ];

    return (
        <KeyboardAvoidingView
            style={[ styles.container, { zIndex: keyboardVisible ? -1 : 0 } ]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0} 
        >
            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.name}
                        style={styles.tab}
                        onPress={() => {
                            if (tab.name === 'Profile' && userId) {
                                onNavigate(tab.name, userId); 
                            } else {
                                onNavigate(tab.name);
                            }
                        }}
                    >
                        <Ionicons
                            name={tab.icon}
                            size={28}
                            color={currentPage === tab.name ? '#82AA59' : '#6A4A36'}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#F5E0CE',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
    },
    tab: {
        alignItems: 'center',
    },
});
