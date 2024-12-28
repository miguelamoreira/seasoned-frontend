import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import EpisodesHeader from '@/components/episodes/EpisodesHeader';
import EpisodesDetails from '@/components/episodes/EpisodesDetails';
import LogButton from '@/components/shows/LogButton';
import ReviewsContainer from '@/components/shows/ReviewsContainer';
import { FlatList } from 'react-native';

export default function EpisodeScreen() {
    const { seriesId, seasonNumber, episodeNumber } = useLocalSearchParams<{ seriesId: string; seasonNumber: string; episodeNumber: string }>();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [episode] = useState({
        id: seriesId,
        series: 'Mr. Robot',
        title: 'Hello Friend',
        image: 'https://static.tvmaze.com/uploads/images/large_landscape/106/266370.jpg',
        bio: "In MR. ROBOT, Elliot, a cyber-security engineer by day and vigilante hacker by night, is recruited by a mysterious underground group to destroy the firm he's paid to protect. Elliot must decide how far he'll go to expose the forces he believes are running (and ruining) the world.",
        producer: 'Steve Golin',
        rating: 4.5,
        reviews: [
            {
                id: 1,
                image: 'https://via.placeholder.com/100',
                title: 'Mr. Robot',
                year: 2015,
                review: 'An amazing deep dive into cyber-security and society.',
                likes: 23,
                comments: 5,
                username: 'william32',
                avatarUri: 'https://via.placeholder.com/50',
                liked: false,
                rating: 5,
            },
        ],
    });

    const handleModalState = (isOpen: boolean) => {
        setIsModalOpen(isOpen);
    };

    const renderItem = ({ item }: { item: string }) => {
        switch (item) {
            case 'optionsTab':
                return <OptionsTab type='back' onBackPress={() => router.back()}></OptionsTab>
            case 'heading': 
                return <Text style={styles.heading}>Episode {episodeNumber} ({episode.series})</Text>
            case 'header':
                return <EpisodesHeader image={episode.image} ></EpisodesHeader>
            case 'details':
                return <EpisodesDetails title={episode.title} producer={episode.producer} bio={episode.bio} ></EpisodesDetails>
            case 'logButton':
                return <LogButton onModalToggle={handleModalState} navigation={undefined} type="episode"></LogButton>
            case 'reviews':
                return <ReviewsContainer reviews={episode.reviews} type={'episode'} seriesId={seriesId} seasonNumber={seasonNumber} episodeNumber={episodeNumber}></ReviewsContainer>
            default:
                return null;
            }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <FlatList
                data={[ 'optionsTab', 'heading', 'header', 'details', 'logButton', 'reviews']}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingTop: 42,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
        color: '#211B17',
    },
    flatListContent: {
        paddingHorizontal: 16,
        paddingBottom: 60, 
    },
});
