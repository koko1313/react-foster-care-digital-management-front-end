import { SubRegionActionTypes, ISubRegion, SET_SUB_REGIONS } from "./types";

export const subRegionsReducer = (state = [], action: SubRegionActionTypes): ISubRegion[] => {
    switch (action.type) {
        case SET_SUB_REGIONS: {
            return [...action.payload];
        }
        default: return state;
    }
}