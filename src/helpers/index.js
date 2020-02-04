/**
 * Check if object is empty {}
 * @param {Object} object 
 */
export function objectIsEmpty(object) {
    return Object.entries(object).length === 0;
}

export function userHasRole(user, roleAsString) {
    let userHasRole = false;

    user.roles.forEach(role => {
        if(role.name === roleAsString) {
            userHasRole = true;
        }
    });

    return userHasRole;
}