import AsyncStorage from "@react-native-community/async-storage";
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import movieReducer from "../slices/MovieSlice";
import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "../slices/MovieSlice";

const rootReducer = combineReducers({
    movies: movieReducer,
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["example"],
};


// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export { store, persistor };