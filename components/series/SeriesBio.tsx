import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SeriesBio({ bio }: { bio: string }) {
    return (
        <View style={styles.bioContainer}>
            <Text style={styles.actorBio}>{bio}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bioContainer: { 
        marginBottom: 16
    },
    actorBio: { 
        fontSize: 14, 
        color: '#211B17' 
    },
});
