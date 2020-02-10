import * as errorActions from './errorActions';
import * as alertActions from './alertActions';
import * as employeeOEPGActions from './employeeOEPGActions';
import * as familiesActions from './familiesActions';
import * as userSessionActions from './userSessionActions';


export default Object.assign(
    errorActions, 
    alertActions,
    employeeOEPGActions, 
    familiesActions, 
    userSessionActions
);