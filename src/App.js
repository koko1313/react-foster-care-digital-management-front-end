import React from 'react';

import { createStore, applyMiddleware } from "redux";
import { Provider }  from "react-redux";
import reducers from "./redux/reducers";
import thunk from 'redux-thunk';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Layout/Header';
import Login from './components/User/Login';

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
          asd
      </Layout>
  },
  {
    path: '/Login',
    exact: true,
    main: () => <Layout>
        <Login />
    </Layout>
  },
];

const getRoutes = () => {
  return routes.map((route, index) => {
      return <Route key={index} exact={route.exact} path={route.path}>
          {route.main}
      </Route>;
  });
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
