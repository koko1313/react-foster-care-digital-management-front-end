export const SET_SUB_REGIONS = 'SET_SUB_REGIONS';

export interface ISubRegion {
    id: number;
    name: string;
}

interface ISetSubRegion {
    type: typeof SET_SUB_REGIONS;
    payload: ISubRegion[];
}

export type SubRegionActionTypes = ISetSubRegion;