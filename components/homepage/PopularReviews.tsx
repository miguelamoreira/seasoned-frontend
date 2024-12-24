import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Icon from 'react-native-vector-icons/Ionicons';

type Review = {
    imageUri: string;
    title: string;
    year: number;
    review: string;
    likes: number;
    comments: number;
    username: string;
    avatarUri: string;
    liked: boolean;
};

type PopularReviewsProps = {
    reviews: Review[];
};

export default function PopularReviews({ reviews }: PopularReviewsProps) {
    const [popularReviews, setPopularReviews] = useState(reviews);

    const handleSeeAll = (section: string) => {
        console.log(`Navigated to all items in ${section}`);
    };

    const toggleLike = (index: number) => {
        const updatedReviews = [...popularReviews];
        const targetReview = updatedReviews[index];
        targetReview.liked = !targetReview.liked;
        targetReview.likes += targetReview.liked ? 1 : -1;
        setPopularReviews(updatedReviews);
    };

    return (
        <View style={styles.popularContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.heading}>Popular reviews</Text>
                <TouchableOpacity onPress={() => handleSeeAll('Popular Reviews')} style={styles.seeAllContainer}>
                    <Text style={styles.seeAllText}>See all</Text>
                    <Icon name="chevron-forward" size={16} color="#211B17" />
                </TouchableOpacity>
            </View>
            {reviews.map((review, index) => (
                <Shadow key={index} distance={2} startColor={'#211B17'} offset={[3, 4]}>
                    <View style={styles.reviewCard}>
                        <View style={styles.topRow}>
                            <View style={styles.leftSection}>
                                <Image source={{ uri: review.imageUri }} style={styles.reviewImage} />
                            </View>
                            <View style={styles.rightSection}>
                                <View style={styles.reviewSeries}>
                                    <Text style={styles.reviewSeriesTitle}>{review.title}</Text>
                                    <Text style={styles.reviewSeriesYear}>{review.year}</Text>
                                </View>
                                <Text style={styles.reviewText}>{review.review}</Text>
                            </View>
                        </View>
                        <View style={styles.bottomRow}>
                            <View style={styles.userRow}>
                                <Image source={{ uri: review.avatarUri }} style={styles.avatar} />
                                <Text style={styles.username}>{review.username}</Text>
                            </View>
                            <View style={styles.statsRow}>
                                <View style={styles.likeContainer}>
                                    <Text style={styles.reviewStats}>{review.likes}</Text>
                                    <TouchableOpacity onPress={() => toggleLike(index)}>
                                        <Icon
                                            name={review.liked ? 'heart' : 'heart-outline'}
                                            size={18}
                                            color={review.liked ? '#EE6363' : '#211B17'}
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.reviewStats}>{review.comments} 💬</Text>
                            </View>
                        </View>
                    </View>
                </Shadow>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    popularContainer: {
        marginTop: 20,
        color: '#211B17',
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
    reviewCard: {
        backgroundColor: '#F5E0CE',
        borderColor: '#211B17',
        borderWidth: 2,
        borderRadius: 8,
        padding: 12,
        width: 374,
    },
    topRow: {
        flexDirection: 'row',
    },
    leftSection: {
        width: 100,
        alignItems: 'center',
    },
    reviewImage: {
        width: 80,
        height: 110,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#211B17',
    },
    rightSection: {
        flex: 1,
        marginLeft: 16,
    },
    reviewSeries: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    reviewSeriesTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    reviewSeriesYear: {
        fontSize: 14,
        color: '#211B1750',
        marginLeft: 4,
        top: 2,
    },
    reviewText: {
        top: 4,
        fontSize: 14,
        marginBottom: 8,
        color: '#211B1790',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 8,
    },
    username: {
        fontSize: 12,
        color: '#211B17',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    reviewStats: {
        fontSize: 12,
        color: '#211B17',
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 4,
    },
});
