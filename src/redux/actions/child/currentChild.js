import types from '../../action-types';
import networkClient from '../../../network/network-client';

export function loadCurrentChild(id) {
    return (dispatch) => {
        return networkClient.get(`/child/${id}`, null, 
            (child) => {
                dispatch(setCurrentChildInRedux(child));
            }
        );
    }
}

export function setCurrentChildInRedux(child) {
    return {type: types.SET_CURRENT_CHILD, payload: child};
}