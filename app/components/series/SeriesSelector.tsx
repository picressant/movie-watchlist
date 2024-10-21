import React, {useCallback, useState} from "react";
import {
    ActivityIndicator,
    FlatList,
    FlatListProps,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View
} from "react-native";
import {debounce} from 'lodash';
// @ts-ignore
import {API_KEY} from '@env'
import {Searchbar} from "react-native-paper";
import {useDispatch} from "react-redux";
import {seriesAdded} from "../../redux/slices/SeriesSlice";

type Series = {
    id: number;
    poster_path: string;
    name: string;
    original_name: string;
    number_of_seasons: number;
}

const styles = StyleSheet.create({
        searchContainer: {
            flex: 1,
            flexDirection: "column",
            width: '100%',
            marginVertical: 5,
            marginTop: 10
        },
        searchBar: {},
        seriesContainer: {
            flex: 1
        },
        seriesCard: {
            flex: 1,
            flexDirection: "row",
            padding: 5,
            width: '100%',
            marginVertical: 5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.32,
            shadowRadius: 2.46,

            elevation: 1,

            backgroundColor: 'white',
            borderRadius: 8,
        },
        foundSeriess: {
            flex: 1,
            marginHorizontal: 5
        },
        loader: {
            justifyContent: "center",
            flex: 1,
            alignItems: "center"
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

const SeriesSelector = ({navigation: {goBack}}) => {
    const [series, setSeries] = useState<Series[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = React.useState('');

    const debouncedSave = useCallback(
        debounce(nextValue => fetchData(nextValue), 1000),
        [], // will be created only once initially
    );

    const searchText = (searchedText: string) => {
        setQuery(searchedText);
        debouncedSave.cancel();

        if (searchedText === "") {
            setSeries([]);
        } else {
            setLoading(true);
            debouncedSave(searchedText);
        }
    };

    const fetchData = async (search: string) => {
        const resp = await fetch("https://api.themoviedb.org/3/search/tv?api_key=" + API_KEY + "&language=fr-FR&query=" + search);
        const data = await resp.json();
        setSeries(data.results);
        setLoading(false);
    };

    const dispatch = useDispatch();
    const dispatchNewSeries = (seriesId: number) => {
        dispatch(seriesAdded(seriesId));
        goBack();
    }

    const renderSeries = (item: FlatListProps<Series>) => {
        const series = item.item as Series;
        return (
            <TouchableNativeFeedback
                style={styles.seriesContainer}
                onPress={() => dispatchNewSeries(series.id)}
                background={
                    Platform.OS === 'android'
                        ? TouchableNativeFeedback.SelectableBackground()
                        : undefined
                }>
                <View style={styles.seriesCard}>
                    <Image
                        style={styles.poster}
                        source={{
                            uri: 'https://image.tmdb.org/t/p/w500/' + series.poster_path
                        }}
                    ></Image>
                    <View>
                        <Text style={styles.title}>{series.name}</Text>
                        {series.name !== series.original_name && (
                            <Text style={styles.originalTitle}>{series.original_name}</Text>)}
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <View style={styles.searchContainer}>
            <Searchbar
                style={styles.searchBar}
                onChangeText={searchText}
                value={query}
                placeholder="Search series">
            </Searchbar>
            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size={'large'}></ActivityIndicator>
                </View>)}
            {!loading && (
                <FlatList style={styles.foundSeriess}
                          data={series}
                          renderItem={renderSeries}
                ></FlatList>
            )}

        </View>
    )
};

export default SeriesSelector;