import {MOVIE_ADD, MOVIE_REMOVE} from "../constants";

export const addMovie = (movieId: number) => {
    return {
        type: MOVIE_ADD,
        payload: movieId
    };
};

export const removeMovie = (movieId: number) => {
    return {
        type: MOVIE_REMOVE,
        payload: movieId
    };
};