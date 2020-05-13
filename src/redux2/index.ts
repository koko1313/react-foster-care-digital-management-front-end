import { combineReducers } from 'redux';
import { alertReducer } from './alert/reducers';
import { loggedUserReducer } from './loggedUser/reducers';
import { regionsReducer } from './regions/reducers';
import { subRegionsReducer } from './subRegions/reducers';
import { citiesReducer } from './cities/reducers';

const rootReducer = combineReducers({
    alert: alertReducer,
    loggedUser: loggedUserReducer,
    regions: regionsReducer,
    subRegions: subRegionsReducer,
    cities: citiesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;