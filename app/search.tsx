import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';

import SearchBar from '@/components/search/SearchBar';
import GenresDisplay from '@/components/shows/GenreDisplay';
import FilterTabs from '@/components/FilterTabs';
import ActorsDisplay from '@/components/actors/ActorsDisplay';
import UsersDisplay from '@/components/users/UsersDisplay';
import ShowsDisplay from '@/components/shows/ShowsDisplay';
import EmptyState from '@/components/EmptyState';

import type { Actor } from '@/components/actors/ActorsDisplay';
import type { User } from '@/components/users/UsersDisplay';
import type { Show } from '@/components/shows/ShowsDisplay';

type SearchResult = Actor | User | Show;

type Genre = {
    name: string;
    onPress: () => void;
};

type Filter = {
    label: string;
    key: string | null;
};

export default function SearchScreen() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const actors: Actor[] = [
        { id: 1, name: 'Ben Lawson', dateOfBirth: '1980-02-06', country: 'Australia', series: ['Firefly Lane', 'Neighbours', 'Designated Survivor', 'The Deep End'], image: 'https://static.tvmaze.com/uploads/images/medium_portrait/8/20174.jpg', type: 'actor' },
        { id: 2, name: 'Actor Two', dateOfBirth: '1985-01-01', country: 'Canada', series: ['Show 3', 'Show 4'], image: 'https://via.placeholder.com/80x120', type: 'actor' },
    ];

    const users: User[] = [
        { id: 1, image: 'https://via.placeholder.com/80x80', username: 'User1', following: true, type: 'user' },
        { id: 2, image: 'https://via.placeholder.com/80x80', username: 'User2', following: false, type: 'user' },
        { id: 3, image: 'https://via.placeholder.com/80x80', username: 'User3', following: false, type: 'user' },
    ];

    const shows: Show[] = [
        { id: 1, image: 'https://static.tvmaze.com/uploads/images/medium_portrait/211/528026.jpg', title: 'Mr. Robot', year: 2015, seasons: 4, creator: 'Sam Esmail', rating: 4.5, type: 'series' },
        { id: 2, image: 'https://via.placeholder.com/80x120', title: 'Show Two', year: 2024, seasons: 2, creator: 'Creator 2', rating: 3.2, date: '2024-06-01', type: 'series' },
    ];

    const genres: Genre[] = [
        'Comedy', 'Drama', 'Science-Fiction', 'Thriller', 'Action', 'Crime',
        'Horror', 'Romance', 'Adventure', 'Music', 'Mystery', 'Supernatural',
    ].map((genre) => ({
        name: genre,
        onPress: () => router.push(`/genres/${genre}`),
    }));

    const filters: Filter[] = [
        { label: 'All', key: null },
        { label: 'Actors', key: 'actor' },
        { label: 'Series', key: 'series' },
        { label: 'Users', key: 'user' },
    ];

    const searchResults: SearchResult[] = [...actors, ...users, ...shows];

    const handleSearchFocus = () => setIsFocused(true);
    const handleSearchBlur = () => setIsFocused(false);
    const handleSearchChange = (text: string) => setSearchText(text);
    const handleFilterChange = (filter: string | null) => setSelectedFilter(filter);

    const filteredSearches = searchResults.filter((item) => {
        const matchesSearchText =
            ('name' in item && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
            ('username' in item && item.username.toLowerCase().includes(searchText.toLowerCase())) ||
            ('title' in item && item.title.toLowerCase().includes(searchText.toLowerCase()));
        return selectedFilter ? matchesSearchText && item.type === selectedFilter : matchesSearchText;
    });

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar onFocus={handleSearchFocus} onBlur={handleSearchBlur} onChange={handleSearchChange}/>

            {isFocused ? (
                filteredSearches.length === 0 ? (
                    searchText ? (
                        <EmptyState type="404" />
                    ) : (
                        <EmptyState type="recentSearches" />
                    )
                ) : (
                <View style={styles.suggestionsContainer}>
                    <FilterTabs tabs={filters} onTabChange={handleFilterChange} allowNoneSelected={true} initialTab={null}/>

                    {filteredSearches.length === 0 ? (
                        <EmptyState type="404" />
                    ) : (
                    <FlatList
                        data={filteredSearches}
                        keyExtractor={(item) => `${item.type}-${item.id}`}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.resultContainer}
                                onPress={() => {
                                    console.log(`Clicked item: ${item.type} - ID: ${item.id}`);
                                    switch (item.type) {
                                        case 'actor':
                                            console.log(`/actors/${item.id}`);
                                            router.push(`/actors/${item.id}`);
                                            break;
                                        case 'user':
                                            console.log(`/user/${item.id}`);
                                            break;
                                        case 'series':
                                            console.log(`/series/${item.id}`);
                                            router.push(`/series/${item.id}`);
                                            break;
                                    }
                                }}
                            >
                                {item.type === 'actor' && (
                                    <TouchableWithoutFeedback>
                                        <ActorsDisplay actors={[item]} />
                                    </TouchableWithoutFeedback>
                                )}
                                {item.type === 'user' && (
                                    <TouchableWithoutFeedback>
                                        <UsersDisplay users={[item]} currentUser={users[0]} type="search" />
                                    </TouchableWithoutFeedback>
                                )}
                                {item.type === 'series' && (
                                    <TouchableWithoutFeedback>
                                        <ShowsDisplay shows={[item]} type="default" />
                                    </TouchableWithoutFeedback>
                                )}
                            </TouchableOpacity>
                        )}
                    />)}
                </View>)
            ) : (
                <GenresDisplay genres={genres} />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingTop: 42,
    },
    suggestionsContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
    },
    resultContainer: {
        marginTop: 4,
    },
});