import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import EpisodesDisplay from './episodes/EpisodesDisplay';
import ReviewsDisplay from './reviews/ReviewsDisplay';

type NotificationCardProps = {
    type: 'series' | 'social';
    variant: 'new_episode' | 'series_premiere' | 'follow' | 'liked_review';
    data: {
      seriesTitle?: string;
      user?: string;
      avatar?: string;
      episodes?: any[];
      reviews?: any[];
      seriesId?: string | number;
    };
    read: boolean;
};

export default function NotificationCard({ type, variant, data, read }: NotificationCardProps) {
    const renderCircle = () => (
      <View style={[ styles.iconCircle, { opacity: read ? 0.5 : 1 } ]}/>
    );

    if (type === 'series') {
      return (
        <View style={styles.notificationCard}>
          { variant === 'new_episode' ?  (
              <View style={styles.notificationHeader}>
                  {renderCircle()}
                  {data.seriesTitle && <Text style={styles.notificationTitle} numberOfLines={2}>New episode for <Text style={styles.notificationHighlight}>{data.seriesTitle}</Text> airs today!</Text>}
              </View>
          ): (
              <View style={styles.notificationHeader}>
                  {renderCircle()}
                  {data.seriesTitle && <Text style={styles.notificationTitle}>New season premiere for <Text style={styles.notificationHighlight}>{data.seriesTitle}</Text> airs today!</Text>}
              </View>
          )}

          {data.episodes && (
            <EpisodesDisplay episodes={data.episodes} type="default" seriesId={'1'}  seasonNumber={String(data.episodes)}/>
          )}
        </View>
      );
    }

    if (type === 'social') {
      if (variant === 'liked_review') {
        return (
          <View style={styles.notificationCard}>
              <View style={styles.notificationHeader}>
                  {renderCircle()}
                  {<Text style={styles.notificationTitle} numberOfLines={2}><Text style={styles.notificationHighlight}>{data.user}</Text> liked your review</Text>}
              </View>
              <ReviewsDisplay type='notifications' reviews={data.reviews || []}></ReviewsDisplay>
          </View>
        );
      } else if (variant === 'follow') {
        return (
          <View style={styles.notificationCard}>
            <View style={styles.notificationHeader}>
              {renderCircle()}
              <Image source={{ uri: data.avatar }} style={styles.notificationAvatar}></Image>
              <Text style={styles.notificationTitle}><Text style={styles.notificationHighlight}>{data.user}</Text> followed you</Text>
            </View>
          </View>
        );
      }
    }
}

const styles = StyleSheet.create({
    notificationCard: {
      flexDirection: 'column',
      paddingHorizontal: 4,
      borderRadius: 12,
      marginBottom: 16,
      marginHorizontal: 16,
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    notificationImage: {
      width: '100%',
      height: 180,
      borderRadius: 8,
      marginBottom: 12,
    },
    textContainer: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 16,
      marginBottom: 4,
      color: '#211B17',
      width: 300,
    },
    notificationHighlight: {
      fontWeight: '700',
    },
    notificationAvatar: {
      width: 40,
      height: 40,
      borderWidth: 2,
      borderRadius: 20,
      borderColor: '#211B17',
      marginRight: 8,
    },
    iconCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#211B17',
      backgroundColor: '#D8A84E',
      marginRight: 12,
      alignSelf: 'center',
    },
});