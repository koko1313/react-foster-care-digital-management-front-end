import React from 'react';

import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector }  from "react-redux";
import reducers from "./redux/reducers";
import thunk from 'redux-thunk';
import routeConditionTypes from './routeConditionTypes';
import { objectIsEmpty } from './helpers';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChildrenListPage from './pages/ChildrenListPage';

const store = createStore(reducers, applyMiddleware(thunk));

const Layout = props => (
  <>
    <Header/>
    <div className="container mt-5">
      {props.children}
    </div>
  </>
);

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Layout>
      <HomePage />
    </Layout>
  },
  {
    path: '/children',
    exact: true,
    //condition: routeConditionTypes.IS_AUTHENTICATED,
    main: () => <Layout>
      <ChildrenListPage />
    </Layout>
  },
  {
    path: '/login',
    exact: true,
    main: () => <Layout>
      <LoginPage />
    </Layout>
  },
  {
    path: '/protected',
    exact: true,
    condition: routeConditionTypes.IS_AUTHENTICATED,
    main: () => <Layout>
      <h1>asdasdsa</h1>
    </Layout>
  },
];

const getRoutes = () => {
  return routes.map((route, index) => {
    if(route.condition === undefined) {
      return <Route key={index} exact={route.exact} path={route.path}>
        {route.main}
      </Route>;
    } else {
      return <PrivateRoute key={index} path={route.path} condition={route.condition}>
        <h1>asdasdsa</h1>
      </PrivateRoute>
    }
  });
}

const PrivateRoute = ({ children, ...rest }) => {
  const loggedUser = useSelector(state => state.loggedUser);

  let condition;

  switch(rest.condition) {
    case routeConditionTypes.IS_AUTHENTICATED: {
      condition = !objectIsEmpty(loggedUser);
      break;
    }
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        condition ? 
          (children) 
          : 
          (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {getRoutes()}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;