import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import SeriesHeader from '@/components/series/SeriesHeader';
import SeriesDetails from '@/components/series/SeriesDetails';
import SeriesBio from '@/components/series/SeriesBio';
import SeriesCast from '@/components/series/SeriesCast';
import SeriesSeasons from '@/components/series/SeriesSeasons';
import SeriesReviews from '@/components/series/SeriesReviews';
import SeriesAlert from '@/components/series/SeriesAlert';
import LogButton from '@/components/shows/LogButton';

export default function SeriesScreen() {
    const { seriesId } = useLocalSearchParams<{ seriesId: string }>();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [series] = useState({
        id: seriesId,
        title: 'Mr. Robot',
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/211/528026.jpg',
        year: '2015-2019',
        bio: 'Mr. Robot follows Elliot, a young programmer who works as a cyber-security engineer by day and as a vigilante hacker by night. Elliot finds himself at a crossroads when the mysterious leader of an underground hacker group recruits him to destroy the firm he is paid to protect. Compelled by his personal beliefs, Elliot struggles to resist the chance to take down the multinational CEOs he believes are running (and ruining) the world.',
        seasons: 4,
        creator: 'Sam Esmail',
        rating: 4.5,
        genres: ['Drama', 'Crime', 'Thriller'],
        release: '13th December, 2024',
        cast: [
            { name: 'Rami Malek', role: 'Elliot Alderson', image: 'https://via.placeholder.com/100' },
            { name: 'Christian Slater', role: 'Mr. Robot', image: 'https://via.placeholder.com/100' },
        ],
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
            case 'header':
                return <SeriesHeader image={series.image} />;
            case 'details':
                return <SeriesDetails title={series.title} year={series.year} creator={series.creator} genres={series.genres} />;
            case 'bio':
                return <SeriesBio bio={series.bio} />;
            case 'alert':
                return <SeriesAlert release={series.release}></SeriesAlert>
            case 'logButton':
                return <LogButton onModalToggle={handleModalState} navigation={undefined} />;
            case 'cast':
                return <SeriesCast cast={series.cast} />;
            case 'seasons':
                return <SeriesSeasons seasons={series.seasons} seriesId={series.id} />;
            case 'reviews':
                return <SeriesReviews reviews={series.reviews} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={[styles.optionsTabContainer]}>
                <OptionsTab type="back" onBackPress={() => router.push('/search')} />
            </View>
            <FlatList
                data={['header', 'details', 'bio', 'alert', 'logButton' , 'cast', 'seasons', 'reviews']}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingTop: 42,
    },
    optionsTabContainer: {
        paddingHorizontal: 16,
    },
    flatListContent: {
        paddingHorizontal: 16,
        paddingBottom: 60, 
    },
});
