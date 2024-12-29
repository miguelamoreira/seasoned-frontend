import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ShowsDisplay, { Show } from '@/components/shows/ShowsDisplay';
import CoverDisplay from '@/components/shows/Cover';
import OptionsTab from '@/components/OptionsTab';
import EmptyState from '@/components/EmptyState';
import Menu from '@/components/users/Menu';
import FilterTabs from '@/components/FilterTabs';

const TABS: { label: string; icon: string; library: "FontAwesome" | "AntDesign" }[] = [
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
            image: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371270.jpg',
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
            image: 'https://static.tvmaze.com/uploads/images/medium_portrait/249/623354.jpg',
            year: 2020,
            seasons: 1,
            creator: 'Lenny Abrahamson',
            rating: 9.0,
            type: 'series',
        },
        {
            id: 3,
            title: 'Breaking Bad',
            image: 'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg',
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
                image: 'https://static.tvmaze.com/uploads/images/medium_portrait/540/1350132.jpg',
                year: 2018,
                seasons: 2,
                creator: 'Saverio Costanzo',
                type: 'series',
            },
        ],
        Unreleased: [
            {
                id: 10,
                title: 'Yellowjackets',
                image: 'https://static.tvmaze.com/uploads/images/medium_portrait/449/1124396.jpg',
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
            image: 'https://static.tvmaze.com/uploads/images/medium_portrait/424/1061900.jpg',
            year: 2010,
            seasons: 11,
            creator: 'Frank Darabont',
            rating: 8.1,
            type: 'series',
            progress: 25,
        },
    ],
};

export default function UsersShowsScreen() {
    const { userId, activeTab: initialActiveTab } = useLocalSearchParams<{ userId: string; activeTab: string }>();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'Following' | 'Watched' | 'Watchlist' | 'Dropped'>(
        (initialActiveTab as 'Following' | 'Watched' | 'Watchlist' | 'Dropped') || 'Following'
    );
    const [watchlistFilter, setWatchlistFilter] = useState<WatchlistFilterType>('Released');

    const handleTabPress = (tab: string) => {
        setActiveTab(tab as 'Following' | 'Watched' | 'Watchlist' | 'Dropped');
    };

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

    return (
        <SafeAreaView style={styles.container}>
            <OptionsTab type="back" onBackPress={() => router.back()} />
            <Menu tabs={TABS} activeTab={activeTab} onTabPress={handleTabPress} />

            {activeTab === 'Watchlist' && ( <FilterTabs tabs={WATCHLIST_FILTERS.map((filter) => ({ label: filter, key: filter }))}
                onTabChange={(key) => setWatchlistFilter(key as WatchlistFilterType)}
                initialTab="Released"
                />
            )}

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
    showsContainer: {
        marginTop: 16,
    },
});