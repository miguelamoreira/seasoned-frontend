import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

type Cover = {
    image: string;
};

type CoverDisplayProps = {
    covers: Cover[];
    onCoverPress?: (cover: Cover) => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width - 32;
const COVER_SIZE = SCREEN_WIDTH / 4.5; 
const COVER_MARGIN = (SCREEN_WIDTH - COVER_SIZE * 4) / 4.5; 

export default function CoverDisplay({ covers, onCoverPress }: CoverDisplayProps) {
    const renderCover = ({ item }: { item: Cover }) => (
        <TouchableOpacity onPress={() => onCoverPress?.(item)} style={styles.coverContainer}>
            <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                <Image source={{ uri: item.image }} style={styles.coverImage} />
            </Shadow>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={covers}
            renderItem={renderCover}
            keyExtractor={(item, index) => `${item.image}-${index}`}
            numColumns={4} 
            columnWrapperStyle={styles.row} 
            contentContainerStyle={styles.listContent}
        />
    );
}

const styles = StyleSheet.create({
    coverContainer: {
        marginHorizontal: COVER_MARGIN / 2, 
        marginVertical: 8, 
    },
    coverImage: {
        width: COVER_SIZE,
        height: COVER_SIZE * 1.5, 
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#211B17',
    },
    row: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    listContent: {
        paddingHorizontal: 0, 
    },
});
