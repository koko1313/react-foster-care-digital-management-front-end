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
  
import Layout from './components/Layout';
import role from './roles';
import { objectIsEmpty, userHasRole, objectHasRole } from './helpers';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Logout from './components/Session/Logout';

import ChildrenListPage from './pages/Children/ListPage';
import ChildrenFormPage from './pages/Children/FormPage';
import ChildDetailsPage from './pages/Children/DetailsPage'

import FamiliesListPage from './pages/Family/ListPage';
import FamiliesFormPage from './pages/Family/FormPage';
import FamilyDetailsPage from './pages/Family/DetailsPage';

import EmployeeOEPGFormPage from './pages/User/EmployeeOEPG/FormPage';
import EmployeeOEPGListPage from './pages/User/EmployeeOEPG/ListPage';

import ManageUsersPage from './pages/User/ManageUsersPage';
import Loader from './components/base-components/Loader';
import DocumentPage from './pages/Family/DocumentPage';

const Router = () => {

    const dispatch = useDispatch();
    const [checkedForLoggedUser, setCheckedForLoggedUser] = useState(false);

    useEffect(() => {
        // check if there is logged user
        networkClient.get("/user/logged", null, 
            (loggedUser) => {
                dispatch(actions.setLoggedUser(loggedUser));
                setCheckedForLoggedUser(true);
            },
            () => {
                setCheckedForLoggedUser(true);
            }
        );
        // eslint-disable-next-line
    }, []);

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
            path: '/employee-oepg/all',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <EmployeeOEPGListPage />
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
            path: '/employee-oepg/edit',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <EmployeeOEPGFormPage />
            </Layout>
        },

        {
            path: '/child/all',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <ChildrenListPage />
            </Layout>
        },
        {
            path: '/child/register',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <ChildrenFormPage />
            </Layout>
        },
        {
            path: '/child/edit/:id',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <ChildrenFormPage isEditing={true} />
            </Layout>
        },
        {
            path: '/child/details/:id',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <ChildDetailsPage />
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
                <FamiliesFormPage isEditing={true} />
            </Layout>
        },
        {
            path: '/family/details/:id',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <FamilyDetailsPage />
            </Layout>
        },
        {
            path: '/family/document/:document/:id',
            exact: true,
            roles: [role.OEPG],
            main: () => <Layout>
                <DocumentPage />
            </Layout>
        },
        
        // path if non of above are reached
        { path: '*' },
    ];

    const getRoutes = () => {
        if(!checkedForLoggedUser) {
            return <Loader loading={true} fullScreen={true} />;
        }
        if(!routes) return;

        return routes.map((route, index) => {
            if(route.path === '*') {
                return <Redirect key={index} to='/' />;
            }
            // all roles
            else if(objectHasRole(route, role.ALL)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            // role logged
            else if(objectHasRole(route, role.LOGGED) && !objectIsEmpty(loggedUser)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            // role guest
            else if(objectHasRole(route, role.GUEST) && objectIsEmpty(loggedUser)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            // role admin
            else if(objectHasRole(route, role.ADMIN) && !objectIsEmpty(loggedUser) && userHasRole(loggedUser, role.ADMIN)) {
                return <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>;
            }
            // role OEPG
            else if(objectHasRole(route, role.OEPG) && !objectIsEmpty(loggedUser) && userHasRole(loggedUser, role.OEPG)) {
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