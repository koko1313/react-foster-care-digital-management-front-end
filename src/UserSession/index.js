export function login(email, password) { 
    let loggedUser = {};

    const dispatch = useDispatch();

    // CALL BACKEND
    // networkClient.post("login", {email: email, password: password},
    //     // success
    //     (loggedUserFromServer) => {
    //         loggedUser = loggedUserFromServer;
    //         dispatch(actions.setLoggedUser(loggedUser));
    //     },
    // );

    // HARDCORE LOGGED USER
    loggedUser = {
        email: "admin@admin.com",
        roles: ["ROLE_ADMIN"],
    }
    dispatch(actions.setLoggedUser(loggedUser));

    return loggedUser;
}

export function logout() {
    console.log("logging out");
}