import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import {API_KEY} from '@env'

type MovieProps = {
    id: string;
};

type Movie = {
    id: number;
    poster_path: string;
    title: string;
    original_title: string;
    runtime: number;
}

const styles = StyleSheet.create({
        container: {
            display: "flex",
            marginVertical: 10,
            // flex:1,
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
        poster: {
            width: 80,
            height: 125,
            margin: 5,
            borderRadius: 10
        },
        title: {
            fontWeight: "bold",
            fontSize: 17
        },
        originalTitle: {
            fontStyle: "italic",
            fontSize: 10
        }
    }
);

const MovieBox = (props: MovieProps) => {
    const [data, setData] = useState<Movie>();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await fetch("https://api.themoviedb.org/3/movie/" + props.id + "?api_key=" + API_KEY + "&language=fr-FR");
        const data = await resp.json();
        setData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View>
            {loading && <ActivityIndicator/>}
            {data && (
                <View style={styles.container}>
                    <Image
                        style={styles.poster}
                        source={{
                            uri: 'https://image.tmdb.org/t/p/w500/' + data.poster_path
                        }}
                    ></Image>
                    <View>
                        <Text style={styles.title}>{data.title}</Text>
                        {data.title !== data.original_title && (
                            <Text style={styles.originalTitle}>{data.original_title}</Text>)}
                        <View>
                            <View>
                                <Text>Durée: {data.runtime} min</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
};

export default MovieBox;