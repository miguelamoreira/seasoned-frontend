import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';

import OptionsTab from '@/components/OptionsTab';
import Menu from '@/components/users/Menu';
import EmptyState from '@/components/EmptyState';
import ReviewsDisplay from '@/components/reviews/ReviewsDisplay';
import EpisodesDisplay from '@/components/episodes/EpisodesDisplay';
import CoverDisplay from '@/components/shows/Cover';

const TABS: { label: string; icon: string; library: "FontAwesome" | "AntDesign" }[] = [
    { label: 'Reviews', icon: 'bookmark', library: 'FontAwesome' },
    { label: 'Likes', icon: 'heart', library: 'AntDesign' },
];

const LIKES_SUBTABS = ['Episodes', 'Series', 'Reviews'];

const reviewsData = [
    {
        id: 1,
        title: 'Normal People',
        year: 2020,
        review: "hey!! so I've been doing this really cool thing recently called absolutely falling apart!!",
        rating: 4.5,
        likes: 78,
        comments: 1,
        image: 'https://example.com/normal-people.jpg',
        username: 'user1',
        avatarUri: 'https://example.com/avatar1.jpg',
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
        image: 'https://example.com/fleabag.jpg',
        username: 'user2',
        avatarUri: 'https://example.com/avatar2.jpg',
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
        image: 'https://example.com/episode12.jpg',
        watched: false, 
        year: 2024
    },
    {
        id: 2,
        title: 'Demon 79',
        season: 6,
        episode: 5,
        date: '18th November, 2024',
        image: 'https://example.com/demon79.jpg',
        watched: true,
        year: 2024
    },
];

const seriesData = [
    { id: 1, title: 'Normal People', image: 'https://example.com/normal-people.jpg' },
    { id: 2, title: 'The Crown', image: 'https://example.com/the-crown.jpg' },
    { id: 3, title: 'Black Mirror', image: 'https://example.com/black-mirror.jpg' },
];

export default function UsersActivityScreen() {
    const { userId, activeTab: initialActiveTab } = useLocalSearchParams<{ userId: string; activeTab: string }>();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'Reviews' | 'Likes'>(
        (initialActiveTab as 'Reviews' | 'Likes') || 'Reviews'
    );
    const [activeSubTab, setActiveSubTab] = useState<string>('Episodes');

    const handleTabPress = (tab: string) => {
        console.log('Tab Pressed:', tab); 
        setActiveTab(tab as 'Reviews' | 'Likes');
    };
    const handleSubTabPress = (subTab: string) => setActiveSubTab(subTab);

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
                    <View style={styles.filtersContainer}>
                        {LIKES_SUBTABS.map((subTab) =>
                            activeSubTab === subTab ? (
                                <Shadow key={subTab} distance={1} startColor={'#211B17'} offset={[1, 2]}>
                                    <Text style={[styles.filterText, styles.activeFilterText]} onPress={() => handleSubTabPress(subTab)}>{subTab}</Text>
                                </Shadow>
                            ) : (
                                <Text key={subTab} style={styles.filterText} onPress={() => handleSubTabPress(subTab)}>{subTab}</Text>
                            )
                        )}
                    </View>
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
});