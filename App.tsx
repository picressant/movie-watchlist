import React from "react";
import {MD3LightTheme, PaperProvider} from "react-native-paper";
import {Provider} from "react-redux";
import {persistor, store} from "./app/redux/store/storage";
import {PersistGate} from 'redux-persist/integration/react';
import Main from './app/components/Main';


const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#b99369',
        secondary: '#f1e3d4',
        background: '#FFFFFF',
        primaryContainer: '#f3e7db',
        elevation: {
            level3: '#f1e7e7'
        }
    },
};

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Main></Main>
                </PersistGate>
            </Provider>
        </PaperProvider>
    );
}
