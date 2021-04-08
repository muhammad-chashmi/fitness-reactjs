import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/bootstrap-rtl.min.css";
import "./assets/css/bootstrap.min.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import foodBuilderReducer from './store/reducers/foodBuilder'
import authReducer from './store/reducers/auth'
import signupReducer from './store/reducers/signup'
import userListReducer from './store/reducers/userlist'
import createCategoryReducer from './store/reducers/createCategory'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    foodBuilder: foodBuilderReducer,
    auth: authReducer,
    signup: signupReducer,
    userlist: userListReducer,
    createCategory: createCategoryReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
