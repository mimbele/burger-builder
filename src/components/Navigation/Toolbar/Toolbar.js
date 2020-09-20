import React from 'react'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div>Menu</div>
        <Logo desktopOnly/>
        <NavigationItems desktopOnly/>
    </header>
);

export default toolbar;