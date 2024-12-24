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
  };
  isLoggedUser?: boolean; // New property to indicate if this is the logged-in user
};

type Props = {
  item: ActivityItem;
};

export default function ActivityItem({ item }: Props) {
  const renderContent = () => {
    switch (item.type) {
      case 'likedReview':
        return (
          <View style={styles.reviewContainer}>
            <Image source={{ uri: item.content.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.content.title}</Text>
              <Text style={styles.subtitle}>{item.content.subtitle}</Text>
              <View style={styles.ratingContainer}>
                {[...Array(item.content.rating)].map((_, index) => (
                  <Icon key={index} name="star" size={16} color="#FFC107" />
                ))}
              </View>
            </View>
          </View>
        );
      case 'watchedAndRated':
        return (
          <View style={styles.reviewContainer}>
            <Image source={{ uri: item.content.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.content.title}</Text>
              <Text style={styles.subtitle}>{item.content.subtitle}</Text>
              <View style={styles.ratingContainer}>
                {[...Array(item.content.rating)].map((_, index) => (
                  <Icon key={index} name="star" size={16} color="#FFC107" />
                ))}
              </View>
            </View>
          </View>
        );
      case 'followed':
        return (
          <Text style={styles.followedText}>
            Followed {item.content.followedUser}
          </Text>
        );
      case 'likedList':
        return (
          <View style={styles.likedListContainer}>
            <View style={styles.listImages}>
              {item.content.image && (
                <Image
                  source={{ uri: item.content.image }}
                  style={styles.listImage}
                />
              )}
            </View>
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
        return item.isLoggedUser ? 'You followed' : 'followed';
      case 'likedList':
        return item.isLoggedUser ? 'You liked a list' : 'liked a list';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.user}>
          {item.isLoggedUser ? 'You' : item.user.name}{' '}
          <Text style={styles.action}>{getActionText(item.type)}</Text>
        </Text>
        {renderContent()}
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
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  content: {
    flex: 1,
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
    width: 60,
    height: 90,
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
  ratingContainer: {
    flexDirection: 'row',
  },
  followedText: {
    fontSize: 14,
    color: '#333',
  },
  likedListContainer: {
    marginTop: 6,
  },
  listImages: {
    flexDirection: 'row',
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
