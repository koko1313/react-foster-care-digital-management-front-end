import React from 'react';
import image from '../../assets/images/image.jpg';
import WelcomeBanner from './WelcomeBanner';
import CallBanner from './CallBanner';
import Login from '../../components/Session/Login';
import { useSelector } from 'react-redux';
import { objectIsEmpty, getUserRolesLabels } from '../../helpers';
import { useHistory } from 'react-router-dom';

const HomePage = () => {

    const loggedUser = useSelector(state => state.loggedUser);
    const history = useHistory();

    return <>
        <div className="row">
            <div className="col">
                <WelcomeBanner />
            </div>
        </div>

        <div className="row">
            <div className="col-md order-2 order-md-1">
                <div className="homepage-image content-container-p0">
                    <img className="img-fluid" src={image} alt="family-front-house" />
                    <a className="img-credit" href="http://www.freepik.com" target="_blank" rel="noopener noreferrer">Designed by brgfx / Freepik</a>
                </div>
            </div>

            <div className="col-md order-1 order-md-2">
                <div className="content-container">
                    {/* Guest */}
                    {objectIsEmpty(loggedUser) &&
                        <>
                            <h2>Вход</h2>
                            <Login />
                        </>
                    }

                    {/* Logged user */}
                    {!objectIsEmpty(loggedUser) &&
                        <>
                            <h2>Здравейте, {loggedUser.first_name}</h2>
                            <hr />
                            <p><strong>Email:</strong> {loggedUser.email}</p>
                            <p><strong>Роли:</strong> {getUserRolesLabels(loggedUser.roles).join(', ')}</p>

                            <div className="d-flex justify-content-end">
                                <button className="btn btn-danger" onClick={() => {history.push("/logout")}}>Изход</button>
                            </div>
                        </>
                    }
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