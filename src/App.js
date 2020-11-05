import React, { Component } from 'react';
import { Route, Redirect, Switch } from  'react-router-dom';
import { connect } from 'react-redux'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Authentication from './containers/Authentication/Authentication'
import Profile from './containers/Profile/Profile'
import { autoCheckAuth } from './store/actions/auth'

class App extends Component {

  componentDidMount = () => {
    this.props.autoSignIn() //to stay logged-in whenever we reload any page and we have a valid token
  }
  
  render(){
    let routes = (
      <Switch>
        <Route path='/burger-builder' component={BurgerBuilder}/>
        <Route path='/authentication' component={Authentication}/>
        <Redirect from='/' to='/burger-builder'/>
        <Redirect to='/' /> {/* for any unknown routes */}
      </Switch>)

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/burger-builder' component={BurgerBuilder}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/profile' component={Profile}/>
          <Redirect from='/' to='/burger-builder'/>
          <Redirect to='/' /> {/* for any unknown routes */}
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  autoSignIn : () => dispatch(autoCheckAuth())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
