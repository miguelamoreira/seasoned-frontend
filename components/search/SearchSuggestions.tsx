import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import EmptyState from '@/components/EmptyState';

type SearchSuggestionsProps = {
    filteredSearches: string[];
    handleSearchSelect: (search: string) => void;
};

export default function SearchSuggestions({ filteredSearches, handleSearchSelect }: SearchSuggestionsProps) {
    return (
        <View style={styles.suggestionsContainer}>
            <Text style={styles.sectionTitle}>Recent searches</Text>
            {filteredSearches.length === 0 ? (
                <EmptyState type="recentSearches" />
            ) : (
                <FlatList
                    data={filteredSearches}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.recentSearchItem} onPress={() => handleSearchSelect(item)}>
                            <Text style={styles.recentSearchText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    suggestionsContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'DMSerifText',
        marginTop: 8,
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