import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Shadow } from 'react-native-shadow-2';

type Show = {
    image: string;
    title: string;
    year: number;
    seasons: number;
    creator: string;
    rating: number;
};

type ShowsProps = {
    shows: Show[];
};

export default function ShowsDisplay({ shows }: ShowsProps) {
    const renderShow = ({ item }: { item: Show }) => (
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
                <View style={styles.bottomRow}>
                    <Text style={styles.showCreator}>Created by <Text style={styles.showCreatorHighlight}>{item.creator}</Text></Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.showRating}>{item.rating.toFixed(1)}</Text>
                        <Icon name="star" size={18} color="#D8A84E" />
                    </View>
                </View>
            </View>
        </View>
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
        marginTop: 56,
    },
    showCreator: {
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
});
