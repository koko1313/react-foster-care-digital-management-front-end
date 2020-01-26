import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Footer from './components/Layout/Footer';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
