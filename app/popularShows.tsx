import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import ShowsDisplay from '@/components/shows/ShowsDisplay';
import TabBar from '@/components/Tabbar';

const shows = [
    {
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/249/623354.jpg',
        title: 'Normal People',
        year: 2020,
        seasons: 1,
        creator: 'Lenny Abrahamson',
        rating: 4.2,
    },
    {
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/211/528026.jpg',
        title: 'Mr. Robot',
        year: 2015,
        seasons: 4,
        creator: 'Sam Esmail',
        rating: 3.5,
    },
    {
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/499/1247570.jpg',
        title: 'Gossip Girl',
        year: 2007,
        seasons: 6,
        creator: 'Amy Sherman-Palladino',
        rating: 2.5,
    },
    {
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg',
        title: 'Game of Thrones',
        year: 2011,
        seasons: 8,
        creator: 'David Benioff and D.B. Weiss',
        rating: 5.0,
    },
    {
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253515.jpg',
        title: 'Better Call Saul',
        year: 2015,
        seasons: 6,
        creator: 'Vince Gilligan and Peter Gould',
        rating: 4.5,
    },
];

export default function PopularShowsScreen() {
    const [currentPage, setCurrentPage] = useState('Home');
    const isLoggedIn = true;
    const router = useRouter();

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
        console.log(`Navigated to: ${page}`);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <OptionsTab type="back" onBackPress={() => router.push('/homepage')} />
                <Text style={styles.heading}>Popular shows</Text>
                <ShowsDisplay shows={shows}/>
            </View>
            <TabBar isLoggedIn={isLoggedIn} currentPage={currentPage} onNavigate={handleNavigate}/>
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
    contentContainer: {
        flex: 1,
        marginBottom: 60,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
        marginBottom: 16,
    },
});
