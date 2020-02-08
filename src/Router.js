import React, { useEffect, useState } from 'react';
import {
    HashRouter,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import actions from "./redux/actions";
import networkClient from './network/network-client';
  
import Header from './components/Layout/Header';
import role from './roles';
import { objectIsEmpty, userHasRole } from './helpers';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChildrenListPage from './pages/Children/ChildrenListPage';
import FamiliesListPage from './pages/Family/FamiliesListPage';
import FamiliesFormPage from './pages/Family/FormPage';
import Logout from './components/Session/Logout';
import EmployeeOEPGFormPage from './pages/User/EmployeeOEPG/FormPage';
import EmployeeOEPGListPage from './pages/User/EmployeeOEPG/ListPage';
import ManageUsersPage from './pages/User/ManageUsersPage';
import Loader from './components/base-components/Loader';

const Router = () => {

    const Layout = props => (
        <>
            <Header/>
            <div className="container mt-5">
                {props.children}
            </div>
        </>
    );

    const dispatch = useDispatch();
    const [checkedForLoggedUser, setCheckedForLoggedUser] = useState(false);

    useEffect(() => {
        // check if there is logged user
        networkClient.get("/user/logged", null, (loggedUser) => {
            dispatch(actions.setLoggedUser(loggedUser));
        })
        .finally(() => {
            setCheckedForLoggedUser(true);
        });
    }, [dispatch]);

    const loggedUser = useSelector(state => state.loggedUser);

    const routes = [
        {
            path: '/',
            exact: true,
            roles: [role.ALL],
            main: () => <Layout>
                <HomePage />
            </Layout>
        },
        {
            path: '/user/profile',
            exact: true,
            roles: [role.LOGGED],
            main: () => <Layout>
                Тук ще има профил страница
            </Layout>
        },
        {
            path: '/login',
            exact: true,
            roles: [role.GUEST],
            main: () => <Layout>
                <LoginPage />
            </Layout>
        },
        {
            path: '/logout',
            exact: true,
            roles: [role.LOGGED],
            main: () => <Layout>
                <Logout />
            </Layout>
        },
        {
            path: '/user-manager',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <ManageUsersPage />
            </Layout>
        },
        {
            path: '/employee-oepg/register',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <EmployeeOEPGFormPage />
            </Layout>
        },
        {
            path: '/employee-oepg/edit/:id',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <EmployeeOEPGFormPage />
            </Layout>
        },
        {
            path: '/employee-oepg/all',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <EmployeeOEPGListPage />
            </Layout>
        },
        {
            path: '/children',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <ChildrenListPage />
            </Layout>
        },
        {
            path: '/family/all',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <FamiliesListPage />
            </Layout>
        },
        {
            path: '/family/register',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <FamiliesFormPage />
            </Layout>
        },
        {
            path: '/family/edit/:id',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <FamiliesFormPage />
            </Layout>
        },
        // path if non of above are reached
        { path: '*' },
    ];

    const getRoutes = () => {
        if(!checkedForLoggedUser) {
            return <Loader loading={true} fullScreen={true} />;
        }

        return routes.map((route, index) => {
            if(route.path === '*') {
                return <Redirect key={index} to='/' />;
            }
            // all roles
            else if(route.roles.includes(role.ALL)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            // role logged
            else if(route.roles.includes(role.LOGGED) && !objectIsEmpty(loggedUser)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            // role guest
            else if(route.roles.includes(role.GUEST) && objectIsEmpty(loggedUser)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            // role admin
            else if(route.roles.includes(role.ADMIN) && !objectIsEmpty(loggedUser) && userHasRole(loggedUser, role.ADMIN)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            // role OEPG
            else if(route.roles.includes(role.OEPG) && !objectIsEmpty(loggedUser) && userHasRole(loggedUser, role.OEPG)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            else {
                return null;
            }
        });
    }

    return (
        <HashRouter>
            <Switch>
                {getRoutes()}
            </Switch>
        </HashRouter>
    )

}

export default Router;