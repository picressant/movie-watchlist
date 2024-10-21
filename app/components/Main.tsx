import { Animated, Platform, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import React from "react";
import MovieSelector from "./movie/MovieSelector";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MovieBox from './movie/MovieBox';
import { Button, FAB, Icon, Modal, PaperProvider, Portal } from 'react-native-paper';
import {useSelector} from "react-redux";
import MoviePage from "./movie/MoviePage";
import CountryFlag from "react-native-country-flag";
import CountrySelector from "./CountrySelector";
import {StatusBar} from "expo-status-bar";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SeriesBox from './series/SeriesBox';
import SeriesPage from './series/SeriesPage';
import SeriesSelector from './series/SeriesSelector';
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
    },
    countryButton: {
        // height:40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red"
    }
});

const MovieScreen = ({navigation}) => {
    const movieIds: number[] = useSelector((state: any) => state.movies.movieIds);
    const countryCode: string = useSelector((state: any) => state.country.countryCode);

    return (
        <View style={styles.containerMarged}>
            <ScrollView>
                {movieIds.map(id => <MovieBox navigation={navigation}
                                              key={id}
                                              props={{id: id.toString(), watchLang: countryCode}}></MovieBox>)}
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                variant={"primary"}
                onPress={() => navigation.navigate("Select a movie")}
            />
        </View>
    );
}

const SeriesScreen = ({navigation}) => {
    const seriesId: number[] = useSelector((state: any) => state.series.seriesIds);
    const countryCode: string = useSelector((state: any) => state.country.countryCode);

    return (
        <View style={styles.containerMarged}>
            <ScrollView>
                {seriesId.map(id => <SeriesBox navigation={navigation}
                                              key={id}
                                              props={{id: id.toString(), watchLang: countryCode}}></SeriesBox>)}
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                variant={"primary"}
                onPress={() => navigation.navigate("Select a serie")}
            />
        </View>
    );
}

// @ts-ignore
const HomeScreen = ({navigation}) => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Movies" component={MovieScreen} options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Icon size={size} source="filmstrip" color={color}></Icon>
             )}} />
            <Tab.Screen name="Series" component={SeriesScreen} options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Icon size={size} source="television" color={color}></Icon>
                )
            }} />
        </Tab.Navigator>
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

function SeriesSelectorScreen({navigation}) {
    return (
        <View style={styles.containerMarged}>
            <SeriesSelector navigation={navigation}></SeriesSelector>
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

function SeriesDetailsPage({route, navigation}) {
    return (
        <View style={styles.container}>
            <SeriesPage route={route} navigation={navigation}></SeriesPage>
        </View>
    );
}

const Stack = createNativeStackNavigator();


const Main = () => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    }
    const hideModal = () => setVisible(false);

    const countryCode: string = useSelector((state: any) => state.country.countryCode);

    const containerStyle = {backgroundColor: 'white', padding: 20, height: 500, margin: 20};


    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home"
                                 screenOptions={{
                                     headerStyle: {
                                         backgroundColor: '#f1e7e7',
                                     }
                                 }}>
                    <Stack.Screen name="Watch list" component={HomeScreen}
                                  options={{
                                      headerRight: () => (
                                          <TouchableNativeFeedback
                                              onPress={showModal}
                                              background={
                                                  Platform.OS === 'android'
                                                      ? TouchableNativeFeedback.SelectableBackground()
                                                      : undefined
                                              }>
                                              <View style={styles.countryButton}>
                                                  <CountryFlag isoCode={countryCode} size={20}></CountryFlag>
                                              </View>
                                          </TouchableNativeFeedback>
                                      ),
                                  }}/>
                    <Stack.Screen name="Select a movie" component={MovieSelectorScreen}/>
                    <Stack.Screen name="Select a serie" component={SeriesSelectorScreen}/>
                    <Stack.Screen name="Movie details" component={MovieDetailsPage}/>
                    <Stack.Screen name="Series details" component={SeriesDetailsPage}/>
                </Stack.Navigator>
            </NavigationContainer>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <CountrySelector closeModal={() => hideModal()}></CountrySelector>
                </Modal>
            </Portal>
            <StatusBar style="dark" backgroundColor={"#f1e7e7"}/>
        </PaperProvider>
    )
}

export default Main;