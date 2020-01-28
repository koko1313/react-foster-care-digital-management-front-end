import React from 'react';

import { useSelector } from 'react-redux';

const HomePage = () => {

    const loggedUser = useSelector(state => state.loggedUser);
    
    return <>
        email: {loggedUser.email}<br />
        роли: {loggedUser.roles}
        {console.log(loggedUser)}
    </>;
}

export default HomePage;