import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';

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
    path: '/gallery',
    exact: true,
    main: () => <Layout>
        ga
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
    <Router>
      <Switch>
        {getRoutes()}
      </Switch>
    </Router>
  );
}

export default App;
