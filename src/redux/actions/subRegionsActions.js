import types from '../action-types';
import networkClient from '../../network/network-client';

export function loadSubRegions() {
    return (dispatch) => {
        return networkClient.get('/sub-region/all', null, 
            (subRegions) => {
                if(subRegions.length === 0) return; // return null when there are no subRegions in database, otherwise it will cause infinite loop
                dispatch(setSubRegions(subRegions));
            }
        );
    };
}

function setSubRegions(subRegions) {
    return {type: types.SET_SUB_REGIONS, payload: subRegions};
}