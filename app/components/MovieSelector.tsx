import React, {useCallback, useState} from "react";
import {FlatList, FlatListProps, Image, StyleSheet, Text, View} from "react-native";
import {debounce} from 'lodash';
// @ts-ignore
import {API_KEY} from '@env'
import {Appbar, Searchbar} from "react-native-paper";

type Movie = {
    id: number;
    poster_path: string;
    title: string;
    original_title: string;
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",

            backgroundColor: 'blue',
            width: '100%',
            margin: 5,
        },
        searchBar: {},
        movieContainer: {
            flex: 1,
            flexDirection: "row",

            backgroundColor: 'red',
            borderRadius: 8,
            padding: 5,
            width: '100%',
            margin: 5,
        },
        foundMovies: {
            flex: 1,
        },
        poster: {
            width: 50,
            height: 75,
            margin: 5,
            borderRadius: 10
        },
        title: {
            fontWeight: "bold",
            fontSize: 15
        },
        originalTitle: {
            fontStyle: "italic",
            fontSize: 10
        }
    }
);

const MovieSelector = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = React.useState('');

    const debouncedSave = useCallback(
        debounce(nextValue => fetchData(nextValue), 1000),
        [], // will be created only once initially
    );

    const searchText = (searchedText) => {
        console.log("entered text", searchedText);
        setQuery(searchedText);
        debouncedSave.cancel();

        if (searchedText === "") {
            setMovies([]);
        } else {
            setLoading(true);
            debouncedSave(searchedText);
        }
    };


    const fetchData = async (search: string) => {
        console.log("searched text " + search);
        const resp = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=fr-FR&query=" + search);
        const data = await resp.json();
        setMovies(data.results.slice(0, 3));
        console.log(movies);
        setLoading(false);
    };

    const renderMovie = (item: FlatListProps<Movie>) => {
        const movie = item.item;
        return (
            <View style={styles.movieContainer}>
                <Image
                    style={styles.poster}
                    source={{
                        uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
                    }}
                ></Image>
                <View>
                    <Text style={styles.title}>{movie.title}</Text>
                    {movie.title !== movie.original_title && (
                        <Text style={styles.originalTitle}>{movie.original_title}</Text>)}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Searchbar
                style={styles.searchBar}
                onChangeText={searchText}
                value={query}
                placeholder="Search movie">
            </Searchbar>
            <FlatList style={styles.foundMovies}
                      data={movies}
                      renderItem={renderMovie}
            ></FlatList>
        </View>
    )
};

export default MovieSelector;