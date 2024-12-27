import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SearchSuggestionProps {
    filteredSearches: Array<
        | { id: number; name: string; dateOfBirth: string; country: string; series: string[]; image: string } // Actors
        | { id: number; image: string; username: string; following: boolean } // Users
        | { id: number; image: string; title: string; year: number; seasons: number; creator: string; rating: number; date: string } // Shows
    >;
    handleSearchSelect: (search: any) => void;
}

export default function SearchSuggestions({ filteredSearches, handleSearchSelect }: SearchSuggestionProps) {
    return (
        <View style={styles.suggestionsContainer}>
            {filteredSearches.map((item, index) => {
                let displayText: string;

                if ('name' in item) {
                    displayText = item.name; 
                } else if ('username' in item) {
                    displayText = item.username;
                } else if ('title' in item) {
                    displayText = item.title;
                } else {
                    displayText = 'Unknown Item';
                }

                return (
                    <TouchableOpacity key={index} onPress={() => handleSearchSelect(item)}>
                        <Text style={styles.suggestionText}>{displayText}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    suggestionsContainer: {
        padding: 10,
    },
    suggestionText: {
        fontSize: 16,
        marginVertical: 5,
    },
});
