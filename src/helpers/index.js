import rolesLabels from "../rolesLabels";

/**
 * Check if object is empty {}
 * @param {Object} object 
 */
export function objectIsEmpty(object) {
    // ECMA SCRIPT 6 - just one line
    // return Object.entries(object).length === 0;

    // whitout using ECMA SCRIPT 6 - all below
    if (object == null) return true;
    if (object.length > 0)    return false;
    if (object.length === 0)  return true;
    if (typeof object !== "object") return true;
    for (var key in object) {
        if (hasOwnProperty.call(object, key)) return false;
    }
    return true;
}


/**
 * Check if user has a role
 * @param {JSON object} user Example: {roles: {id: 1, name: ROLE_ADMIN} }
 * @param {String} roleAsString 
 */
export function userHasRole(user, roleAsString) {
    let userHasRole = false;

    user.roles.forEach(role => {
        if(role.name === roleAsString) {
            userHasRole = true;
        }
    });

    return userHasRole;
}


/**
 * Check if object has role
 * @param {Object} route Example: { roles: [role.GUEST] }
 * @param {String} role 
 */
export function objectHasRole(route, role) {
    // return route.roles.includes(role); // ECMA SCRIPT 6
    return route.roles.indexOf(role) !== -1; // whitout using ECMA SCRIPT 6
}


/**
 * Returns user roles labels. Example: ["Служител ОЕПГ"]
 * @param {Array} userRoles 
 */
export function getUserRolesLabels(userRoles) {
    const roles = [];
    
    userRoles.forEach(role => {
        roles.push(rolesLabels.get(role.name));
    });

    return roles;
}