import React from 'react'
import styles from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (props) => {

    return (
        <div className={styles.SideDrawer}>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav >
                <NavigationItems className={styles.NavigationItems}/>
            </nav>
        </div>
    );
}

export default sideDrawer;