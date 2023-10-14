import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from '../slices/MovieSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
});