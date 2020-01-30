/**
 * Check if object is empty {}
 * @param {Object} object 
 */
export function objectIsEmpty(object) {
    return Object.entries(object).length === 0;
}