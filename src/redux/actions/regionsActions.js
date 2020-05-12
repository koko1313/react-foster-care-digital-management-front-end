import types from '../action-types';
import networkClient from '../../network/network-client';

export function loadRegions() {
    return (dispatch) => {
        return networkClient.get('/region/all', null, 
            (regions) => {
                if(regions.length === 0) return; // return null when there are no regions in database, otherwise it will cause infinite loop
                dispatch(setRegions(regions));
            }
        );
    };
}

function setRegions(regions) {
    return {type: types.SET_REGIONS, payload: regions};
}