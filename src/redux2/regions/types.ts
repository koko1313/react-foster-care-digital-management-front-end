export const SET_REGIONS = 'SET_REGIONS';

export interface IRegion {
    id: number;
    name: string;
}

interface ISetRegion {
    type: typeof SET_REGIONS;
    payload: IRegion[];
}

export type RegionActionTypes = ISetRegion;