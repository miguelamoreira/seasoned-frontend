import React, { useState } from 'react';
import { Image, StyleSheet, SafeAreaView, View, Text, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { Shadow } from 'react-native-shadow-2';

import TabBar from '@/components/Tabbar';

type CardProps = {
    imageUri: string;
    title: string;
    subtitle: string;
    date: string;
};

function Card({ imageUri, title, subtitle, date }: CardProps) {
    return (
        <Shadow distance={6} startColor={'#211B17'} offset={[2, 4]}>
            <View style={styles.card}>
                <Image source={{ uri: imageUri }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardSubtitle}>{subtitle}</Text>
                    <Text style={styles.cardDate}>{date}</Text>
                </View>
            </View>
        </Shadow>
    );
}

export default function HomepageScreen() {
    const [currentPage, setCurrentPage] = useState('Home');
    const isLoggedIn = false;

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
        console.log(`Navigated to: ${page}`);
    };
    
    const shows: CardProps[] = [
        {
            imageUri: 'https://via.placeholder.com/130x180',
            title: 'YOU',
            subtitle: 'Season 3',
            date: '12th December, 2024',
        },
        {
            imageUri: 'https://via.placeholder.com/130x180',
            title: 'Breaking Bad',
            subtitle: 'Season 4',
            date: '15th December, 2024',
        },
        {
            imageUri: 'https://via.placeholder.com/130x180',
            title: 'Better Call Saul',
            subtitle: 'Season X',
            date: '20th December, 2024',
        },
    ];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.frankieContainer}>
                    <View style={styles.frankieContent}>
                        <Text style={styles.frankieHeading}>
                            "The only drama I need is on screen"
                        </Text>
                        <Text style={styles.frankieText}>
                            With <Text style={{ fontWeight: '700' }}>Seasoned</Text>, keep the drama where it belongs - on your favourite shows!
                        </Text>
                    </View>
                    <Image source={require('../assets/images/frankie_1.png')} style={styles.frankieImage} />
                </View>

                <View style={styles.comingContainer}>
                    <Text style={styles.heading}>Coming this week</Text>
                    <Swiper style={styles.swiper} showsPagination={false} autoplay={true} autoplayTimeout={4}>
                        {shows.map((show, index) => (
                            <View key={index} style={styles.cardWrapper}>
                                <Card imageUri={show.imageUri} title={show.title} subtitle={show.subtitle} date={show.date}/>
                            </View>
                        ))}
                    </Swiper>
                </View>
            </ScrollView>

            <TabBar
                isLoggedIn={isLoggedIn}
                currentPage={currentPage}
                onNavigate={handleNavigate}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingVertical: 42,
        color: '#211B17',
        fontFamily: 'Arimo'
    },
    frankieContainer: {
        flexDirection: 'row',
    },
    frankieContent: {
        flexDirection: 'column',
        width: '62%',
    },
    frankieHeading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        width: 250,
    },
    frankieText: {
        fontSize: 16,
        top: 12,
    },
    frankieImage: {
        width: 130,
        height: 120,
        marginVertical: 20,
        marginHorizontal: 16,
    },
    comingContainer: {
        marginTop: 20,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
    },
    swiper: {
        height: 160,
        marginTop: 10,
    },
    cardWrapper: {
        marginHorizontal: 8,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C1855F',
        borderColor: '#211B17',
        borderWidth: 2,
        borderRadius: 8,
        padding: 16,
        width: 360,
    },
    cardImage: {
        width: 80,
        height: 110,
        borderRadius: 8,
    },
    cardContent: {
        marginLeft: 10,
    },
    cardTitle: {
        fontSize: 20,
        color: '#FFF4E0',
        fontFamily: 'DMSerifText',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#FFF4E080',
    },
    cardDate: {
        fontSize: 12,
        color: '#FFF4E0',
        top: 20,
    },
});
