import {ScrollView, StyleSheet, View} from 'react-native';
import MovieBox from "./app/components/MovieBox";
import React from "react";
import MovieSelector from "./app/components/MovieSelector";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function App() {
    return (
        <View style={styles.container}>
            <MovieSelector></MovieSelector>
            {/*<ScrollView>*/}
            {/*    <MovieBox id={"105"}/>*/}
            {/*    <MovieBox id={"70"}/>*/}
            {/*    <MovieBox id={"70"}/>*/}
            {/*    <MovieBox id={"70"}/>*/}
            {/*    <MovieBox id={"70"}/>*/}
            {/*    <MovieBox id={"70"}/>*/}
            {/*    <MovieBox id={"70"}/>*/}
            {/*    <MovieBox id={"70"}/>*/}
            {/*    <MovieBox id={"70"}/>*/}
            {/*</ScrollView>*/}
        </View>

    );
}
