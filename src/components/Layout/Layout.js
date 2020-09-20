import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
                <Toolbar clickMenu={this.toggleSideDrawer}/>
                <SideDrawer 
                    show={this.state.showSideDrawer}
                    closeSideDrawer={this.closeSideDrawer}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;