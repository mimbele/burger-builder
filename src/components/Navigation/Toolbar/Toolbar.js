import React from 'react'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuIcon from '../SideDrawer/MenuIcon' //toggles sideDrawer

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <MenuIcon clicked={props.clickMenu} mobileOnly/>
        <Logo desktopOnly/>
        <NavigationItems desktopOnly/>
    </header>
);

export default toolbar;