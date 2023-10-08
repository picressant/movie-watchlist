import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, FlatListProps, Image, StyleSheet, Text, TextInput, View} from "react-native";
import { debounce } from 'lodash';
// @ts-ignore
import { API_KEY } from '@env'

type Movie = {
    id: number;
    poster_path: string;
    title: string;
    original_title: string;
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        // flex:1,
        flexDirection: "row",

        backgroundColor: 'red',
        borderRadius: 8,
        padding: 5,
        width: '100%',
        margin: 5,
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
    const [text, setText] = React.useState();

    const onChangeText = debounce((enteredText: string) => {
        console.log(enteredText);
        fetchData(enteredText);
    }, 500);

    const fetchData = async (query: string) => {
        setLoading(true);
        const resp = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=fr-FR&query=" + query);
        const data = await resp.json();
        setMovies(data.results.slice(0, 3));
        console.log(movies);
        setLoading(false);
    };

    const renderMovie = (item: FlatListProps<Movie>) => {
        const movie = item.item;
        return (
            <View style={styles.container}>
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
        <View>
          <View>
              <TextInput
                  onChangeText={onChangeText}
                  value={text}
                  placeholder="Search movie">
              </TextInput>
              {movies.length > 0 &&
                  <FlatList
                      data={movies}
                      renderItem={renderMovie}
                  ></FlatList>}
          </View>
        </View>
    )
};

export default MovieSelector;