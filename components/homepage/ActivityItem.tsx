import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export type ActivityItem = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: 'likedReview' | 'watchedAndRated' | 'followed' | 'likedList';
  content: {
    title?: string;
    subtitle?: string;
    rating?: number;
    image?: string;
    likedByCount?: number;
    followedUser?: string;
    description?: string;
  };
  isLoggedUser?: boolean;
};

type Props = {
  item: ActivityItem;
};

export default function ActivityItem({ item }: Props) {
  const renderContent = () => {
    switch (item.type) {
      case 'likedReview':
      case 'watchedAndRated':
        return (
          <View style={styles.reviewContainer}>
            <Image source={{ uri: item.content.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.content.title}</Text>
              <Text style={styles.subtitle}>{item.content.subtitle}</Text>
              {item.content.description && (
                <Text style={styles.description}>{item.content.description}</Text>
              )}
              {item.content.rating && (
                <View style={styles.ratingContainer}>
                  {[...Array(item.content.rating)].map((_, index) => (
                    <Icon key={index} name="star" size={16} color="#D8A84E" />
                  ))}
                </View>
              )}
            </View>
          </View>
        );
      case 'followed':
        return (
          null
        );
      case 'likedList':
        return (
          <View style={styles.likedListContainer}>
            {item.content.image && (
              <Image source={{ uri: item.content.image }} style={styles.listImage} />
            )}
            <Text style={styles.listTitle}>{item.content.title}</Text>
            <Text style={styles.likes}>
              <Icon name="heart" size={16} color="#FF6B6B" />{' '}
              {item.content.likedByCount}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const getActionText = (type: ActivityItem['type']) => {
    switch (type) {
      case 'likedReview':
        return item.isLoggedUser ? 'You liked a review' : 'liked a review';
      case 'watchedAndRated':
        return item.isLoggedUser ? 'You watched and rated' : 'watched and rated';
        case 'followed':
          return item.isLoggedUser
            ? `You followed ${item.content.followedUser}`
            : `followed ${item.content.followedUser}`;
      case 'likedList':
        return item.isLoggedUser ? 'You liked a list' : 'liked a list';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentHeading}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          <Text style={styles.user}>
            {item.isLoggedUser ? 'You' : item.user.name}{' '}
            <Text style={styles.action}>{getActionText(item.type)}</Text>
          </Text>
        </View>
        <View style={styles.contentBody}>{renderContent()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 12,
    width: 378,
    minHeight: 40,
    maxHeight: 180, 
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  contentHeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentBody: {
    marginTop: 12,
  },
  user: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  action: {
    fontWeight: 'normal',
    color: '#555',
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#EEE',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  description: {
    fontSize: 12,
    color: '#211B1770',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  followedContainer: {
    paddingVertical: 4,
    justifyContent: 'center',
  },
  followedText: {
    fontSize: 14,
    color: '#333',
  },
  likedListContainer: {
    marginTop: 6,
  },
  listImage: {
    width: 40,
    height: 60,
    borderRadius: 4,
    marginRight: 4,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  likes: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});
