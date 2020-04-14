import * as errorActions from './errorActions';
import * as alertActions from './alertActions';
import * as regionsActions from './regionsActions';
import * as subRegionsActions from './subRegionsActions';
import * as cities from './cities';
import * as employeeOEPGActions from './employeeOEPGActions';
import * as familiesActions from './family/families';
import * as currentFamilyActions from './family/currentFamily';
import * as childrenActions from './childrenActions';
import * as userSessionActions from './userSessionActions';


export default Object.assign(
    errorActions, 
    alertActions,
    regionsActions,
    subRegionsActions,
    cities,
    employeeOEPGActions, 
    familiesActions,
    currentFamilyActions,
    childrenActions,
    userSessionActions
);