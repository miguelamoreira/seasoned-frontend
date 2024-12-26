import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import GenresDisplay from '@/components/shows/GenreDisplay';
import EmptyState from '@/components/EmptyState';
import FilterTabs from '@/components/FilterTabs'; 

export default function SearchScreen() {
    const router = useRouter();

    const [isFocused, setIsFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]); 
    const [filteredSearches, setFilteredSearches] = useState<string[]>(recentSearches); 
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null); 

    const genres = [
        { name: 'Comedy', onPress: () => router.push(`/genre/${'Comedy'}`) },
        { name: 'Drama', onPress: () => router.push(`/genre/${'Drama'}`) },
        { name: 'Science-Fiction', onPress: () => router.push(`/genre/${'Science-Fiction'}`) },
        { name: 'Thriller', onPress: () => router.push(`/genre/${'Thriller'}`) },
        { name: 'Action', onPress: () => router.push(`/genre/${'Action'}`) },
        { name: 'Crime', onPress: () => router.push(`/genre/${'Crime'}`) },
        { name: 'Horror', onPress: () => router.push(`/genre/${'Horror'}`) },
        { name: 'Romance', onPress: () => router.push(`/genre/${'Romance'}`) },
        { name: 'Adventure', onPress: () => router.push(`/genre/${'Adventure'}`) },
        { name: 'Music', onPress: () => router.push(`/genre/${'Music'}`) },
        { name: 'Mystery', onPress: () => router.push(`/genre/${'Mystery'}`) },
        { name: 'Supernatural', onPress: () => router.push(`/genre/${'Supernatural'}`) },
    ];

    const filters = [
        { label: 'All', key: null },
        { label: 'Actors', key: 'actors' },
        { label: 'Series', key: 'series' },
        { label: 'Users', key: 'users' },
    ];

    const handleSearchFocus = () => {
        setIsFocused(true);
    };

    const handleSearchBlur = () => {
        setIsFocused(false);
    };

    const handleFilterChange = (filter: string | null) => {
        setSelectedFilter(filter);

        if (!filter) {
            setFilteredSearches(recentSearches);
        } else {
            const lowercasedFilter = filter.toLowerCase();
            setFilteredSearches(
                recentSearches.filter((search) =>
                    search.toLowerCase().includes(lowercasedFilter)
                )
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#FFF4E0" style={styles.searchIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="#FFF4E080"
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                        />
                    </View>
                </Shadow>
            </View>

            {isFocused ? (
                <View style={styles.suggestionsContainer}>
                    <FilterTabs
                        tabs={filters}
                        onTabChange={handleFilterChange}
                        allowNoneSelected={true}
                        initialTab={null}
                    />
                    <Text style={styles.sectionTitle}>Recent searches</Text>
                    {filteredSearches.length === 0 ? (
                        <EmptyState type="recentSearches" />
                    ) : (
                        <FlatList
                            data={filteredSearches}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.recentSearchItem}>
                                    <Text style={styles.recentSearchText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
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
        paddingTop: 110,
    },
    searchBarContainer: {
        position: 'absolute',
        top: 42,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#FFF4E0',
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#403127',
        paddingVertical: 10,
        borderRadius: 8,
        height: 48,
        width: 378,
    },
    searchIcon: {
        marginHorizontal: 12,
    },
    input: {
        flex: 1,
        color: '#FFF4E0',
        fontSize: 16,
        height: 48,
        textAlignVertical: 'center',
    },
    suggestionsContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'DMSerifText',
        marginTop: 8,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 20,
    },
    emptyStateImage: {
        width: 150,
        height: 150,
        marginBottom: 16,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#777777',
        textAlign: 'center',
    },
    recentSearchItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    recentSearchText: {
        fontSize: 16,
    },
});
