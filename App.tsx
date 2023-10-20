import {Animated, StyleSheet, View} from 'react-native';
import React from "react";
import MovieSelector from "./app/components/MovieSelector";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MovieBox from './app/components/MovieBox';
import {FAB, MD3LightTheme, PaperProvider} from "react-native-paper";
import {Provider, useSelector} from "react-redux";
import MoviePage from "./app/components/MoviePage";
import {persistor, store} from "./app/redux/store/storage";
import {PersistGate} from 'redux-persist/integration/react';
import ScrollView = Animated.ScrollView;

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

const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#b99369',
        secondary: '#f1e3d4',
        background: '#FFFFFF',
        primaryContainer: '#f3e7db',
        elevation: {
            level3: '#f1e7e7'
        }
    },
};

const navTheme = {
    ...DefaultTheme,
    colors: {
        card : '#f1e7e7',
        background:'#fcf8f7'
    }

}


// @ts-ignore
const HomeScreen = ({navigation}) => {
    const movieIds: number[] = useSelector((state) => state.movies.movieIds)

    return (
        <View style={styles.containerMarged}>
            <ScrollView>
                {movieIds.map(id => <MovieBox navigation={navigation}
                                              key={id}
                                              props={{id: id.toString(), watchLang: "FR"}}></MovieBox>)}
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                variant={"primary"}
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
        <PaperProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer theme={navTheme}>
                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen name="Watch list" component={HomeScreen}/>
                            <Stack.Screen name="Select a movie" component={MovieSelectorScreen}/>
                            <Stack.Screen name="Details" component={MovieDetailsPage}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        </PaperProvider>
    );
}
