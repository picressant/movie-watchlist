import {combineReducers, createStore} from 'redux';
import movieReducer from "../reducers/movieReducer";

const rootReducer = combineReducers(
    {count: movieReducer}
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;