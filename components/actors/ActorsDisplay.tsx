import React, { act } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Shadow } from 'react-native-shadow-2';

type Actor = {
    id: number;
    name: string;
    dateOfBirth: string;
    country: string;
    series: string[];
    image: string;
};

type ActorsProps = {
    actors: Actor[];
};

export default function ActorsDisplay({ actors }: ActorsProps) {
    const renderActor = ({ item }: { item: Actor }) => (
        <View style={styles.actorContainer}>
            <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                <Image source={{ uri: item.image }} style={styles.actorImage} />
            </Shadow>
        <View style={styles.actorDetails}>
            <Text style={styles.actorName}>
                {item.name}
            </Text>
            <Text style={styles.actorCountry}>
                {item.country}
            </Text>
            <View style={styles.bottomRow}>
                <Text style={styles.actorFilmography}>Appears in <Text style={styles.actorFilmographyHighlight}>{item.series.length} shows</Text></Text>
                </View>
            </View>
        </View>
    );
    
    return (
        <FlatList
            data={actors}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderActor}
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
    actorContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        paddingVertical: 8,
    },
    actorImage: {
        width: 80,
        height: 120,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#211B17'
    },
    actorDetails: {
        flex: 1,
        marginLeft: 16,
    },
    actorName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    actorCountry: {
        marginTop: 4,
        fontSize: 14,
        color: '#211B1770',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 56,
    },
    actorFilmography: {
        fontSize: 12,
        color: '#211B1770',
        flex: 1,
    },
    actorFilmographyHighlight: {
        color: '#211B17'
    },
});
