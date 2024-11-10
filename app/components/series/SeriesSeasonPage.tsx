// @ts-ignore
import React, { useEffect, useState } from 'react';
import { FlatList, FlatListProps, Image, StyleSheet, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getCountry } from '../../domain/Countries';
import { WatchProvider } from '../../domain/Movie';
import { Seasons } from '../../domain/Series';


const styles = StyleSheet.create({
    container: {
        flex: 1,
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


const SeriesSeason = ({route, navigation}) => {
    const [data, setData] = useState<Seasons>();

    const countryCode: string = useSelector((state: any) => state.country.countryCode);

    const season: Seasons = route.params.season;

    useEffect(() => {
        setData(season);
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
                            uri: 'https://image.tmdb.org/t/p/w500/' + p.logo_path,
                        }}
                    ></Image>)}
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
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
                    </View>
                    <View style={styles.otherInfo}>
                        <View style={styles.otherData}>
                            <List.Icon icon={'counter'} color={'grey'}
                                       style={styles.otherData.font}></List.Icon>
                            <Text style={styles.otherData.font}>{data.episodes.length} episodes</Text>
                        </View>
                        <View style={styles.otherData}>
                            <List.Icon icon={'account'} color={'grey'}
                                       style={styles.otherData.font}></List.Icon>
                            <Text style={styles.otherData.font}>{data.actors.join(', ')}</Text>
                        </View>
                        <View style={styles.otherData}>
                            <List.Icon icon={'movie-open'} color={'grey'}
                                       style={styles.otherData.font}></List.Icon>
                            <Text style={styles.otherData.font}>{data.directors.join(', ')}</Text>
                        </View>
                    </View>
                    <FlatList data={data.providers} extraData={countryCode} renderItem={renderProvider}></FlatList>
                </View>
            )}
        </View>
    );
};

export default SeriesSeason;
