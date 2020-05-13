import { IRegion, RegionActionTypes, SET_REGIONS } from "./types";

export const setRegions = (regions: IRegion[]): RegionActionTypes => {
    return {type: SET_REGIONS, payload: regions};
}