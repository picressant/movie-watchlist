import React from "react";
import {useDispatch} from "react-redux";
import {countryUpdate} from "../redux/slices/CountrySlice";
import {Platform, Text, TouchableNativeFeedback, View} from "react-native";
import {Searchbar} from "react-native-paper";
import {countries} from "../domain/Countries";
import CountryFlag from "react-native-country-flag";

const CountrySelector = () => {
    const [query, setQuery] = React.useState('');

    const dispatch = useDispatch();
    const dispatchCountry = (code: string) => {
        dispatch(countryUpdate(code));
    }

    const countryList = countries;

    const searchText = (searchedText: string) => {
        setQuery(searchedText);
    };

    return (
        <View>
            <Searchbar
                onChangeText={setQuery}
                value={query}
                placeholder="Search movie"></Searchbar>
            {countryList.filter(c => c.country.startsWith(query)).map(country =>
                <TouchableNativeFeedback
                    onPress={() => dispatchCountry(country.code)}
                    background={
                        Platform.OS === 'android'
                            ? TouchableNativeFeedback.SelectableBackground()
                            : undefined
                    }> <CountryFlag isoCode={country.code} size={20}></CountryFlag>
                    <Text>{country.country}</Text>
                </TouchableNativeFeedback>
            )}
        </View>
    )
}

export default CountrySelector;