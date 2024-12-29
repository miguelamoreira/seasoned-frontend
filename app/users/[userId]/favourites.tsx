import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import SearchBar from '@/components/search/SearchBar';
import ShowsDisplay, { Show } from '@/components/shows/ShowsDisplay';

export default function AddFavouritesScreen() {
    const { userId } = useLocalSearchParams<{ userId: string }>();
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [searchText, setSearchText] = useState('');

    const mockShows: Show[] = [
        {
            id: 1,
            image: 'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg',
            title: 'Breaking Bad',
            year: 2008,
            seasons: 5,
            creator: 'Vince Gilligan',
            rating: 9.5,
            type: 'series',
        },
        {
            id: 2,
            image: 'https://static.tvmaze.com/uploads/images/medium_portrait/396/991288.jpg',
            title: 'Stranger Things',
            year: 2016,
            seasons: 4,
            creator: 'The Duffer Brothers',
            rating: 8.7,
            type: 'series',
        },
    ];

    const handleSearchFocus = () => setIsFocused(true);
    const handleSearchBlur = () => setIsFocused(false);
    const handleSearchChange = (text: string) => setSearchText(text);

    const filteredShows = mockShows.filter((show) =>
        show.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <OptionsTab type="cross-check" onCheckPress={() => router.back()} onCrossPress={() => router.back()}/>

            <Text style={styles.heading}>Add favourite</Text>

            <View style={styles.searchContainer}>
                <SearchBar onFocus={handleSearchFocus} onBlur={handleSearchBlur} onChange={handleSearchChange}/>
            </View>

            <ShowsDisplay shows={filteredShows} type="add" />
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
    searchContainer: {
        marginBottom: 16,
    }
});
