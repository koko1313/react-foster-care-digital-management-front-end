export const SET_CITIES = 'SET_CITIES';

export interface ICity {
    id: number;
    name: string;
}

interface ISetCity {
    type: typeof SET_CITIES;
    payload: ICity[];
}

export type CityActionTypes = ISetCity;