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
import MoviePage from "./app/components/MoviePage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerMarged: {
        flex: 1,
        marginHorizontal: 10
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
        <View style={styles.containerMarged}>
            <ScrollView>
                {movieIds.map(id => <MovieBox navigation={navigation} props={{id: id.toString(), watchLang:"FR"}}></MovieBox>)}
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate("Select a movie")}
            />
        </View>
    );
};

// @ts-ignore
function MovieSelectorScreen({navigation}) {
    return (
        <View style={styles.containerMarged}>
            <MovieSelector navigation={navigation}></MovieSelector>
        </View>
    );
}

function MovieDetailsPage({route, navigation}) {
    return (
        <View style={styles.container}>
            <MoviePage route={route} navigation={navigation}></MoviePage>
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
                    <Stack.Screen name="Details" component={MovieDetailsPage}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
}
