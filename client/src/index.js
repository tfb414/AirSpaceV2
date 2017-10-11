import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware} from 'redux';
import reducers from './reducers/rootReducers';
import reduxPromise from 'redux-promise';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers,
    compose(applyMiddleware(reduxPromise)));
    
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// registerServiceWorker();
