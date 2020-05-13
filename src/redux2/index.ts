import { combineReducers } from 'redux';
import { alertReducer } from './alert/reducers';

const rootReducer = combineReducers({
    alert: alertReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;