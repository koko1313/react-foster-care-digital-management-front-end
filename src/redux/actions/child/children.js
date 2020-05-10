import types from '../../action-types';
import networkClient from '../../../network/network-client';
import actions from '..';


export function loadChildren() {
    return (dispatch) => {
        return networkClient.get('/child/all', null, 
            (children) => {
                if(children.length === 0) return; // return null when there are no childrens in database, otherwise it will cause infinite loop
                dispatch(setChildrenInRedux(children));
            }
        );
    };
}

export function setChildrenInRedux(children) {
    return {type: types.SET_CHILDREN, payload: children};
}


export function addChild(child) {
    return (dispatch) => {
        return networkClient.post("/child/register", child,
            (registeredChild) => {
                dispatch(addChildInRedux(registeredChild));
            }
        );
    };
}

export function addChildInRedux(child) {
    return {type: types.ADD_CHILD, payload: child};
}


export function updateChild(id, updatedChild) {
    return (dispatch) => {
        return networkClient.put(`/child/update/${id}`, updatedChild,
            (updatedChild) => {
                dispatch(updateChildInRedux(id, updatedChild));
                dispatch(actions.setCurrentChildInRedux(updatedChild)); // update the current child too
            }
        );
    };
}

export function updateChildInRedux(id, updatedChild) {
    return {type: types.UPDATE_CHILD, id: id, updatedChild: updatedChild};
}


export function deleteChild(id) {
    return (dispatch) => {
        return networkClient.delete(`/child/delete/${id}`, null, 
            () => { 
                dispatch(deleteChildFromReducer(id));
            }
        );
    }
}

export function deleteChildFromReducer(id) {
    return {type: types.DELETE_CHILD, payload: id};
}