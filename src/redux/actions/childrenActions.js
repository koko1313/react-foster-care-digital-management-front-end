import types from '../action-types';
import networkClient from '../../network/network-client';

export function setChildren (children) {
    return {type: types.SET_CHILDREN, payload: children};
}

export const getChildren = () => async dispatch => {
    try {
        const res = await networkClient.get("/children");
        dispatch(setChildren(res));
    } catch(ex) {
       // dispatch(setError({message: 'There was an error!'}));
    }
};