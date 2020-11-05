import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = { showSideDrawer: false }

    closeSideDrawer = () => {
        this.setState( {showSideDrawer: false} );
    }

    toggleSideDrawer = () => {
        this.setState( (prevState) => {
            return  {showSideDrawer: !prevState.previousShowState}
        } );
    }

    render() {
        return (
            <Aux>
                <Toolbar clickMenu={this.toggleSideDrawer} auth={this.props.isAuthenticated} />
                <SideDrawer 
                    auth={this.props.isAuthenticated}
                    show={this.state.showSideDrawer}
                    closeSideDrawer={this.closeSideDrawer}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Layout);