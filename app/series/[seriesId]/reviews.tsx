import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ReviewsDisplay from '@/components/reviews/ReviewsDisplay'; 
import OptionsTab from '@/components/OptionsTab';

const reviews = [
  {
    id: 1,
    image: 'https://via.placeholder.com/90x130',
    title: 'Mr. Robot',
    year: 2023,
    review: 'Amazing series, really enjoyed the plot twists and the characters were well developed.',
    likes: 24,
    comments: 5,
    username: 'john_doe',
    avatarUri: 'https://via.placeholder.com/30',
    liked: false,
    rating: 5,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/90x130',
    title: 'Mr. Robot',
    year: 2022,
    review: 'The pacing was a bit slow at times, but overall a good mystery thriller.',
    likes: 12,
    comments: 3,
    username: 'jane_smith',
    avatarUri: 'https://via.placeholder.com/30',
    liked: true,
    rating: 4,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/90x130',
    title: 'Mr. Robot',
    year: 2021,
    review: 'Not my cup of tea. Found it a bit too cliche, but fans of the genre may enjoy it.',
    likes: 5,
    comments: 1,
    username: 'alice_jones',
    avatarUri: 'https://via.placeholder.com/30',
    liked: false,
    rating: 3,
  },
];

export default function SeriesReviewsScreen() {
  const router = useRouter();
  const { seriesId } = useLocalSearchParams<{ seriesId: string }>();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <OptionsTab type="back" onBackPress={() => router.back()}></OptionsTab>
      <Text style={styles.heading}>Series Reviews</Text>
      
      <ScrollView contentContainerStyle={styles.reviewsList}>
        <ReviewsDisplay reviews={reviews} type="all" seriesId={seriesId}/>
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
  },
  heading: {
    fontSize: 24,
    fontFamily: 'DMSerifText',
    lineHeight: 45,
    marginBottom: 16,
  },
  reviewsList: {
    marginBottom: 20,
  },
});
