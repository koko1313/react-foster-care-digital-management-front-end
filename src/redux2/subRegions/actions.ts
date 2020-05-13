import { ISubRegion, SubRegionActionTypes, SET_SUB_REGIONS } from "./types";

export const setSubRegions = (regions: ISubRegion[]): SubRegionActionTypes => {
    return {type: SET_SUB_REGIONS, payload: regions};
}