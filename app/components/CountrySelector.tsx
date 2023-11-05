import React from "react";
import {useDispatch} from "react-redux";
import {countryUpdate} from "../redux/slices/CountrySlice";
import {FlatList, FlatListProps, Platform, Text, TouchableNativeFeedback, View} from "react-native";
import {Searchbar} from "react-native-paper";
import {countries} from "../domain/Countries";
import CountryFlag from "react-native-country-flag";

const styles = {
    container: {
        // flexDirection: "row"
        flex: 1
    },
    countryList: {
        flex: 1,
        marginTop: 10
    },
    item: {
        flexDirection: "row",
        marginBottom: 5
    },
    text: {
        marginLeft: 5,
        fontStyle: "italic"
    }
}
const CountrySelector = (props: {closeModal: Function}) => {
    const [query, setQuery] = React.useState('');
    const [countryList, setCountryList] = React.useState(countries)

    const dispatch = useDispatch();
    const dispatchCountry = (code: string) => {
        dispatch(countryUpdate(code));
        props.closeModal();
    }

    // const countryList = countries;

    const searchText = (searchedText: string) => {
        setQuery(searchedText);
        setCountryList([...countries.filter(c => c.country.startsWith(searchedText))]);
    };

    const renderMovie = (item: FlatListProps<any>) => {
        const country = item.item;
        return (
            <TouchableNativeFeedback
                onPress={() => dispatchCountry(country.code)}
                background={
                    Platform.OS === 'android'
                        ? TouchableNativeFeedback.SelectableBackground()
                        : undefined
                }>
                <View style={styles.item}>
                    <CountryFlag isoCode={country.code} size={20}></CountryFlag>
                    <Text style={styles.text}>{country.country}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <View style={styles.container}>
            <Searchbar
                onChangeText={searchText}
                value={query}
                placeholder="Search movie"></Searchbar>

            <FlatList data={countryList} renderItem={renderMovie} style={styles.countryList}></FlatList>
        </View>
    )
}

export default CountrySelector;