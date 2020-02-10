import {combineReducers} from "redux";

import * as alert from './alert';
import * as loggedUser from './loggedUser';
import * as employeesOEPG from "./employeesOEPG";
import * as families from './families';



export default combineReducers(Object.assign(
    alert,
    loggedUser, 
    employeesOEPG, 
    families
));