import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

import CoverDisplay from '@/components/shows/Cover';
import OptionsTab from '@/components/OptionsTab';

export default function ShowsScreen() {
    const router = useRouter();
    const { actorId } = useLocalSearchParams<{ actorId: string }>();

    const [actor, setActor] = useState({
            id: actorId,
            name: 'Ben Lawson',
            dateOfBirth: '06-02-1980',
            bio: 'Ben Lawson is an Australian actor known for participating in Firefly Lane.',
            image: 'https://static.tvmaze.com/uploads/images/medium_portrait/8/20174.jpg', 
            shows: [
                { id: 1, title: 'Firefly Lane', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/458/1147479.jpg' },
                { id: 2, title: 'Neighbours', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/471/1178200.jpg' },
                { id: 3, title: 'Deep End', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/7/18416.jpg' },
                { id: 4, title: 'Designated Survivor', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/194/486246.jpg' },
            ],
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <OptionsTab type="back" onBackPress={() => router.push(`/actors/${actorId}`)} />
                <Text style={styles.heading}>Appears in</Text>
                <CoverDisplay
                    covers={actor.shows.map((show) => ({ image: show.image }))}
                    type="default" 
                    onCoverPress={(cover) => console.log('Selected cover:', cover)}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingTop: 42,
        paddingHorizontal: 16,
        fontFamily: 'Arimo',
    },
    contentContainer: {
        flex: 1,
        marginBottom: 60,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
        marginBottom: 16,
    },
});
