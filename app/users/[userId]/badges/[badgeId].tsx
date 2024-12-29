import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import Badge from '@/components/Badge';
import OptionsTab from '@/components/OptionsTab'; 

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

export default function BadgeScreen() {
    const { userId, badgeId } = useLocalSearchParams<{ userId: string; badgeId: string }>();
    const router = useRouter();

    const badge = badges.find((b) => b.id === badgeId);

    if (!badge) {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <OptionsTab type="back" onBackPress={() => router.back()} />
                <Text style={styles.errorText}>Badge not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <OptionsTab type="back" onBackPress={() => router.back()} />

            <Badge
                variant={badge.locked ? 'progress' : 'details'}
                image={badge.image}
                title={badge.title}
                description={badge.description}
                howTo={badge.howTo}
                date={badge.date}
                progress={badge.progress}
                locked={badge.locked}
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
    errorText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 18,
        marginTop: 20,
    },
});
