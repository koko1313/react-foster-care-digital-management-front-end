import React from 'react';
import { useSelector } from 'react-redux';
import { objectIsEmpty } from '../../helpers';
import WelcomeBanner from './WelcomeBanner';
import HomepageImage from './HomepageImage';
import LoginComponent from '../../components/Session/Login';
import CallBanner from './CallBanner';
import LoggedUserDetails from '../../components/Session/LoggedUserDetails';

const HomePage = () => {

    const loggedUser = useSelector(state => state.loggedUser);

    return <>
        <div className="row">
            <div className="col">
                <WelcomeBanner />
            </div>
        </div>

        <div className="row">
            <div className="col-md order-2 order-md-1">
                <HomepageImage />
            </div>

            <div className="col-md order-1 order-md-2">
                <div className="content-container">
                    {/* Guest */}
                    {objectIsEmpty(loggedUser) && <LoginComponent />}

                    {/* Logged user */}
                    {!objectIsEmpty(loggedUser) && <LoggedUserDetails />}
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <CallBanner />
            </div>
        </div>
    </>;
}

export default HomePage;