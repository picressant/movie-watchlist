import {Animated, StyleSheet, Text, View} from 'react-native';
import React from "react";
import MovieSelector from "./app/components/MovieSelector";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MovieBox from './app/components/MovieBox';
import {FAB} from "react-native-paper";
import {store} from "./app/redux/store/configureStore";
import {Provider, useSelector} from "react-redux";
import ScrollView = Animated.ScrollView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        flex: 1
    },
    fab: {
        position: "absolute",
        bottom: 10,
        right: 10
    }
});

// @ts-ignore
const HomeScreen = ({navigation}) => {
    const movieIds: number[] = useSelector((state) => state.movies.movieIds)

    return (
        <View style={styles.container}>
            <ScrollView>
                {movieIds.map(id => <MovieBox id={id.toString()}></MovieBox>)}
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate("Select a movie")}
            />
        </View>
    );
};

function MovieSelectorScreen({navigation}) {
    return (
        <View style={styles.container}>
            <MovieSelector navigation={navigation}></MovieSelector>
        </View>
    );
}

const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Watch list" component={HomeScreen}/>
                    <Stack.Screen name="Select a movie" component={MovieSelectorScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
}
