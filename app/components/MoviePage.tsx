import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ImageBackground, StyleSheet, View} from 'react-native';
// @ts-ignore
import {API_KEY} from '@env'
import {fetchMovie, Movie} from "../domain/Movie";

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
        opacity: 1
    },
    backgroundImg: {
        height: 150,
        opacity: 0.75
    },
});

const MoviePage = ({route, navigation}) => {
    const [data, setData] = useState<Movie>();
    const [loading, setLoading] = useState(true);

    const {id, watchLang} = route.params;

    const fetchData = async () => {
        const movie = await fetchMovie(id, watchLang);
        setData(movie);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator/>}
            {data && (
                <ImageBackground source={{
                    uri: 'https://image.tmdb.org/t/p/w500/' + data.backdrop_path
                }} style={styles.backgroundImg}>
                    <Image
                        style={styles.poster}
                        source={{
                            uri: 'https://image.tmdb.org/t/p/w500/' + data.poster_path
                        }}
                    ></Image>
                </ImageBackground>
            )}
        </View>
    )
};

export default MoviePage;