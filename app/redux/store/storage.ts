import AsyncStorage from "@react-native-community/async-storage";
import {combineReducers} from "redux";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";

import moviesReducer from "../slices/MovieSlice";
import {configureStore} from "@reduxjs/toolkit";


// @ts-ignore
const rootReducer = combineReducers({
    movies: moviesReducer,
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage
};


// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
// const store = createStore(persistedReducer);

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

export {store, persistor};