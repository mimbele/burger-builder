import React from 'react'
import styles from './NavigationItems.module.css'
import { NavLink } from 'react-router-dom'

const navigationItems = (props) => {
    const classes = [styles.NavigationItems, props.desktopOnly ? styles.DesktopOnly : null ].join(' ');
    return (
        <ul className={classes}>
            <li>
                <NavLink 
                    to='/burger-builder' exact
                    activeClassName={styles.active} >Burger Builder</NavLink>
            </li>
            <li>
                <NavLink to='/orders' exact
                activeClassName={styles.active} >Orders</NavLink>
            </li>
            <li>
                <NavLink to='/authentication' exact
                activeClassName={styles.active} >Sign In</NavLink>
            </li>
        </ul>
    );
}

export default navigationItems;