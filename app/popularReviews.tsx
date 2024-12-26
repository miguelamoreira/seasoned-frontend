import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import PopularReviews from '@/components/homepage/PopularReviews';
import TabBar from '@/components/Tabbar';

export default function PopularReviewsScreen() {
    const [currentPage, setCurrentPage] = useState('Home');
    const isLoggedIn = true;
    const router = useRouter();
    
    const handleNavigate = (page: string) => {
        setCurrentPage(page);
        console.log(`Navigated to: ${page}`);
    };

    const popularReviews = [
        {
            imageUri: 'https://static.tvmaze.com/uploads/images/medium_portrait/4/11308.jpg',
            title: 'Gilmore Girls',
            year: 2000,
            rating: 5,
            review: `If season seven has a million haters, then I am one of them. If season seven has ten haters, then I am one of them. If season seven has only one hater, then that is me.`,
            likes: 2346,
            comments: 60,
            username: 'jane_doe',
            avatarUri: 'https://placehold.jp/30x30.png',
            liked: false,
        },
        {
            imageUri: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371270.jpg',
            title: 'You',
            year: 2018,
            rating: 5,
            review: `Great series. Joe is creepy as hell`,
            likes: 1000,
            comments: 10,
            username: 'kpatrick',
            avatarUri: 'https://placehold.jp/30x30.png',
            liked: false,
        },
    ];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <OptionsTab type="back" onBackPress={() => router.push('/homepage')}></OptionsTab>
                <Text style={styles.heading}>Popular Reviews</Text>
                <PopularReviews reviews={popularReviews} showHeading={false}></PopularReviews>
            </View>
            <TabBar isLoggedIn={isLoggedIn} currentPage={currentPage} onNavigate={handleNavigate}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingTop: 42,
    },
    contentContainer: {
        flex: 1,
        marginBottom: 60,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
    }
})