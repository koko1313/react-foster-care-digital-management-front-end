export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export interface IAlert {
    title: string;
    message: string;
}

interface ISetAlert {
    type: typeof SET_ALERT;
    payload: IAlert;
}

interface IRemoveAlert {
    type: typeof REMOVE_ALERT;
}

export type AlertActionTypes = ISetAlert | IRemoveAlert;