import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router'; 

import ReviewsDisplay from '@/components/reviews/ReviewsDisplay';
import RatingsDisplay from '@/components/shows/RatingsDisplay';

type ReviewsContainerProps = {
    reviews: any[];
    type: 'episode' | 'series';  
    seriesId: string;  
    seasonNumber?: string;  
    episodeNumber?: string;  
};

export default function ReviewsContainer({ reviews, type, seriesId, seasonNumber, episodeNumber }: ReviewsContainerProps) {
    const ratingsHistogram = [2, 5, 8, 12, 20, 10];
    const totalRatings = ratingsHistogram.reduce((sum, count) => sum + count, 0);
    const weightedSum = ratingsHistogram.reduce((sum, count, index) => sum + count * index, 0);
    const averageRating = (weightedSum / totalRatings).toFixed(1);
    const router = useRouter(); 

    const handleSeeAll = (section: string) => {
        if (type === 'episode') {
            router.push(`/series/${seriesId}/seasons/${seasonNumber}/${episodeNumber}/reviews`);
        } else {
            router.push(`/series/${seriesId}/reviews`);
        }
    };

    return (
        <View style={styles.reviewsContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.heading}>Reviews</Text>
                <TouchableOpacity onPress={() => handleSeeAll('Reviews')} style={styles.seeAllContainer}>
                    <Text style={styles.seeAllText}>See all</Text>
                    <Icon name="chevron-forward" size={16} color="#211B17" />
                </TouchableOpacity>
            </View>
            <View style={styles.ratingsWrapper}>
                <RatingsDisplay ratings={ratingsHistogram} average={parseFloat(averageRating)} />
            </View>
            <ReviewsDisplay reviews={reviews} type="all" />
        </View>
    );
}

const styles = StyleSheet.create({
    reviewsContainer: { 
        marginBottom: 24 
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    seeAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    seeAllText: {
        fontSize: 14,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
    },
    ratingsWrapper: {
        marginVertical: 8,
        marginBottom: -16, 
    },
});
