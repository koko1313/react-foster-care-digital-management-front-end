import { RegionActionTypes, IRegion, SET_REGIONS } from "./types";

export const regionsReducer = (state = [], action: RegionActionTypes): IRegion[] => {
    switch (action.type) {
        case SET_REGIONS: {
            return [...action.payload];
        }
        default: return state;
    }
}