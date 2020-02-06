import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "./redux/actions";
import networkClient from './network/network-client';
  
import Header from './components/Layout/Header';
import role from './roles';
import { objectIsEmpty, userHasRole } from './helpers';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChildrenListPage from './pages/OEPG/ChildrenListPage';
import Logout from './components/User/UserSession/Logout';
import RegisterUserPage from './pages/Admin/RegisterUserPage';
import AdminPage from './pages/Admin/AdminPage';
import UsersListPage from './pages/Admin/UsersListPage';

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

    useEffect(() => {
        // check if there is logged user
        networkClient.get("/user/logged", null, (loggedUser) => {
            dispatch(actions.setLoggedUser(loggedUser));
        });
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
            path: '/profile',
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
            path: '/admin-panel',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <AdminPage />
            </Layout>
        },
        {
            path: '/user/register',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <RegisterUserPage />
            </Layout>
        },
        {
            path: '/user/edit/:id',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <RegisterUserPage />
            </Layout>
        },
        {
            path: '/user/all',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <UsersListPage />
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
        // path if non of above are reached
        { path: '*' },
    ];
    
    const getRoutes = () => {
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
        <BrowserRouter>
            <Switch>
                {getRoutes()}
            </Switch>
        </BrowserRouter>
    )

}

export default Router;