import {combineReducers} from "redux";

import * as alert from './alert';
import * as regions from './regions';
import * as subRegions from './subRegions';
import * as cities from './cities';
import * as loggedUser from './loggedUser';
import * as employeesOEPG from "./employeesOEPG";
import * as families from './families';
import * as children from './children';



export default combineReducers(Object.assign(
    alert,
    regions,
    subRegions,
    cities,
    loggedUser, 
    employeesOEPG, 
    families,
    children
));