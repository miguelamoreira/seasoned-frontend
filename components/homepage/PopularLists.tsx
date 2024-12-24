import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { Shadow } from 'react-native-shadow-2';

type ListItem = {
    imageUri: string;
};

type PopularList = {
    title: string;
    items: ListItem[];
    likes: number;
    liked: boolean; 
};

type PopularListsProps = {
    lists: PopularList[];
};

export default function PopularLists({ lists }: PopularListsProps) {
    const [popularLists, setPopularLists] = useState(lists);

    const handleSeeAll = (section: string) => {
        console.log(`Navigated to all items in ${section}`);
    };

    const toggleLike = (index: number) => {
        const updatedLists = [...popularLists];
        const targetList = updatedLists[index];
        targetList.liked = !targetList.liked;
        targetList.likes += targetList.liked ? 1 : -1;
        setPopularLists(updatedLists);
    };

    return (
        <View style={styles.popularListsContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.heading}>Popular lists</Text>
                <TouchableOpacity onPress={() => handleSeeAll('Popular Reviews')} style={styles.seeAllContainer}>
                    <Text style={styles.seeAllText}>See all</Text>
                    <Icon name="chevron-forward" size={16} color="#211B17" />
                </TouchableOpacity>
            </View>
            {popularLists.map((list, index) => (
                <View key={index} style={styles.listCard}>
                    <View style={styles.horizontalStackContainer}>
                        {list.items.map((item, idx) => (
                            <View key={idx} style={[styles.stackedImageWrapper, { left: idx * 20 }]}>
                                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]} style={styles.shadow}>
                                    <Image source={{ uri: item.imageUri }} style={styles.stackedImage}/>
                                </Shadow>
                            </View>
                        ))}
                    </View>
                    <View style={styles.listDetails}>
                        <Text style={styles.listTitle}>{list.title}</Text>
                        <View style={styles.likeContainer}>
                            <Text style={styles.listStats}>{list.likes}</Text>
                            <TouchableOpacity onPress={() => toggleLike(index)}>
                                <Icon
                                    name={list.liked ? 'heart' : 'heart-outline'}
                                    size={18}
                                    color={list.liked ? '#EE6363' : '#211B17'}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    popularListsContainer: {
        marginTop: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    seeAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    seeAllText: {
        fontSize: 14,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'DMSerifText',
        lineHeight: 45,
    },
    listCard: {
        marginVertical: 10,
        position: 'relative',
    },
    horizontalStackContainer: {
        height: 160,
        flexDirection: 'row',
        position: 'relative',
    },
    stackedImageWrapper: {
        position: 'absolute',
    },
    shadow: {
        borderRadius: 8,
    },
    stackedImage: {
        width: 120,
        height: 160,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#211B17',
    },
    listDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    listStats: {
        fontSize: 14,
        color: '#211B17',
        marginRight: 8,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 4,
    },
});
