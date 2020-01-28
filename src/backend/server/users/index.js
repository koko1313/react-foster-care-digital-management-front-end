// import hardcored data
import users from '../../hardcored_data/users.json';

// function, simulating login on server
export const login = (email, password) => {
    let authenticatedUser = {};

    users.forEach(user => {
        if(user.email === email && user.password === password) {
            authenticatedUser = user;
        }
    });

    return authenticatedUser;
} 