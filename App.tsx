import {Animated, StyleSheet, View} from 'react-native';
import React from "react";
import MovieSelector from "./app/components/MovieSelector";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MovieBox from './app/components/MovieBox';
import ScrollView = Animated.ScrollView;
import {FAB} from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        flex: 1
    },
    fab: {
        position:"absolute",
        bottom: 10,
        right: 10
    }
});

// @ts-ignore
const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/*<MovieSelector></MovieSelector>*/}
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
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() =>  navigation.navigate("Select a movie")}
            />
        </View>
    );
};

function MovieSelectorScreen() {
    return (
        <View style={styles.container}>
            <MovieSelector></MovieSelector>
        </View>
    );
}

const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Watch list" component={HomeScreen}/>
                <Stack.Screen name="Select a movie" component={MovieSelectorScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}
