import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type CountryState = { countryCode: string };

const countrySlice = createSlice({
    name: 'country',
    initialState: {countryCode: "FR"} as CountryState,
    reducers: {
        countryUpdate(state: CountryState, action: PayloadAction<string>) {
            state.countryCode = action.payload
        }
    }
});

export const {countryUpdate} = countrySlice.actions
export default countrySlice.reducer