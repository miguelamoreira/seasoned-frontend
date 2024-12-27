import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EpisodesDetails({ title, producer, bio }: { title: string; producer: string; bio: string; }) {
    return (
        <View>
            <View style={styles.episodesDetails}>
                <Text style={styles.episodesTitle}>{title}</Text>
            </View>
            <Text style={styles.producer}>Produced by <Text style={{ fontWeight: '700', color: '#211B17' }}>{producer}</Text></Text>
            <View style={styles.bioContainer}>
                <Text style={styles.episodesBio}>{bio}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    episodesDetails: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    episodesTitle: { 
        fontSize: 24, 
        fontFamily: 'DMSerifText',
        color: '#211B17', 
        marginRight: 4 
    },
    producer: { 
        fontSize: 14, 
        marginBottom: 12, 
        color: '#211B1770'
    },
    bioContainer: { 
        marginBottom: 16
    },
    episodesBio: { 
        fontSize: 14, 
        color: '#211B17' 
    },
});
