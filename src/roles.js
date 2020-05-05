/**
 * ENUM values for roles. 
 * Set string values like they are in the backend, so we can use it in frontend.
 * Also add labels, so we can use them in the front-end.
 */

export default {
    // front-end roles
    ALL: 'ROLE_ALL',
    GUEST: 'ROLE_GUEST',
    LOGGED: 'ROLE_LOGGED',

    // roles from back-end
    ROLE_ADMIN: {
        role: 'ROLE_ADMIN',
        label: 'Администратор',
    },
    ROLE_OEPG: {
        role: 'ROLE_OEPG',
        label: 'Служител ОЕПГ',
    },
};