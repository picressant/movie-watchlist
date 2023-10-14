import {MOVIE_ADD} from "../constants";


const initialState: { movieIds: number[] } = {
    movieIds: [],
};

export default (state = initialState, action: { type: string, payload: number }) => {
    switch (action.type) {
        case MOVIE_ADD:
            return {
                ...state,
                movieIds: [...state.movieIds, action.payload],
            };
        case 'COUNT_DECRESE':
            return {
                ...state,
                movieIds: [...state.movieIds.filter(id => id !== action.payload)],
            };
        default:
            return state;
    }
};