import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import QRCode from 'react-native-qrcode-svg'; 

import OptionsTab from '@/components/OptionsTab';

export default function QRCodeScreen() {
    const { userId } = useLocalSearchParams<{ userId: string }>();
    const router = useRouter();

    const baseURL = 'https://example.com'
    const profileLink = `${baseURL}/user/${userId}`;

    return (
        <SafeAreaView style={styles.mainContainer}>
            <OptionsTab type="back" onBackPress={() => router.back()} />
            
            <Text style={styles.heading}>Invite</Text>

            <View style={styles.qrContainer}>
                <QRCode value={profileLink} size={260} color="#211B17" backgroundColor="#D8A84E"/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingTop: 42,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
        marginBottom: 16,
    },
    qrText: {
        fontSize: 18,
        fontFamily: 'Arimo',
        color: '#211B17',
        textAlign: 'center',
        marginBottom: 20,
    },
    qrContainer: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
