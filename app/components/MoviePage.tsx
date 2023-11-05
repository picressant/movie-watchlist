import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, FlatListProps, Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import {API_KEY} from '@env'
import {fetchMovie, Movie, WatchProvider} from "../domain/Movie";
import {useDispatch} from "react-redux";
import {movieRemoved} from "../redux/slices/MovieSlice";
import {Button, Dialog, FAB, List, PaperProvider, Portal} from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import {getCountry} from "../domain/Countries";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    movieContainer: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        marginVertical: 5,
        backgroundColor: "blue"
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 10,
        position: "absolute",
        top: 75,
        left: 15,
        opacity: 1
    },
    backgroundImg: {
        height: 150,
        opacity: 0.75
    },
    movieInfo: {
        paddingLeft: 130,
        minHeight: 75,
        justifyContent: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 20
    },
    originalTitle: {
        fontStyle: "italic",
        fontSize: 10
    },
    otherInfo: {
        margin: 15
    },
    otherData: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        fontStyle: "italic",
        font: {
            fontSize: 15,
            marginRight: 2,
            color: "grey",
            fontStyle: "italic",
        }
    },
    providers: {
        flex: 1,
    },
    provider: {
        marginLeft: 15,
        marginBottom: 5,
        flexDirection: "row",
    },
    country: {
        flexDirection: "column",
        alignItems: "flex-start",
        font: {
            fontStyle: "italic",
            color: "grey",
            fontSize: 12
        }
    },
    services: {
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: 1,
    },
    smallPoster: {
        height: 32,
        width: 32,
        margin: 2,
        borderRadius: 2,
    },
    fab: {
        position: "absolute",
        bottom: 10,
        right: 10
    }
});

// @ts-ignore
const MoviePage = ({route, navigation}) => {
    const [data, setData] = useState<Movie>();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const {id} = route.params;

    const dispatch = useDispatch();
    const dispatchDelete = () => {
        dispatch(movieRemoved(id));
        navigation.goBack();
    }

    const fetchData = async () => {
        const movie = await fetchMovie(id);
        setData(movie);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderProvider = (providerProps: FlatListProps<WatchProvider>) => {
        const provider = providerProps.item as WatchProvider;
        return (
            <View style={styles.provider}>
                <View style={styles.country}>
                    <CountryFlag isoCode={provider.lang} size={20}></CountryFlag>
                    <Text style={styles.country.font}>{getCountry(provider.lang)?.country}</Text>
                </View>
                <View style={styles.services}>
                    {provider.flatrate?.map(p => <Image
                        style={styles.smallPoster}
                        key={p.logo_path}
                        source={{
                            uri: 'https://image.tmdb.org/t/p/w500/' + p.logo_path
                        }}
                    ></Image>)}
                </View>
            </View>
        );
    }

    return (
            <View style={styles.container}>
                {loading && <ActivityIndicator/>}
                {data && (
                    <View style={styles.container}>
                        <Image source={{
                            uri: 'https://image.tmdb.org/t/p/w500/' + data.backdrop_path
                        }} style={styles.backgroundImg}></Image>
                        <Image
                            style={styles.poster}
                            source={{
                                uri: 'https://image.tmdb.org/t/p/w500/' + data.poster_path
                            }}
                        ></Image>
                        <View style={styles.movieInfo}>
                            <Text style={styles.title}>{data.title}</Text>
                            {data.title !== data.original_title && (
                                <Text style={styles.originalTitle}>{data.original_title}</Text>)}
                        </View>
                        <View style={styles.otherInfo}>
                            <View style={styles.otherData}>
                                <List.Icon icon={"clock-time-eight-outline"} color={"grey"}
                                           style={styles.otherData.font}></List.Icon>
                                <Text style={styles.otherData.font}>{data.runtime} min</Text>
                            </View>
                            <View style={styles.otherData}>
                                <List.Icon icon={"account"} color={"grey"}
                                           style={styles.otherData.font}></List.Icon>
                                <Text style={styles.otherData.font}>{data.actors.join(', ')}</Text>
                            </View>
                            <View style={styles.otherData}>
                                <List.Icon icon={"movie-open"} color={"grey"}
                                           style={styles.otherData.font}></List.Icon>
                                <Text style={styles.otherData.font}>{data.directors.join(', ')}</Text>
                            </View>
                        </View>
                        <FlatList style={styles.providers}
                                  data={data.providers.filter(p => p.flatrate?.length > 0)}
                                  renderItem={renderProvider}></FlatList>
                    </View>
                )}
                <FAB
                    icon="delete"
                    style={styles.fab}
                    onPress={showDialog}
                />
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">Êtes-vous sûr de vouloir supprimer ?</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button title={"cancel"} onPress={hideDialog}>Annuler</Button>
                            <Button title={"delete"} onPress={dispatchDelete}>Supprimer</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
    )
};

export default MoviePage;