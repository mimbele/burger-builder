import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch } from  'react-router-dom';
import { connect } from 'react-redux'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { autoCheckAuth } from './store/actions/auth'
import Spinner from './components/UI/Spinner/Spinner'

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Authentication = React.lazy(() => import('./containers/Authentication/Authentication'))
const Profile = React.lazy(() => import('./containers/Profile/Profile'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))

class App extends Component {

  componentDidMount = () => {
    this.props.autoSignIn() //to stay logged-in whenever we reload any page and we have a valid token
  }

  withSuspense = (component) => {
    return (
      () => (
        <Suspense fallback={<Spinner />}>
          {component}
        </Suspense>
      )
    )
  }
  
  render(){
    let routes = (
      <Switch>
        <Route path='/burger-builder' component={BurgerBuilder}/>
        <Route path='/authentication' render={this.withSuspense(<Authentication/>)}/>
        <Redirect from='/' to='/burger-builder'/>
        <Redirect to='/' /> {/* for any unknown routes */}
      </Switch>)

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/burger-builder' component={BurgerBuilder}/>
          <Route path='/checkout' render={this.withSuspense(<Checkout/>)}/>
          <Route path='/orders' render={this.withSuspense(<Orders/>)}/>
          <Route path='/profile' render={this.withSuspense(<Profile/>)}/>
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
