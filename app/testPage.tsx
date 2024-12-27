import React from "react";
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";

import ActorsDisplay from "@/components/actors/ActorsDisplay";
import UsersDisplay from "@/components/users/UsersDisplay";
import ShowsDisplay from "@/components/shows/ShowsDisplay";
import ReviewsDisplay from "@/components/reviews/ReviewsDisplay";
import EpisodesDisplay from "@/components/episodes/EpisodesDisplay";
import CoverDisplay from "@/components/shows/Cover";

const covers = [
    { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371270.jpg', rating: 4 },
    { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/249/623354.jpg', rating: 4},
    { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/192/482341.jpg', rating: 4},
    { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/453/1134275.jpg', rating: 4},
    { image: 'https://static.tvmaze.com/uploads/images/medium_portrait/4/11308.jpg', rating: 4},
];

export default function TestScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <CoverDisplay covers={covers} type="liked"></CoverDisplay>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingTop: 110,
    },
})
