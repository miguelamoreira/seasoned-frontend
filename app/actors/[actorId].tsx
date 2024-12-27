import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';


import OptionsTab from '@/components/OptionsTab';
import CoverDisplay from '@/components/shows/Cover';

export default function ActorScreen() {
    const { actorId } = useLocalSearchParams<{ actorId: string }>();
    const router = useRouter();

    const [actor, setActor] = useState({
        id: actorId,
        name: 'Ben Lawson',
        dateOfBirth: '06-02-1980',
        country: 'Australia',
        genre: 'Masculine',
        bio: 'Ben Lawson is an Australian actor known for participating in Firefly Lane.',
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/8/20174.jpg', 
        shows: [
            { id: 1, title: 'Firefly Lane', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/458/1147479.jpg' },
            { id: 2, title: 'Neighbours', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/471/1178200.jpg' },
            { id: 3, title: 'Deep End', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/7/18416.jpg' },
            { id: 4, title: 'Designated Survivor', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/194/486246.jpg' },
        ],
    });

    return (
        <SafeAreaView style={[styles.mainContainer]}>
            <OptionsTab type="back" onBackPress={() => router.push('/search')} />

            <View style={styles.headerContainer}> 
                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <Image source={{ uri: actor.image }} style={styles.actorImage} />
                </Shadow>
                <View style={styles.ellipse}>
                    <Image source={require('../../assets/images/ellipse.png')}></Image>
                </View>
            </View>

            <View style={styles.actorDetails}>
                <Text style={styles.actorName}>{actor.name}</Text>
                <Text style={styles.actorDateOfBirth}>{actor.dateOfBirth}</Text>
            </View>

            <View style={styles.actorInfoContainer}>
                <Text style={styles.bioHeading}>Bio</Text>
                <Text style={styles.actorBio}>
                    {actor.name} is an {actor.genre === 'Feminine' ? 'actress' : 'actor'} from {actor.country} known for participating in {actor.shows[0].title}.
                </Text>
            </View>

            <View style={styles.appearsInContainer}>
                <View style={styles.appearsInHeader}>
                    <Text style={styles.appearsInHeading}>Appears in</Text>
                    <TouchableOpacity onPress={() => router.push(`/actors/${actor.id}/shows`)} style={styles.seeAllContainer}>
                        <Text style={styles.seeAllText}>See all</Text>
                        <Icon name="chevron-forward" size={16} color="#211B17"/>
                    </TouchableOpacity>
                </View>
                <Progress.Bar 
                    progress={50/100} 
                    width={378} 
                    color="#82AA59" 
                    borderColor="#352A23" 
                    unfilledColor="#352A23"
                    style={{ marginVertical: 4, }}
                />
                <CoverDisplay
                    covers={actor.shows.map((show) => ({ image: show.image }))}
                    onCoverPress={(cover) => console.log('Selected cover:', cover)}
                    type="default"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingTop: 42,
        paddingHorizontal: 16,
        fontFamily: 'Arimo',
    },
    headerContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 16, 
        backgroundImage: require('../../assets/images/pattern.png'),
    },
    ellipse: {
        position: 'absolute',
        bottom: -4,
    },
    actorImage: {
        width: 150,
        height: 190,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 4,
        borderColor: '#211B17',
        alignSelf: 'center',
        zIndex: 1
    },
    actorDetails: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 12, 
    },
    actorName: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        color: '#211B17',
        marginRight: 4, 
    },
    actorDateOfBirth: {
        fontSize: 16,
        color: '#211B1770', 
    },
    actorInfoContainer: {
        alignItems: 'flex-start',
    },
    bioHeading: {
        fontSize: 20,
        fontWeight: '700',
        color: '#211B17',
        textAlign: 'left',
        width: '100%',
    },
    actorBio: {
        fontSize: 16,
        color: '#211B17',
        textAlign: 'left', 
        marginTop: 8,
    },
    appearsInContainer: {
        marginTop: 24,
    },
    appearsInHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    appearsInHeading: {
        fontSize: 20,
        fontFamily: 'DMSerifText',
        lineHeight: 20,
        color: '#211B17',
        textAlign: 'left',
    },
    seeAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    seeAllText: {
        fontSize: 14,
    }
});