import types from '../../action-types';
import networkClient from '../../../network/network-client';

function setCurrentChildLoading() {
    return {type: types.SET_CURRENT_CHILD_LOADING};
}

function removeCurrentChildLoading() {
    return {type: types.REMOVE_CURRENT_CHILD_LOADING};
}

export function loadCurrentChild(id) {
    return (dispatch) => {
        dispatch(setCurrentChildLoading());
        
        return networkClient.get(`/child/${id}`, null, 
            (child) => {
                dispatch(setCurrentChildInRedux(child));
            }
        ).finally(() => {
            dispatch(removeCurrentChildLoading());
        });
    }
}
export function setCurrentChildInRedux(child) {
    return {type: types.SET_CURRENT_CHILD, payload: child};
}