import { combineReducers } from 'redux';
import { alertReducer } from './alert/reducers';
import { loggedUserReducer } from './loggedUser/reducers';

const rootReducer = combineReducers({
    alert: alertReducer,
    loggedUser: loggedUserReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;