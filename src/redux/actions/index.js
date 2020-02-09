import * as errorActions from './errorActions';
import * as childrenAction from './childrenActions';
import * as employeeOEPGActions from './employeeOEPGActions';
import * as familiesActions from './familiesActions';
import * as userSessionActions from './userSessionActions';


export default Object.assign(errorActions, childrenAction, employeeOEPGActions, familiesActions, userSessionActions);