import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers ({
    burger : burgerBuilderReducer,
    orders : orderReducer
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app , document.getElementById('root'));
registerServiceWorker();
