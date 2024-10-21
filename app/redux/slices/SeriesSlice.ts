import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type SeriesState = { seriesIds: number[] };

const seriesSlice = createSlice({
    name: 'seriess',
    initialState: {seriesIds: []} as SeriesState,
    reducers: {
        seriesAdded(state: SeriesState, action: PayloadAction<number>) {
            state.seriesIds = [...state.seriesIds, action.payload]
        },
        seriesRemoved(state: SeriesState, action: PayloadAction<number>) {
            state.seriesIds = [...state.seriesIds.filter(id => id !== action.payload)]
        }
    }
});

export const {seriesAdded, seriesRemoved} = seriesSlice.actions
export default seriesSlice.reducer