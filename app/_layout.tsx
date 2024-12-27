import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import TabBar from '@/components/Tabbar';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Caprasimo: require('../assets/fonts/Caprasimo-Regular.ttf'),
    Arimo: require('../assets/fonts/Arimo-VariableFont_wght.ttf'),
    DMSerifText: require('../assets/fonts/DMSerifText-Regular.ttf'),
  });

  const [currentPage, setCurrentPage] = useState('Home'); 

  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const currentRoute = navigationState?.key
    ? navigationState?.routes[navigationState.index]?.name
    : 'Home';

  const hideTabBarScreens = ['index', 'signin', 'register'];

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    if (page === 'Home') {
      router.push('/homepage');
    } else if (page === 'Search') {
      router.push('/search');
    } else if (page === 'Notifications') {
      router.push('/testPage');
    } else if (page === 'Profile') {
      router.push('/homepage');
    } else {
      console.error(`Route for page "${page}" not found.`);
    }
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        {/* Stack for managing screens */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="signin"/>
          <Stack.Screen name="register"/>
          <Stack.Screen name="homepage"/>
          <Stack.Screen name="popularReviews"/>
          <Stack.Screen name="popularShows"/>
          <Stack.Screen name="search"/>
          <Stack.Screen name="testPage"/>
        </Stack>

        {!hideTabBarScreens.includes(currentRoute || '') && (
          <TabBar isLoggedIn={true} currentPage={currentPage} onNavigate={handleNavigation}/>
        )}
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
