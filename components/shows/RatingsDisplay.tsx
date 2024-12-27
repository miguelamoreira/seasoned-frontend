import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type RatingDisplayProps = {
    ratings: number[];
    average: number;
};

export default function RatingDisplay({ ratings, average }: RatingDisplayProps) {
    const maxRating = 5;

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <AntDesign name="star" size={16} color="#D8A84E" style={styles.leftStar} />

                <View style={styles.histogramContainer}>
                    {ratings.map((count, index) => (
                        <View key={index} style={styles.barContainer}>
                            <View style={[styles.bar, { height: count * 5 }]} />
                        </View>
                    ))}
                </View>

                <View style={styles.rightContainer}>
                    <View style={styles.averageContainer}>
                        <Text style={styles.averageText}>{average.toFixed(1)}</Text>
                        <Text style={styles.averageLabel}>Avg. rating</Text>
                    </View>

                    
                    <View style={styles.starsContainer}>
                        {Array.from({ length: maxRating }, (_, index) => (
                            <AntDesign key={index} name="star" size={16} color="#D8A84E" />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftStar: {
        top: 40,
    },
    histogramContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 4,
        flex: 1, 
        marginHorizontal: 8,
    },
    barContainer: {
        alignItems: 'center',
    },
    bar: {
        width: 40,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: '#82AA59',
    },
    rightContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        top: 14,
    },
    averageContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },  
    averageText: {
        fontSize: 20,
        fontFamily: 'DMSerifText',
        color: '#211B17',
    },
    averageLabel: {
        fontWeight: '500',
        fontSize: 14,
    },
    starsContainer: {
        flexDirection: 'row',
    },
});
