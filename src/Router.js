import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";

import { useSelector } from 'react-redux';
  
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChildrenListPage from './pages/ChildrenListPage';
import role from './roles';
import { objectIsEmpty } from './helpers';

const Router = () => {

    const Layout = props => (
        <>
            <Header/>
            <div className="container mt-5">
                {props.children}
            </div>
        </>
    );

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
            path: '/children',
            exact: true,
            roles: [role.ALL],
            main: () => <Layout>
                <ChildrenListPage />
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
            path: '/protected',
            exact: true,
            roles: [role.ADMIN],
            main: () => <Layout>
                <h1>asdasdsa</h1>
            </Layout>
        },
        // path if non of above are reached
        { path: '*' },
    ];
    
    const getRoutes = () => {
        return routes.map((route, index) => {
            if(route.path === '*') {
                return <Redirect to='/' />;
            }
            // all roles
            else if(route.roles.includes(role.ALL)) {
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
            else if(route.roles.includes(role.ADMIN) && !objectIsEmpty(loggedUser) && loggedUser.roles.includes(role.ADMIN)) {
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