import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import SearchBar from '@/components/search/SearchBar';
import SearchSuggestions from '@/components/search/SearchSuggestions';
import GenresDisplay from '@/components/shows/GenreDisplay';
import FilterTabs from '@/components/FilterTabs';

import ActorsDisplay from '@/components/actors/ActorsDisplay';
import UsersDisplay from '@/components/users/UsersDisplay';
import ShowsDisplay from '@/components/shows/ShowsDisplay';

export default function SearchScreen() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>(['Actor A', 'User B', 'Series C', 'User X']);
    const [filteredSearches, setFilteredSearches] = useState<string[]>(recentSearches);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');

    const genres = [
        { name: 'Comedy', onPress: () => router.push(`/genres/${'Comedy'}`) },
        { name: 'Drama', onPress: () => router.push(`/genres/${'Drama'}`) },
        { name: 'Science-Fiction', onPress: () => router.push(`/genres/${'Science-Fiction'}`) },
        { name: 'Thriller', onPress: () => router.push(`/genres/${'Thriller'}`) },
        { name: 'Action', onPress: () => router.push(`/genres/${'Action'}`) },
        { name: 'Crime', onPress: () => router.push(`/genres/${'Crime'}`) },
        { name: 'Horror', onPress: () => router.push(`/genres/${'Horror'}`) },
        { name: 'Romance', onPress: () => router.push(`/genres/${'Romance'}`) },
        { name: 'Adventure', onPress: () => router.push(`/genres/${'Adventure'}`) },
        { name: 'Music', onPress: () => router.push(`/genres/${'Music'}`) },
        { name: 'Mystery', onPress: () => router.push(`/genres/${'Mystery'}`) },
        { name: 'Supernatural', onPress: () => router.push(`/genres/${'Supernatural'}`) },
    ];

    const filters = [
        { label: 'All', key: null },
        { label: 'Actors', key: 'actor' },
        { label: 'Series', key: 'series' },
        { label: 'Users', key: 'user' },
    ];

    const handleSearchFocus = () => {
        setIsFocused(true);
    };

    const handleSearchBlur = () => {
        setIsFocused(false);
    };

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    const handleFilterChange = (filter: string | null) => {
        setSelectedFilter(filter);
    };

    useEffect(() => {
        const filtered = recentSearches.filter((search) => {
            const searchTextMatch = search.toLowerCase().includes(searchText.toLowerCase());
            if (selectedFilter) {
                return searchTextMatch && search.toLowerCase().includes(selectedFilter.toLowerCase());
            }
            return searchTextMatch;
        });
        setFilteredSearches(filtered);
    }, [searchText, selectedFilter]);

    const handleSearchSelect = (search: string) => {
        console.log(search);
    };

    // Dummy Data for actors, users, and shows
    const actors = [
        {
            id: 1,
            name: 'Actor One',
            dateOfBirth: '1980-01-01',
            country: 'USA',
            series: ['Show 1', 'Show 2'],
            image: 'https://via.placeholder.com/80x120',
        },
        {
            id: 2,
            name: 'Actor Two',
            dateOfBirth: '1985-01-01',
            country: 'Canada',
            series: ['Show 3', 'Show 4'],
            image: 'https://via.placeholder.com/80x120',
        },
    ];

    const users = [
        { id: 1, image: 'https://via.placeholder.com/80x80', username: 'User1', following: true },
        { id: 2, image: 'https://via.placeholder.com/80x80', username: 'User2', following: false },
        { id: 3, image: 'https://via.placeholder.com/80x80', username: 'User3', following: false },
    ];

    const shows = [
        {
            id: 1,
            image: 'https://via.placeholder.com/80x120',
            title: 'Show One',
            year: 2022,
            seasons: 3,
            creator: 'Creator 1',
            rating: 8.5,
            progress: 50,
            date: '2024-01-01',
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/80x120',
            title: 'Show Two',
            year: 2024,
            seasons: 2,
            creator: 'Creator 2',
            rating: 7.2,
            date: '2024-06-01',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar 
                onFocus={handleSearchFocus} 
                onBlur={handleSearchBlur} 
                onChange={handleSearchChange} 
            />

            {isFocused && (searchText || recentSearches.length > 0) ? (
                <View style={styles.suggestionsContainer}>
                    <FilterTabs tabs={filters} onTabChange={handleFilterChange} allowNoneSelected={true} initialTab={null} />
                    <SearchSuggestions filteredSearches={filteredSearches} handleSearchSelect={handleSearchSelect} />
                    {selectedFilter === 'actor' || selectedFilter === null ? (
                        <ActorsDisplay actors={actors} />
                    ) : selectedFilter === 'user' ? (
                        <UsersDisplay users={users} currentUser={users[0]} type="search" />
                    ) : selectedFilter === 'series' ? (
                        <ShowsDisplay shows={shows} type="default" />
                    ) : null}
                </View>
            ) : (
                <GenresDisplay genres={genres} />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingTop: 110,
        justifyContent: 'flex-start',
    },
    suggestionsContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
    },
});
