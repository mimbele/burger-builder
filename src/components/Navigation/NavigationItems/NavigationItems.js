import React from 'react'
import styles from './NavigationItems.module.css'
import { NavLink } from 'react-router-dom'

const navigationItems = (props) => {
    const classes = [styles.NavigationItems, props.desktopOnly ? styles.DesktopOnly : null ].join(' ');
    const authenticationNavItem = <NavLink to='/authentication' exact activeClassName={styles.active} >Sign In</NavLink>
    const ProfileNavItem = <NavLink to='/profile' exact activeClassName={styles.active} >Your Account</NavLink>
    const ordersNavItem = <NavLink to='/orders' exact activeClassName={styles.active} >Orders</NavLink>

    return (
        <ul className={classes}>
            <li onClick={props.clicked}>
                <NavLink 
                    to='/burger-builder' exact
                    activeClassName={styles.active} >Burger Builder</NavLink>
            </li>
            <li onClick={props.clicked}>
                {props.isAuthenticated ? ordersNavItem : null}
            </li>
            <li onClick={props.clicked}>
                {props.isAuthenticated ? ProfileNavItem : authenticationNavItem}
            </li>
        </ul>
    );
}

export default navigationItems;