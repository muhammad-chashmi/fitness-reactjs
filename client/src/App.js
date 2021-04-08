import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import FoodBuilder from './containers/FoodBuilder/FoodBuilder'
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth'
import SignUp from './containers/Auth/Signup'
import UserList from './containers/Users/UserList'
import UserDetails from './containers/Users/UserDetails'
import CreateCategory from './containers/CreateCategory/createCategory'

import { Route, Switch } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import homePage from '../src/containers/HomePage/homePage';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/authentication" component={Auth} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" exact component={homePage} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/authentication" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/getAllUser" exact component={UserList} />
          <Route path="/userDetails/:id" exact component={UserDetails} />
          <Route path="/createCategory" exact component={CreateCategory} />

          <Route path="/" exact component={homePage} />

        </Switch>
      )
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isAuthenticated: (state.auth.token !== null)||(state.signup.token !== null)
  }
}

export default connect(mapStateToProps)(App);

//          <Route path="/" exact component={FoodBuilder} />

//        <Route path="/" exact component={FoodBuilder} />
