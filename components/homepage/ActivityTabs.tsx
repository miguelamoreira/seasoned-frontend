import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import ActivityItem, { ActivityItem as ActivityItemType } from './ActivityItem';

type TabKey = 'friends' | 'myActivity'; // Strictly typed keys
type Tab = {
  label: string;
  key: TabKey;
};

export default function ActivityTabs() {
  const [selectedTab, setSelectedTab] = useState<TabKey>('friends');

  const allActivities: ActivityItemType[] = [
    {
      id: '1',
      user: { name: 'kpatrick', avatar: 'https://placehold.jp/30x30.png' },
      type: 'watchedAndRated',
      content: { title: 'Glee', subtitle: '2009', rating: 4, image: 'https://example.com/glee.png' },
    },
    {
      id: '2',
      user: { name: 'william32', avatar: 'https://placehold.jp/30x30.png' },
      type: 'likedReview',
      content: { title: 'Mr. Robot', subtitle: '2015', rating: 5, image: 'https://example.com/mr-robot.png' },
    },
    {
      id: '3',
      user: { name: 'manningjef', avatar: 'https://placehold.jp/30x30.png' },
      type: 'likedList',
      content: { title: 'I want to KMS', likedByCount: 9536, image: 'https://example.com/list-image.png' },
    },
    {
      id: '4',
      user: { name: 'You', avatar: 'https://placehold.jp/30x30.png' },
      type: 'followed',
      content: { followedUser: 'jane_doe' },
    },
    {
      id: '5',
      user: { name: 'You', avatar: 'https://placehold.jp/30x30.png' },
      type: 'likedReview',
      content: { title: 'Breaking Bad', subtitle: '2008', rating: 5, image: 'https://example.com/breaking-bad.png' },
    },
  ];

  const activityData: Record<TabKey, ActivityItemType[]> = {
    friends: allActivities.filter((activity) => activity.user.name !== 'You'),
    myActivity: allActivities.filter((activity) => activity.user.name === 'You'),
  };

  console.log('Selected Tab:', selectedTab);
  console.log('Data for Tab:', activityData[selectedTab]);

  const tabs: Tab[] = [
    { label: 'Friends', key: 'friends' },
    { label: 'My Activity', key: 'myActivity' },
  ];

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => {
        const isActive = selectedTab === tab.key;

        const TabContent = (
          <TouchableOpacity key={index} onPress={() => setSelectedTab(tab.key)} style={[styles.tab, isActive ? styles.activeTab : styles.inactiveTab]}>
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        );

        return isActive ? (
          <Shadow key={index} distance={1} startColor={'#211B17'} offset={[1, 2]}>
            {TabContent}
          </Shadow>
        ) : (
          TabContent
        );
      })}
    </View>
  );

  const renderActivity = ({ item }: { item: ActivityItemType }) => {
    console.log('Rendering Activity Item:', item);
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.user.name}</Text>
        <Image source={{ uri: item.user.avatar }} style={styles.itemAvatar}></Image>
        <Text style={styles.itemSubtitle}>{item.type}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTabs()}
      <FlatList
        data={activityData[selectedTab]}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        style={styles.list}
        nestedScrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF4E0',
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  activeTab: { 
    backgroundColor: '#D8A84E', 
    borderWidth: 2, 
    borderColor: '#211B17' 
  },
  inactiveTab: { 
    backgroundColor: 'transparent' 
  },
  tabText: { 
    fontSize: 14, fontWeight: '700', 
    fontFamily: 'Arimo', 
    color: '#211B17' 
  },
  activeTabText: { 
    color: '#211B17' 
  },
  list: { 
    padding: 16 
  },
  itemContainer: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemTitle: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  itemSubtitle: { 
    fontSize: 14, 
    color: '#555' 
  },
  itemAvatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  }
});