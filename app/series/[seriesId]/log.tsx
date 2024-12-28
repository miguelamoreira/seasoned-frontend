import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import Tabs from '@/components/logReviews/Tabs';
import SeriesDetails from '@/components/logReviews/SeriesDetails';
import RatingReviewContainer from '@/components/logReviews/RatingReviewContainer';
import EpisodeSelector from '@/components/logReviews/EpisodeSelector';

export default function SeriesLogScreen() {
    const router = useRouter();
    const { seriesId } = useLocalSearchParams<{ seriesId: string }>();
    const [isEpisodeView, setIsEpisodeView] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
    const [selectedEpisodes, setSelectedEpisodes] = useState<{ [key: string]: boolean }>({});
    const [data, setData] = useState<{ [key: string]: { rating: number; review: string } }>({});

    const handleRatingChange = (key: string, rating: number) => {
        setData((prevData) => ({
            ...prevData,
            [key]: { ...prevData[key], rating },
        }));
    };

    const handleReviewChange = (key: string, text: string) => {
        setData((prevData) => ({
            ...prevData,
            [key]: { ...prevData[key], review: text },
        }));
    };

    const toggleEpisodeSelection = (season: number, episode: number) => {
        const key = `${season}-${episode}`;
        setSelectedEpisodes((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const [series] = useState({
        id: seriesId,
        title: 'Mr. Robot',
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/211/528026.jpg',
        year: '2015-2019',
        seasons: 4,
        episodesPerSeason: [10, 10, 10, 10]
    });

    const seasonsData = series.episodesPerSeason.map((episodes, index) => ({
        season: index + 1,
        episodes,
    }));

    return (
        <SafeAreaView style={styles.mainContainer}>
            <OptionsTab type="cross-check" onCrossPress={() => router.back()} onCheckPress={() => router.back()}/>

            <Text style={styles.heading}>Log / Review</Text>

            <Tabs isEpisodeView={isEpisodeView} onTabChange={(tab) => setIsEpisodeView(tab === 'Episodes')} />

            <ScrollView style={styles.content}>
                <SeriesDetails title={series.title} year={series.year} image={series.image} />
                {!isEpisodeView && (
                    <RatingReviewContainer
                        key="series"
                        rating={data['series']?.rating || 0}
                        review={data['series']?.review || ''}
                        onRatingChange={(rating) => handleRatingChange('series', rating)}
                        onReviewChange={(text) => handleReviewChange('series', text)}
                    />
                )}

                {isEpisodeView && (
                    <>
                        <EpisodeSelector selectedSeason={selectedSeason} onSeasonToggle={setSelectedSeason} selectedEpisodes={selectedEpisodes} onEpisodeToggle={toggleEpisodeSelection} seasonsData={seasonsData}/>

                        {Object.keys(selectedEpisodes)
                            .filter((key) => selectedEpisodes[key])
                            .map((key) => {
                                const [season, episode] = key.split('-').map(Number);
                                return (
                                    <RatingReviewContainer
                                        key={key}
                                        title={`Season ${season}, Episode ${episode}`}
                                        rating={data[key]?.rating || 0}
                                        review={data[key]?.review || ''}
                                        onRatingChange={(rating) => handleRatingChange(key, rating)}
                                        onReviewChange={(text) => handleReviewChange(key, text)}
                                    />
                                );
                            })}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingTop: 42,
        marginBottom: 60,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
        marginBottom: 8,
    },
    content: {
        flex: 1,
    },
});
