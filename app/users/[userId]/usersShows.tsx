import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';

import ShowsDisplay, { Show } from '@/components/shows/ShowsDisplay';
import CoverDisplay from '@/components/shows/Cover';
import OptionsTab from '@/components/OptionsTab';
import EmptyState from '@/components/EmptyState';
import Menu from '@/components/users/Menu';

const TABS = [
    { label: 'Following', icon: 'bookmark', library: 'FontAwesome' },
    { label: 'Watched', icon: 'eye', library: 'AntDesign' },
    { label: 'Watchlist', icon: 'clockcircle', library: 'AntDesign' },
    { label: 'Dropped', icon: 'bookmark-o', library: 'FontAwesome' },
];

const WATCHLIST_FILTERS = ['Released', 'Unreleased'] as const;
type WatchlistFilterType = (typeof WATCHLIST_FILTERS)[number];

const showsData: Record<string, Show[] | Record<WatchlistFilterType, Show[]>> = {
    Following: [
        {
            id: 1,
            title: 'You',
            image: 'https://example.com/image-you.jpg',
            year: 2018,
            seasons: 4,
            progress: 50,
            creator: 'Greg Berlanti',
            rating: 8.2,
            type: 'series',
        },
    ],
    Watched: [
        {
            id: 2,
            title: 'Normal People',
            image: 'https://example.com/image-normalpeople.jpg',
            year: 2020,
            seasons: 1,
            creator: 'Lenny Abrahamson',
            rating: 9.0,
            type: 'series',
        },
        {
            id: 3,
            title: 'Breaking Bad',
            image: 'https://example.com/image-breakingbad.jpg',
            year: 2008,
            seasons: 5,
            creator: 'Vince Gilligan',
            rating: 9.5,
            type: 'series',
        },
    ],
    Watchlist: {
        Released: [
            {
                id: 7,
                title: 'My Brilliant Friend',
                image: 'https://example.com/image-mybrilliantfriend.jpg',
                year: 2018,
                seasons: 2,
                creator: 'Saverio Costanzo',
                type: 'series',
            },
        ],
        Unreleased: [
            {
                id: 10,
                title: 'Yellow Jackets',
                image: 'https://example.com/image-yellowjackets.jpg',
                year: 2025,
                seasons: 1,
                date: '14 February, 2025',
                type: 'series',
            },
        ],
    },
    Dropped: [
        {
            id: 4,
            title: 'The Walking Dead',
            image: 'https://example.com/image-walkingdead.jpg',
            year: 2010,
            seasons: 11,
            creator: 'Frank Darabont',
            rating: 8.1,
            type: 'series',
            progress: 25,
        },
    ],
};

export default function ShowsScreen() {
    const { userId } = useLocalSearchParams<{ userId: string }>();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<string>('Following');
    const [watchlistFilter, setWatchlistFilter] = useState<WatchlistFilterType>('Released');

    const handleTabPress = (label: string) => setActiveTab(label);
    const handleFilterPress = (filter: WatchlistFilterType) => setWatchlistFilter(filter);

    const renderShows = () => {
        if (activeTab === 'Watchlist') {
            const filteredShows = (showsData.Watchlist as Record<WatchlistFilterType, Show[]>)[watchlistFilter];
            if (filteredShows.length === 0) {
                return <EmptyState type="emptyWatchlist" />;
            }

            if (watchlistFilter === 'Released') {
                const covers = filteredShows.map((show) => ({
                    image: show.image,
                    liked: false,
                }));
                return <CoverDisplay covers={covers} type="default" />;
            }
            return <ShowsDisplay shows={filteredShows} type="unreleased" />;
        }

        if (activeTab === 'Watched') {
            const watchedShows = showsData.Watched as Show[];
            if (watchedShows.length === 0) {
                return <EmptyState type="myActivity" />;
            }

            const covers = watchedShows.map((show) => ({
                image: show.image,
                rating: show.rating,
            }));
            return <CoverDisplay covers={covers} type="rating" />;
        }

        if (activeTab === 'Dropped') {
            const droppedShows = showsData.Dropped as Show[];
            if (droppedShows.length === 0) {
                return <EmptyState type="noDrops" />;
            }

            return <ShowsDisplay shows={droppedShows} type="progress" />;
        }

        const shows = showsData[activeTab] as Show[];
        if (shows.length === 0) {
            return <EmptyState type="noFollowingShows" />;
        }

        const showType = activeTab === 'Following' ? 'progress' : 'default';
        return <ShowsDisplay shows={shows} type={showType} />;
    };

    const renderFilters = () => (
        <View style={styles.filtersContainer}>
            {WATCHLIST_FILTERS.map((filter) => (
                watchlistFilter === filter ? (
                    <Shadow key={filter} distance={1} startColor={'#211B17'} offset={[1, 2]}>
                        <Text style={[styles.filterText, styles.activeFilterText]} onPress={() => handleFilterPress(filter)}>{filter}</Text>
                    </Shadow>
                ) : (
                    <Text key={filter} style={styles.filterText}onPress={() => handleFilterPress(filter)}>{filter}</Text>
                )
            ))}
        </View>
    );    

    return (
        <SafeAreaView style={styles.container}>
            <OptionsTab type="back" onBackPress={() => router.back()} />
            <Menu tabs={TABS} activeTab={activeTab} onTabPress={handleTabPress} />
            
            {activeTab === 'Watchlist' && renderFilters()}

            <View style={styles.showsContainer}>
                {renderShows()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingTop: 42,
        paddingBottom: 60,
    },
    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12,
        marginVertical: 16,
    },
    filterText: {
        fontSize: 14,
        color: '#352A23',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 2,
        borderColor: '#D8A84E',
        borderRadius: 16,
    },
    activeFilterText: {
        fontWeight: 'bold',
        color: '#352A23',
        backgroundColor: '#D8A84E',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 2,
        borderColor: '#211B17',
        borderRadius: 16,
    },
    showsContainer: {
        marginTop: 16,
    }
});