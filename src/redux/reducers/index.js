import {combineReducers} from "redux";

import * as loggedUser from './loggedUser';
import * as children from "./children";
import * as employeesOEPG from "./employeesOEPG";
import * as families from './families';



export default combineReducers(Object.assign(
    loggedUser, 
    children, 
    employeesOEPG, 
    families
));