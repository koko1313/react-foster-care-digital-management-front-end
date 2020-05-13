export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER';

interface IRole {
    id: number;
    name: string;
}

interface ICity {
    id: number;
    name: string;
}

export interface ILoggedUser {
    id: number;
    firtst_name: string;
    second_name: string;
    last_name: string;
    email: string;
    address: string;
    city: ICity;
    region: ICity;
    subRegion: ICity;
    roles: [IRole];
    position: {
        id: number;
        name: string;
        role: [IRole];
    };
    // education, work, phone, gender, employment_type, birth_date, citizenship, egn
}

interface ISetLoggedUser {
    type: typeof SET_LOGGED_USER;
    payload: ILoggedUser;
}

interface IRemoveLoggedUser {
    type: typeof REMOVE_LOGGED_USER;
}

export type LoggedUserActionTypes = ISetLoggedUser | IRemoveLoggedUser;