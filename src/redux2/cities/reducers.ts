import { CityActionTypes, ICity, SET_CITIES } from "./types";

export const citiesReducer = (state = [], action: CityActionTypes): ICity[] => {
    switch (action.type) {
        case SET_CITIES: {
            return [...action.payload];
        }
        default: return state;
    }
}