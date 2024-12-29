import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import FilterTabs from '@/components/FilterTabs';
import NotificationCard from '@/components/NotificationCard'; 

export default function NotificationsScreen() {
    const { userId } = useLocalSearchParams<{ userId: string }>();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<string | null>('series');

    const notificationsData = {
        series: {
            today: [
              {
                type: 'series' as any,
                variant: 'new_episode' as any,
                data: {
                    seriesId: 1,
                    seriesTitle: 'You',
                    episodes: [
                        {
                        id: 1,
                        image: 'https://static.tvmaze.com/uploads/images/large_landscape/366/916878.jpg',
                        title: 'And They Lived Happily Ever After',
                        year: 2021,
                        season: 3,
                        episode: 1,
                        date: '1st December, 2024',
                    },
                  ],
                },
                read: false,
              },
            ],
            thisWeek: [
              {
                type: 'series' as any,
                variant: 'series_premiere' as any,
                data: {
                    seriesId: 2,
                    seriesTitle: 'Firefly Lane',
                    episodes: [
                    {
                      id: 2,
                      image: 'https://static.tvmaze.com/uploads/images/large_landscape/434/1085555.jpg',
                      title: 'Wish You Were Here',
                      year: 2022,
                      season: 2,
                      episode: 1,
                      date: '27th November, 2024',
                    },
                  ],
                },
                read: true,
              },
            ],
        },
        social: {
            today: [
                {
                    type: 'social' as any,
                    variant: 'liked_review' as any,
                    data: {
                        user: 'John Doe',
                        avatar: 'https://via.placeholder.com/50',
                        reviews: [
                            {
                                id: 1,
                                image: 'https://static.tvmaze.com/uploads/images/large_landscape/434/1085555.jpg',
                                title: 'Firefly Lane',
                                year: 2022,
                                review: 'Blablabla',
                                rating: 4,
                            }
                        ]
                    },
                    read: false,
                },
            ],
            thisWeek: [
                {
                    type: 'social' as any,
                    variant: 'follow' as any,
                    data: {
                        user: 'william32',
                        avatar: 'https://via.placeholder.com/50',
                    },
                    read: true,
                },
            ],
        },
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.heading}>Notifications</Text>

            <View style={{ paddingHorizontal: 16 }}>
                <FilterTabs
                    tabs={[
                        { label: 'Series', key: 'series' },
                        { label: 'Social', key: 'social' },
                    ]}
                    onTabChange={(key) => setActiveTab(key)}
                    initialTab="series"
                />
            </View>

            <ScrollView style={styles.contentContainer}>
                {activeTab === 'series' && (
                    <>
                        <Text style={styles.sectionTitle}>Today</Text>
                        {notificationsData.series.today.map((item, index) => (
                            <NotificationCard key={index} type={item.type} variant={item.variant} data={item.data} read={item.read}/>
                        ))}

                        <Text style={styles.sectionTitle}>This week</Text>
                        {notificationsData.series.thisWeek.map((item, index) => (
                            <NotificationCard key={index} type={item.type} variant={item.variant} data={item.data} read={item.read}/>
                        ))}
                    </>
                )}

                {activeTab === 'social' && (
                    <>
                        <Text style={styles.sectionTitle}>Today</Text>
                        {notificationsData.social.today.map((item, index) => (
                            <NotificationCard key={index} type={item.type} variant={item.variant} data={item.data} read={item.read}/>
                        ))}

                        <Text style={styles.sectionTitle}>This week</Text>
                        {notificationsData.social.thisWeek.map((item, index) => (
                            <NotificationCard key={index} type={item.type} variant={item.variant} data={item.data}read={item.read}/>
                        ))}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
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
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    contentContainer: {
        flex: 1,
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Arimo',
        marginBottom: 12,
        fontWeight: '700',
        color: '#211B17',
        backgroundColor: '#C1855F',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginHorizontal: 16,
    },
});
