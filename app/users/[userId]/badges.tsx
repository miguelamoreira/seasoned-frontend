import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Progress from 'react-native-progress';

import OptionsTab from '@/components/OptionsTab'; 
import Badge from '@/components/Badge'; 

export default function BadgesScreen() {
    const { userId } = useLocalSearchParams<{ userId: string }>();
    const router = useRouter();

    const badges = [
        {
            id: '1',
            image: 'https://via.placeholder.com/150',
            title: 'Tasting Notes',
            description: "You love a good critique and can't help but add your flavour to the discussion.",
            howTo: 'Interact with 5 reviews',
            date: '30/11/2024',
            progress: null,
            locked: false,
        },
        {
            id: '2',
            image: 'https://via.placeholder.com/150',
            title: 'Fried up',
            description: "You've cooked up a solid collection—no leftovers here, just pure favorites!",
            howTo: 'Mark 10 series as liked',
            date: null,
            progress: 0.5,
            locked: true,
        },
    ];

    const sortedBadges = badges.sort((a, b) => Number(a.locked) - Number(b.locked));

    return (
        <SafeAreaView style={styles.mainContainer}>
            <OptionsTab type="back" onBackPress={() => router.back()} />

            <Text style={styles.heading}>Badges</Text>

            <Progress.Bar
                progress={50 / 100}
                width={378}
                color="#82AA59"
                borderColor="#352A23"
                unfilledColor="#352A23"
                style={{ marginTop: 12, marginBottom: 16 }}
            />

            <FlatList
                data={sortedBadges} 
                keyExtractor={(item) => item.id.toString()} 
                numColumns={2} 
                contentContainerStyle={styles.badgeGrid} 
                renderItem={({ item }) => (
                    <View style={styles.badgeWrapper}>
                        <Badge variant="grid" image={item.image} title={item.title} locked={item.locked} onPress={() => router.push(`/users/${userId}/badges/${item.id}`)}/>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingTop: 42,
        paddingBottom: 60,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
        color: '#352A23',
    },
    badgeGrid: {
        paddingBottom: 16, 
    },
    badgeWrapper: {
        width: '48%', 
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: '1%',
    },
});
