import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';

interface OptionsButtonProps {
    option: 'addComment' | 'reviews' | 'watched' | 'watchlist' | 'dropped' | 'likes';
    navigateTo?: string;
}

export default function OptionsButton({ option, navigateTo }: OptionsButtonProps) {
    const router = useRouter();

    const handlePress = () => {
        if (navigateTo) {
            router.push(navigateTo); 
        }
    };

    const renderIconAndText = () => {
        switch (option) {
            case 'addComment':
                return (
                    <>
                        <FontAwesome name="pencil" size={20} color="#FFF4E0" />
                        <Text style={styles.buttonText}>Add comment</Text>
                    </>
                );
            case 'reviews':
                return (
                    <>
                        <FontAwesome name="pencil" size={20} color="#FFF4E0" />
                        <Text style={styles.buttonText}>Reviews</Text>
                    </>
                );
            case 'watched':
                return (
                    <>
                        <AntDesign name="eye" size={20} color="#FFF4E0" />
                        <Text style={styles.buttonText}>Watched</Text>
                    </>
                );
            case 'watchlist':
                return (
                    <>
                        <AntDesign name="clockcircle" size={20} color="#FFF4E0" />
                        <Text style={styles.buttonText}>Watchlist</Text>
                    </>
                );
            case 'dropped':
                return (
                    <>
                        <FontAwesome name="bookmark-o" size={20} color="#FFF4E0" />
                        <Text style={styles.buttonText}>Dropped</Text>
                    </>
                );
            case 'likes':
                return (
                    <>
                        <AntDesign name="heart" size={20} color="#FFF4E0" />
                        <Text style={styles.buttonText}>Likes</Text>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <View>
            <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]} style={{ width: 378 }}>
                <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handlePress}>
                    <View style={styles.actionText}>
                        {renderIconAndText()}
                    </View>
                    <AntDesign name="down" size={24} color="#FFF4E0" />
                </TouchableOpacity>
            </Shadow>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#5E4228',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#211B17',
        width: 378,
    },
    actionText: {
        flexDirection: 'row',
        gap: 8,
    },
    buttonText: {
        color: '#F5E0CE',
        fontSize: 16,
        fontWeight: 'bold',
    },
});