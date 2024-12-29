import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import Menu from '@/components/users/Menu';
import EmptyState from '@/components/EmptyState';
import ReviewsDisplay from '@/components/reviews/ReviewsDisplay';
import EpisodesDisplay from '@/components/episodes/EpisodesDisplay';
import CoverDisplay from '@/components/shows/Cover';
import FilterTabs from '@/components/FilterTabs';

const TABS: { label: string; icon: string; library: "FontAwesome" | "AntDesign" }[] = [
    { label: 'Reviews', icon: 'bookmark', library: 'FontAwesome' },
    { label: 'Likes', icon: 'heart', library: 'AntDesign' },
];

const LIKES_SUBTABS = [
    { label: 'Episodes', key: 'Episodes' },
    { label: 'Series', key: 'Series' },
    { label: 'Reviews', key: 'Reviews' },
];

const reviewsData = [
    {
        id: 1,
        title: 'Normal People',
        year: 2020,
        review: "hey!! so I've been doing this really cool thing recently called absolutely falling apart!!",
        rating: 4.5,
        likes: 78,
        comments: 1,
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/249/623354.jpg',
        username: 'user1',
        avatarUri: 'https://via.placeholder.com/50',
        liked: false,
    },
    {
        id: 2,
        title: 'Fleabag',
        year: 2016,
        review: 'phoebe waller bridge.......... ur crazy',
        rating: 5.0,
        likes: 99,
        comments: 0,
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/192/482341.jpg',
        username: 'user2',
        avatarUri: 'https://via.placeholder.com/50',
        liked: true,
    },
];

const episodesData = [
    {
        id: 1,
        title: 'Episode 12',
        season: 1,
        episode: 12,
        date: '29th November, 2024',
        image: 'https://static.tvmaze.com/uploads/images/large_landscape/253/634054.jpg',
        watched: false, 
        year: 2024
    },
    {
        id: 2,
        title: 'Demon 79',
        season: 6,
        episode: 5,
        date: '18th November, 2024',
        image: 'https://static.tvmaze.com/uploads/images/large_landscape/465/1163020.jpg',
        watched: true,
        year: 2024
    },
];

const seriesData = [
    { id: 1, title: 'Normal People', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/249/623354.jpg' },
    { id: 2, title: 'The Crown', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/480/1201097.jpg' },
    { id: 3, title: 'Black Mirror', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/240/601964.jpg' },
];

export default function UsersActivityScreen() {
    const { userId, activeTab: initialActiveTab } = useLocalSearchParams<{ userId: string; activeTab: string }>();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'Reviews' | 'Likes'>(
        (initialActiveTab as 'Reviews' | 'Likes') || 'Reviews'
    );
    const [activeSubTab, setActiveSubTab] = useState<string | null>('Episodes');

    const handleTabPress = (tab: string) => {
        setActiveTab(tab as 'Reviews' | 'Likes');
    };

    const handleSubTabChange = (subTab: string | null) => {
        setActiveSubTab(subTab);
    };

    const renderLikes = () => {
        switch (activeSubTab) {
            case 'Episodes':
                return <EpisodesDisplay episodes={episodesData} type="default" seriesId="123" seasonNumber="1"/>;
            case 'Series':
                return <CoverDisplay covers={seriesData.map((series) => ({ image: series.image }))} type="default" onCoverPress={(cover) => console.log('Cover pressed:', cover)}/>;
            case 'Reviews':
                return <ReviewsDisplay reviews={reviewsData} type="notOwn" />;
            default:
                return <EmptyState type="404" />;
        }
    };

    const renderContent = () => {
        if (activeTab === 'Reviews') {
            if (reviewsData.length === 0) {
                return <EmptyState type="noReviews" />;
            }
            return <ReviewsDisplay reviews={reviewsData} type="own" />;
        }

        if (activeTab === 'Likes') {
            if (episodesData.length === 0 && seriesData.length === 0 && reviewsData.length === 0) {
                return <EmptyState type="noLikes" />;
            }
            
            return (
                <View>
                    <FilterTabs tabs={LIKES_SUBTABS} onTabChange={handleSubTabChange} initialTab="Episodes"/>
                    {renderLikes()}
                </View>
            );
        }
        return <EmptyState type="404" />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <OptionsTab type="back" onBackPress={() => router.back()} />
            <Menu tabs={TABS} activeTab={activeTab} onTabPress={handleTabPress} />
            <View>{renderContent()}</View>
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
});