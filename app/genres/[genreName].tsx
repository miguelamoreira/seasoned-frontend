import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import CoverDisplay from '@/components/shows/Cover';

type Cover = {
    image: string;
    genre: string;
};

export default function GenreScreen() {
    const { genreName } = useLocalSearchParams<{ genreName: string }>();
    const router = useRouter();

    const [covers, setCovers] = useState<Cover[]>([]);

    useEffect(() => {
        const allCovers: Cover[] = [
            { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371270.jpg', genre: 'Drama' },
            { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/249/623354.jpg', genre: 'Comedy' },
            { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/192/482341.jpg', genre: 'Action' },
            { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/453/1134275.jpg', genre: 'Drama' },
            { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/4/11308.jpg', genre: 'Comedy' },
        ];

        const filteredCovers = allCovers.filter((cover) => cover.genre === genreName);
        setCovers(filteredCovers);
    }, [genreName]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <OptionsTab type="back" onBackPress={() => router.push('/search')} />
                <Text style={styles.heading}>{genreName}</Text>
                {covers.length > 0 ? (
                    <CoverDisplay covers={covers} />
                ) : (
                    <Text style={styles.noResults}>No shows available for this genre.</Text>
                )}
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
    noResults: {
        fontSize: 18,
        fontFamily: 'Arimo',
        color: '#211B1750',
        textAlign: 'center',
        marginTop: 20,
    },
});
