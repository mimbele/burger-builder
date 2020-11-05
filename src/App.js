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
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/burger-builder' component={BurgerBuilder}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/authentication' component={Authentication}/>
            <Route path='/profile' component={Profile}/>
            <Redirect from='/' to='/burger-builder'/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  autoSignIn : () => dispatch(autoCheckAuth())
})

export default connect(null, mapDispatchToProps)(App)
