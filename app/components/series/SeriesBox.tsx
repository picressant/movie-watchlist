import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {List} from 'react-native-paper';
import {fetchSeries, Series} from "../../domain/Series";

const styles = StyleSheet.create({
        container: {
            display: "flex",
            marginVertical: 10,
            flexDirection: "row",

            shadowColor: "#000",
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
            flexDirection: "column",
            flex: 1,
            padding: 5
        },
        seriesProviders: {
            marginTop: "auto",
            flexDirection: "row"
        },
        poster: {
            width: 80,
            height: 125,
            borderRadius: 10
        },
        smallPoster: {
            height: 32,
            width: 32,
            margin: 2,
            borderRadius: 2,
        },
        title: {
            fontWeight: "bold",
            fontSize: 17
        },
        originalTitle: {
            fontStyle: "italic",
            fontSize: 10
        },
        time: {
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            color: "grey",
            font: {
                fontSize: 10,
                marginRight: 2
            }
        },
        loader: {
            height: 145,
            shadowColor: "#000",
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
        }
    }
);

// @ts-ignore
const SeriesBox = ({navigation, props}) => {
    const [data, setData] = useState<Series>();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const series = await fetchSeries(props.id);
        setData(series);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View>
            {loading && <ActivityIndicator style={styles.loader}/>}
            {data && (
                <TouchableNativeFeedback
                    onPress={() => navigation.navigate("Series details", {id: data.id})}
                    background={
                        Platform.OS === 'android'
                            ? TouchableNativeFeedback.SelectableBackground()
                            : undefined
                    }>
                    <View style={styles.container}>
                        <Image
                            style={styles.poster}
                            source={{
                                uri: 'https://image.tmdb.org/t/p/w500/' + data.poster_path
                            }}
                        ></Image>
                        <View style={styles.seriesInfo}>
                            <Text style={styles.title}>{data.name}</Text>
                            {data.name !== data.original_name && (
                                <Text style={styles.originalTitle}>{data.original_name}</Text>)}
                            <View style={styles.time}>
                                <List.Icon icon={"counter"} color={"grey"}
                                           style={styles.time.font}></List.Icon>
                                <Text style={styles.time.font}>{data.number_of_seasons} seasons</Text>
                            </View>
                            <View style={styles.seriesProviders}>
                                {data.providers.find(p => p.lang === props.watchLang)?.flatrate?.map(p => <Image
                                    style={styles.smallPoster}
                                    key={p.logo_path}
                                    source={{
                                        uri: 'https://image.tmdb.org/t/p/w500/' + p.logo_path
                                    }}
                                ></Image>)}
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            )}
        </View>
    )
};

export default SeriesBox;