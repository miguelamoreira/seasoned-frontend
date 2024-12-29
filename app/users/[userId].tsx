import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import OptionsTab from '@/components/OptionsTab';
import ProfileHeader from '@/components/users/ProfileHeader';
import OtherUserHeader from '@/components/users/OtherUserHeader';
import ProfileStats from '@/components/users/ProfileStats';
import ProfileFavourites from '@/components/users/ProfileFavourites';
import ProfileGenres from '@/components/users/ProfileGenres';
import ProfileBadges from '@/components/users/ProfileBadges';
import RatingDisplay from '@/components/shows/RatingsDisplay';
import ProfileOptions from '@/components/users/ProfileOptions';

const user = {
  id: 1,
  username: 'joshua31',
  followers: 250,
  following: 500,
  avatar: 'https://via.placeholder.com/100',
  statsData: {
    episodes: 451,
    months: 20,
    weeks: 3,
    days: 4,
    thisYearEpisodes: 50,
  },
  favourites: [
    { id: '1', image: 'https://via.placeholder.com/100' },
    { id: '2', image: 'https://via.placeholder.com/100' },
    { id: '3', image: 'https://via.placeholder.com/100' },
  ],
};

const otherUser = {
  id: 2,
  username: 'another_user',
  followers: 123,
  following: 456,
  avatar: 'https://via.placeholder.com/100',
  statsData: {
    episodes: 302,
    months: 15,
    weeks: 2,
    days: 5,
    thisYearEpisodes: 80,
  },
  favourites: [
    { id: '1', image: 'https://via.placeholder.com/100' },
    { id: '2', image: 'https://via.placeholder.com/100' },
    { id: '3', image: 'https://via.placeholder.com/100' },
  ],
};

const dummyBadges = [
  {
    name: 'Early Bird',
    description: 'Awarded for logging in before 6 AM.',
    image: 'https://via.placeholder.com/60',
    dateEarned: '2024-12-01',
    locked: false,
  },
  {
    name: 'Achiever',
    description: 'Completed 100 tasks in a month.',
    image: 'https://via.placeholder.com/60',
    dateEarned: '2024-11-25',
    locked: false,
  },
];

const userGenres = ['Drama', 'Action', 'Thriller', 'Comedy', 'Adventure', 'Fantasy'];

export default function UserProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [type, setType] = useState<'profile' | 'edit'>('profile');
  const [activeTab, setActiveTab] = useState<string>('header');
  const [isViewingOtherUser, setIsViewingOtherUser] = useState(false);

  const handleSaveProfile = () => {
    setType('profile');
  };

  const handleEditProfile = () => {
    setType('edit');
  };

  const toggleViewOtherUser = (id: number) => {
    router.push(`/users/${id}`);
  };

  const handleAddShow = () => {
    router.push(`/users/${userId}/favourites`);
  };

  const handleTabSelect = (label: string, navigateTo: string) => {
    router.push({
      pathname: navigateTo as any,
      params: { activeTab: label },
    });
  };

  const sections = [ 'header', 'stats', 'favourites', 'genres', 'badges', 'ratings', 'userShows', 'userActivity' ];

  const userShowsOptions = [
    { label: 'following', action: () => handleTabSelect('Following', `/users/${userId}/usersShows`) },
    { label: 'watched', action: () => handleTabSelect('Watched', `/users/${userId}/usersShows`) },
    { label: 'watchlist', action: () => handleTabSelect('Watchlist', `/users/${userId}/usersShows`) },
    { label: 'dropped', action: () => handleTabSelect('Dropped', `/users/${userId}/usersShows`) },
  ];

  const userActivityOptions = [
    { label: 'reviews', action: () => handleTabSelect('Reviews', `/users/${userId}/usersActivity`) },
    { label: 'likes', action: () => handleTabSelect('Likes', `/users/${userId}/usersActivity`) },
  ];

  const renderItem = ({ item }: { item: string }) => {
    if (item === 'header') {
      if (isViewingOtherUser) {
        return (
          <>
            <OptionsTab type="back" onBackPress={() => router.back()}></OptionsTab>
            <OtherUserHeader username={otherUser.username} followers={otherUser.followers} following={otherUser.following} profileImage={otherUser.avatar}
              onFollowToggle={() => console.log('Follow/Unfollow toggled')} userId={otherUser.id}
            />
          </>
        );
      } else {
        return (
          <ProfileHeader username={user.username} followers={user.followers} following={user.following} profileImage={user.avatar} onEditProfile={handleEditProfile}
            onSettingsPress={() => console.log('Settings Pressed')} onQRPress={() => router.push(`/users/${userId}/qrcode`)} type={type} onSaveProfile={handleSaveProfile}
          />
        );
      }
    }

    switch (item) {
      case 'stats':
        return <ProfileStats stats={user.statsData} type={type} />;
      case 'favourites':
        return <ProfileFavourites type={type} shows={user.favourites} onAddShow={handleAddShow} onRemoveShow={(id) => console.log(`Remove Show with ID: ${id}`)}/>;
      case 'genres':
        return <ProfileGenres genres={userGenres} type={type} />;
      case 'badges':
        return <ProfileBadges badges={dummyBadges} type={type} />;
      case 'ratings':
        return <RatingDisplay type={type} ratings={[1, 3, 5, 15, 6]} average={4.5} />;
      case 'userShows':
        return <ProfileOptions title="User's Shows" options={userShowsOptions} type={type} />;
      case 'userActivity':
        return <ProfileOptions title="User's Activity" options={userActivityOptions} type={type} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList data={sections} renderItem={renderItem} keyExtractor={(item) => item} contentContainerStyle={styles.flatListContent} showsVerticalScrollIndicator={false}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF4E0',
    paddingTop: 42,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
});