import {combineReducers} from "redux";

import * as alert from './alert';
import * as regions from './regions';
import * as subRegions from './subRegions';
import * as cities from './cities';
import * as loggedUser from './loggedUser';

import * as employeesOEPG from "./employeeOEPG/employeesOEPG";
import * as currentEmployeeOEPG from './employeeOEPG/currentEmployeeOEPG';

import * as families from './family/families';
import * as currentFamily from './family/currentFamily';

import * as children from './child/children';
import * as currentChild from './child/currentChild';


export default combineReducers(Object.assign(
    alert,
    regions,
    subRegions,
    cities,
    loggedUser, 

    employeesOEPG, 
    currentEmployeeOEPG,

    families,
    currentFamily,

    children,
    currentChild
));