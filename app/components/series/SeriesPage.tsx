// @ts-ignore
import { API_KEY } from '@env';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, FlatListProps, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { Button, Dialog, FAB, List, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeries, Seasons, Series } from '../../domain/Series';
import { seriesRemoved } from '../../redux/slices/SeriesSlice';

const stylesBox = StyleSheet.create({
        container: {
            display: 'flex',
            marginVertical: 10,
            flexDirection: 'row',

            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 5,

            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
            width: '100%',
        },
        seriesInfo: {
            flexDirection: 'column',
            flex: 1,
            padding: 5,
        },
        seriesProviders: {
            marginTop: 'auto',
            flexDirection: 'row',
        },
        poster: {
            width: 80,
            height: 125,
            borderRadius: 10,
        },
        smallPoster: {
            height: 32,
            width: 32,
            margin: 2,
            borderRadius: 2,
        },
        title: {
            fontWeight: 'bold',
            fontSize: 17,
        },
        originalTitle: {
            fontStyle: 'italic',
            fontSize: 10,
        },
        time: {
            marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center',
            color: 'grey',
            font: {
                fontSize: 10,
                marginRight: 2,
            },
        },
        loader: {
            height: 145,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 8,
            width: '100%',
            marginVertical: 10,
        },
    },
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    seriesContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginVertical: 5,
        backgroundColor: 'blue',
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 10,
        position: 'absolute',
        top: 75,
        left: 15,
        opacity: 1,
    },
    backgroundImg: {
        height: 150,
        opacity: 0.75,
    },
    seriesInfo: {
        paddingLeft: 130,
        minHeight: 75,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    originalTitle: {
        fontStyle: 'italic',
        fontSize: 10,
    },
    otherInfo: {
        margin: 15,
    },
    otherData: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'italic',
        font: {
            fontSize: 15,
            marginRight: 2,
            color: 'grey',
            fontStyle: 'italic',
        },
    },
    providers: {
        flex: 1,
    },
    provider: {
        marginLeft: 15,
        marginBottom: 5,
        flexDirection: 'row',
    },
    country: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        font: {
            fontStyle: 'italic',
            color: 'grey',
            fontSize: 12,
        },
    },
    services: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    smallPoster: {
        height: 32,
        width: 32,
        margin: 2,
        borderRadius: 2,
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export type seasonItem = {
    item: Seasons;
    series: Series;
    lang: string;
}

// @ts-ignore
const SeriesPage = ({route, navigation}) => {
    const [data, setData] = useState<Series>();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = React.useState(false);

    const countryCode: string = useSelector((state: any) => state.country.countryCode);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const {id} = route.params;

    const dispatch = useDispatch();
    const dispatchDelete = () => {
        dispatch(seriesRemoved(id));
        navigation.goBack();
    };

    const fetchData = async () => {
        const series = await fetchSeries(id, true);
        setData(series);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderSeason = (seasonProps: FlatListProps<Seasons>) => {
        const data = seasonProps.item as Seasons;
        return (
            <View>
                <TouchableNativeFeedback
                    onPress={() => navigation.navigate('Season details', {season: data})}
                    background={
                        Platform.OS === 'android'
                            ? TouchableNativeFeedback.SelectableBackground()
                            : undefined
                    }>
                    <View style={stylesBox.container}>
                        <Image
                            style={stylesBox.poster}
                            source={{
                                uri: 'https://image.tmdb.org/t/p/w500/' + data.poster_path,
                            }}
                        ></Image>
                        <View style={stylesBox.seriesInfo}>
                            <Text style={stylesBox.title}>{data.name}</Text>
                            <View style={styles.otherData}>
                                <List.Icon icon={'counter'} color={'grey'}
                                           style={styles.otherData.font}></List.Icon>
                                <Text style={styles.otherData.font}>{data.episodes.length} episodes</Text>
                            </View>
                            <View style={stylesBox.seriesProviders}>
                                {data.providers.find(p => p.lang === countryCode)?.flatrate?.map(p => <Image
                                    style={stylesBox.smallPoster}
                                    key={p.logo_path}
                                    source={{
                                        uri: 'https://image.tmdb.org/t/p/w500/' + p.logo_path,
                                    }}
                                ></Image>)}
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size={"large"} color={"#b99369"}/>
                </View>
            )}
            {data && (
                <View style={styles.container}>
                    <Image source={{
                        uri: 'https://image.tmdb.org/t/p/w500/' + data.backdrop_path,
                    }} style={styles.backgroundImg}></Image>
                    <Image
                        style={styles.poster}
                        source={{
                            uri: 'https://image.tmdb.org/t/p/w500/' + data.poster_path,
                        }}
                    ></Image>
                    <View style={styles.seriesInfo}>
                        <Text style={styles.title}>{data.name}</Text>
                        {data.name !== data.original_name && (
                            <Text style={styles.originalTitle}>{data.original_name}</Text>)}
                    </View>
                    <View style={styles.otherInfo}>
                        <View style={styles.otherData}>
                            <List.Icon icon={'counter'} color={'grey'}
                                       style={styles.otherData.font}></List.Icon>
                            <Text style={styles.otherData.font}>{data.number_of_seasons} seasons</Text>
                        </View>
                        <View style={styles.otherData}>
                            <List.Icon icon={'account'} color={'grey'}
                                       style={styles.otherData.font}></List.Icon>
                            <Text style={styles.otherData.font}>{data.actors.join(', ')}</Text>
                        </View>
                    </View>
                    <FlatList data={data.seasons} extraData={countryCode} renderItem={renderSeason}></FlatList>
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
                        <Button title={'cancel'} onPress={hideDialog}>Annuler</Button>
                        <Button title={'delete'} onPress={dispatchDelete}>Supprimer</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default SeriesPage;
