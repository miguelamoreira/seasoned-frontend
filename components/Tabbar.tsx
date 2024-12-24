import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabBarProps = {
    isLoggedIn: boolean;
    currentPage: string;
    onNavigate: (page: string) => void;
};

function TabBar(props: TabBarProps) {
    const { isLoggedIn, currentPage, onNavigate } = props;

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
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity key={tab.name} style={styles.tab} onPress={() => onNavigate(tab.name)}>
                    <Ionicons name={tab.icon} size={27}color={currentPage === tab.name ? '#82AA59' : '#6A4A36'} />
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default TabBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5E0CE',
        paddingVertical: 16,
        position: 'absolute', 
        bottom: 0, 
        width: '110%', 
    },
    tab: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 12,
        color: '#333',
        marginTop: 4,
    },
});
