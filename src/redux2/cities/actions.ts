import { ICity, CityActionTypes, SET_CITIES } from "./types";

export const setCities = (cities: ICity[]): CityActionTypes => {
    return {type: SET_CITIES, payload: cities};
}