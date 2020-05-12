import types from '../action-types';
import networkClient from '../../network/network-client';

export function loadCities() {
    return (dispatch) => {
        return networkClient.get('/city/all', null, 
            (cities) => {
                if(cities.length === 0) return; // return null when there are no cities in database, otherwise it will cause infinite loop
                dispatch(setCities(cities));
            }
        );
    };
}

export function setCities(cities) {
    return {type: types.SET_CITIES, payload: cities};
}