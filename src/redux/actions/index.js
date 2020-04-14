import * as errorActions from './errorActions';
import * as alertActions from './alertActions';
import * as regionsActions from './regionsActions';
import * as subRegionsActions from './subRegionsActions';
import * as cities from './cities';

import * as employeesOEPGActions from './employeeOEPG/employeesOEPG';
import * as currentEmployeeActions from './employeeOEPG/currentEmployeeOEPG';

import * as familiesActions from './family/families';
import * as currentFamilyActions from './family/currentFamily';

import * as childrenActions from './child/children';
import * as currentChildActions from './child/currentChild';

import * as userSessionActions from './userSessionActions';


export default Object.assign(
    errorActions, 
    alertActions,
    regionsActions,
    subRegionsActions,
    cities,

    employeesOEPGActions, 
    currentEmployeeActions,

    familiesActions,
    currentFamilyActions,

    childrenActions,
    currentChildActions,

    userSessionActions
);