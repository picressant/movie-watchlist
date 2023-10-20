import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type MovieState = { movieIds: number[] };

const movieSlice = createSlice({
    name: 'movies',
    initialState: {movieIds: []} as MovieState,
    reducers: {
        movieAdded(state: MovieState, action: PayloadAction<number>) {
            state.movieIds = [...state.movieIds, action.payload]
        },
        movieRemoved(state: MovieState, action: PayloadAction<number>) {
            state.movieIds = [...state.movieIds.filter(id => id !== action.payload)]
        }
    }
});

export const {movieAdded, movieRemoved} = movieSlice.actions
export default movieSlice.reducer