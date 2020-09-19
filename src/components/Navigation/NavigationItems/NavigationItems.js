import React from 'react'
import styles from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <li className={styles.Items}>
            <a href='/' className={styles.active}>Burger Builder</a>
        </li>
        <li className={styles.Items}>
            <a href='/'>Checkout</a>
        </li>
    </ul>
);

export default navigationItems;