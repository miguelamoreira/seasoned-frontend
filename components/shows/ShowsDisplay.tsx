import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Shadow } from 'react-native-shadow-2';
import * as Progress from 'react-native-progress';

export type Show = {
    id: number,
    image: string;
    title: string;
    year: number;
    seasons: number;
    creator?: string;
    rating?: number;
    date?: string;
    progress?: number;
    type: 'series';
};

type ShowType = 'default' | 'progress' | 'unreleased' | 'add';

type ShowsProps = {
    shows: Show[];
    type: ShowType;
};

export default function ShowsDisplay({ shows, type }: ShowsProps) {
    const renderShow = ({ item }: { item: Show }) => (
        <>
            {type === 'default' && (
                <View style={styles.showContainer}> 
                    <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                        <Image source={{ uri: item.image }} style={styles.showImage} />
                    </Shadow>
                    <View style={styles.showDetails}>
                        <Text style={styles.showTitle}>
                            {item.title} <Text style={styles.showYear}>{item.year}</Text>
                        </Text>
                        <Text style={styles.showSeasons}>
                            {item.seasons > 1 ? `${item.seasons} seasons` : `${item.seasons} season`}
                        </Text>
                        <View style={[styles.bottomRow, { marginTop: 56 }]}>
                            <Text style={styles.showCreator}>Created by <Text style={styles.showCreatorHighlight}>{item.creator}</Text></Text>
                            <View style={styles.ratingContainer}>
                                {item.rating !== undefined && (
                                    <>
                                        <Text style={styles.showRating}>{item.rating.toFixed(1)}</Text>
                                        <AntDesign name="star" size={18} color="#D8A84E" />
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {type === 'progress' && (
                <View style={styles.showContainer}> 
                    <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                        <Image source={{ uri: item.image }} style={styles.showImage} />
                    </Shadow>
                    <View style={styles.showDetails}>
                        <Text style={styles.showTitle}>
                            {item.title} <Text style={styles.showYear}>{item.year}</Text>
                        </Text>
                        <Text style={styles.showSeasons}>
                            {item.seasons > 1 ? `${item.seasons} seasons` : `${item.seasons} season`}
                        </Text>
                        <View style={styles.followingRow}>
                            <Text style={styles.showCreator}>Created by <Text style={styles.showCreatorHighlight}>{item.creator}</Text></Text>
                            {item.progress !== undefined && (
                                <View style={styles.progressBarContainer}>
                                    <Progress.Bar 
                                        progress={item.progress / 100} 
                                        width={240} 
                                        color="#82AA59" 
                                        borderColor="#352A23" 
                                        unfilledColor="#352A23" 
                                    />
                                    <Text style={styles.progressText}>{`${Math.round(item.progress)}%`}</Text> 
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            )}
            {type === 'unreleased' && (
                <View style={styles.showContainer}> 
                    <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                        <Image source={{ uri: item.image }} style={styles.showImage} />
                    </Shadow>
                    <View style={styles.showDetails}>
                        <Text style={styles.showTitle}>
                            {item.title} <Text style={styles.showYear}>{item.year}</Text>
                        </Text>
                        <Text style={styles.showSeasons}>
                            {item.seasons > 1 ? `${item.seasons} seasons` : `${item.seasons} season`}
                        </Text>
                        <View style={[styles.bottomRow, { marginTop: 56 }]}>
                            <Text style={styles.date}>{item.date}</Text>
                            <View style={styles.ratingContainer}>
                                <FontAwesome name="bookmark" size={20} color="#82AA59"></FontAwesome>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {type === 'add' && (
                <View style={styles.showContainer}> 
                    <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                        <Image source={{ uri: item.image }} style={styles.showImage} />
                    </Shadow>
                    <View style={styles.showDetails}>
                        <Text style={styles.showTitle}>
                            {item.title} <Text style={styles.showYear}>{item.year}</Text>
                        </Text>
                        <Text style={styles.showSeasons}>
                            {item.seasons > 1 ? `${item.seasons} seasons` : `${item.seasons} season`}
                        </Text>
                        <View style={styles.middleRow}>
                            <Shadow distance={1} startColor={'#211B17'} offset={[2, 4]}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.9}>
                                    <AntDesign name="plus" size={18} style={{ padding: 4 }}></AntDesign>
                                </TouchableOpacity>
                            </Shadow>
                        </View>
                        <View style={[styles.bottomRow, { marginTop: 34 }]}>
                            <Text style={styles.showCreator}>Created by <Text style={styles.showCreatorHighlight}>{item.creator}</Text></Text>
                            <View style={styles.ratingContainer}>
                                {item.rating !== undefined && (
                                    <>
                                        <Text style={styles.showRating}>{item.rating.toFixed(1)}</Text>
                                        <AntDesign name="star" size={18} color="#D8A84E" />
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </>
    );

    return (
        <FlatList
            data={shows}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            renderItem={renderShow}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        marginBottom: 20,
        color: '#211B17',
        fontFamily: 'Arimo',
    },
    showContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        paddingVertical: 8,
    },
    showImage: {
        width: 80,
        height: 120,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#211B17'
    },
    showDetails: {
        flex: 1,
        marginLeft: 16,
    },
    showTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    showYear: {
        fontWeight: 'normal',
        fontSize: 14,
        color: '#211B1770',
    },
    showSeasons: {
        marginTop: 4,
        fontSize: 14,
        color: '#211B1770',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    followingRow: {
        flexDirection: 'column',
        marginTop: 48,
    },
    showCreator: {
        fontSize: 12,
        color: '#211B1770',
        flex: 1,
    },
    date: {
        fontSize: 12,
        color: '#211B1770',
        flex: 1,
    },
    showCreatorHighlight: {
        color: '#211B17'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    showRating: {
        fontSize: 14,
        marginRight: 4, 
    },
    progressBarContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    progressText: {
        marginLeft: 12, 
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#D8A84E',
        borderWidth: 2,
        borderColor: '#211B17',
        margin: 2,
    },
    middleRow: {
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
    }
});
