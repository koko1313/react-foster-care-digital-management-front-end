import React from 'react';
import Alert from './components/base-components/Alert';

import { createStore, applyMiddleware } from "redux";
import { Provider }  from "react-redux";
import reducers from "./redux/reducers";
import thunk from 'redux-thunk';

import Router from './Router';

const store = createStore(reducers, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router />
      <Alert />
    </Provider>
  );
}

export default App;