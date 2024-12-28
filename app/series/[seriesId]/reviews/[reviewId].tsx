import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ReviewsDisplay from '@/components/reviews/ReviewsDisplay'; 
import OptionsTab from '@/components/OptionsTab';
import OptionsButton from '@/components/OptionsButton';
import LikedBy from '@/components/reviews/LikedBy';

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

export default function SeriesReviewScreen() {
  const router = useRouter();
  const { seriesId, reviewId } = useLocalSearchParams<{ seriesId: string, reviewId: string }>();

  const review = reviews.find(r => r.id.toString() === reviewId);

  const comments = [
    { username: 'user1', text: 'I totally agree, the plot twists were great!' },
    { username: 'user2', text: 'I thought it was a bit slow at times, but still good.' },
  ];

  const likedUsers = [
    { username: 'user1', avatarUri: 'https://via.placeholder.com/60' },
    { username: 'user2', avatarUri: 'https://via.placeholder.com/60' },
    { username: 'user3', avatarUri: 'https://via.placeholder.com/60' },
    { username: 'user4', avatarUri: 'https://via.placeholder.com/60' },
    { username: 'user5', avatarUri: 'https://via.placeholder.com/60' },
    { username: 'user6', avatarUri: 'https://via.placeholder.com/60' },
    { username: 'user7', avatarUri: 'https://via.placeholder.com/60' },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <OptionsTab type="back" onBackPress={() => router.back()}></OptionsTab>
      
      {review && (
        <>
            <Text style={styles.heading}>Review</Text>
          
            <ReviewsDisplay reviews={[review]} type="all" seriesId={seriesId} />

            <LikedBy likedUsers={likedUsers} ></LikedBy>
          
            <Text style={styles.subHeading}>Comments</Text>
            <OptionsButton option="addComment" navigateTo={`/series/${seriesId}/reviews/${reviewId}/addComment`}></OptionsButton>
            <ReviewsDisplay reviews={comments.map((comment, index) => ({
                id: index + 1,
                username: comment.username,
                review: comment.text,
                liked: false,
                comments: 0,
                likes: 0,
                rating: 0,
                image: 'https://via.placeholder.com/30',
                avatarUri: 'https://via.placeholder.com/30',
                year: 2024,
                title: '',
            }))} type="comment" seriesId={seriesId} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF4E0',
    paddingHorizontal: 16,
    paddingTop: 42,
    color: '#211B17'
  },
  heading: {
    fontSize: 24,
    fontFamily: 'DMSerifText',
    lineHeight: 45,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 20,
    fontFamily: 'DMSerifText',
    lineHeight: 35,
    marginTop: 24,
    marginBottom: 12,
  },
});