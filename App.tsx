import {ScrollView, StyleSheet} from 'react-native';
import MovieBox from "./app/components/MovieBox";
import React from "react";

export default function App() {
    return (
        <ScrollView>
            <MovieBox id={"105"}/>
            <MovieBox id={"70"}/>
            <MovieBox id={"70"}/>
            <MovieBox id={"70"}/>
            <MovieBox id={"70"}/>
            <MovieBox id={"70"}/>
            <MovieBox id={"70"}/>
            <MovieBox id={"70"}/>
            <MovieBox id={"70"}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
