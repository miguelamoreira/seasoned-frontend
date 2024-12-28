import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Shadow } from 'react-native-shadow-2';

interface EpisodeSelectorProps {
    seasonsData: { season: number; episodes: number }[]; 
    selectedSeason: number | null;
    onSeasonToggle: (season: number | null) => void;
    selectedEpisodes: { [key: string]: boolean };
    onEpisodeToggle: (season: number, episode: number) => void;
}

export default function EpisodeSelector({ seasonsData, selectedSeason, onSeasonToggle, selectedEpisodes, onEpisodeToggle }: EpisodeSelectorProps) {

    return (
        <View style={styles.container}>
            {seasonsData.map((seasonData) => (
                <View key={seasonData.season}>
                    <TouchableOpacity style={styles.seasonToggle} onPress={() => onSeasonToggle(selectedSeason === seasonData.season ? null : seasonData.season)}>
                        <Text style={styles.seasonTitle}>Season {seasonData.season}</Text>
                        <AntDesign name={selectedSeason === seasonData.season ? 'up' : 'down'} size={16} color="#211B17"/>
                    </TouchableOpacity>

                    {selectedSeason === seasonData.season && (
                        <View style={styles.episodesContainer}>
                            {Array.from({ length: seasonData.episodes }, (_, index) => (
                                <Shadow distance={1} startColor={'#211B17'} offset={[6, 6]}>
                                    <TouchableOpacity key={`${seasonData.season}-${index + 1}`} style={[ styles.episodeButton, selectedEpisodes[`${seasonData.season}-${index + 1}`] && styles.selectedEpisode ]}
                                        onPress={() => onEpisodeToggle(seasonData.season, index + 1)}
                                        activeOpacity={0.9}
                                    >
                                        <Text style={[ styles.episodeText, selectedEpisodes[`${seasonData.season}-${index + 1}`] && styles.selectedEpisodeText ]}>
                                            {index + 1}
                                        </Text>
                                    </TouchableOpacity>
                                </Shadow>
                            ))}
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        fontFamily: 'Arimo',
        color: '#211B17',
    },
    seasonToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        marginBottom: 8,
        backgroundColor: '#FFF4E0',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    seasonTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    episodesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        marginLeft: 4,
        gap: 8,
    },
    episodeButton: {
        width: 60,
        height: 40,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#211B17',
        backgroundColor: '#6A4A36',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },
    selectedEpisode: {
        backgroundColor: '#D8A84E',
    },
    episodeText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#D8A84E'
    },
    selectedEpisodeText: {
        color: '#6A4A36',
    },
});
