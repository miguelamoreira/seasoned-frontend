import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import EpisodeDetails from '@/components/logReviews/EpisodeDetails';
import RatingReviewContainer from '@/components/logReviews/RatingReviewContainer';

export default function EpisodeLogScreen() {
    const router = useRouter();
    const { seriesId, seasonNumber, episodeNumber } = useLocalSearchParams<{ seriesId: string; seasonNumber: string; episodeNumber: string }>();
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>(''); 

    const episodeData = {
        title: "Hello Friend",
        season: 1,
        episode: 1,
        series: "Mr. Robot",
        image: "https://static.tvmaze.com/uploads/images/large_landscape/106/266370.jpg"
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <OptionsTab type="cross-check" onCrossPress={() => router.back()} onCheckPress={() => router.back()}/>

            <Text style={styles.heading}>Log / Review</Text>

            <ScrollView style={styles.content}>
                <EpisodeDetails image={episodeData.image} title={episodeData.title} season={episodeData.season} episode={episodeData.episode} series={episodeData.series} ></EpisodeDetails>

                <RatingReviewContainer
                    rating={rating}
                    review={review}
                    onRatingChange={setRating} 
                    onReviewChange={setReview}
                />
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
