import {combineReducers} from 'redux';
import userReducer from './userReducer';
import SerieFormReducer from './SerieFormReducer';
import SeriesReducer from './SeriesReducer';

export default combineReducers({
    user: userReducer,
    serieForm: SerieFormReducer,
    series: SeriesReducer,
});