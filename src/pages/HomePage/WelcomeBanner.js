import React from 'react';
import NAPGLogo from '../../assets/images/napg-logo.png';

const WelcomeBanner = () => {

    return <>
        <div className="welcome-banner content-container">
            <img className="logo" src={NAPGLogo} alt="napg logo" />

            <div className="motto">
                Приемна грижа спасява детството и създава личности.
            </div>
        </div>
    </>;

}

export default WelcomeBanner;