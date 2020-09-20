import React from 'react'
import styles from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'

const sideDrawer = (props) => {
    const classes = [styles.SideDrawer, props.show ? styles.Open : styles.Close].join(' ');
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closeSideDrawer}/>
            <div className={classes}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav >
                    <NavigationItems className={styles.NavigationItems}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;