import React from 'react'
import styles from './NavigationItems.module.css'

const navigationItems = (props) => {
    const classes = [styles.NavigationItems, props.desktopOnly ? styles.DesktopOnly : null ].join(' ');
    return (
        <ul className={classes}>
            <li>
                <a href='/burger-builder' className={styles.active}>Burger Builder</a>
            </li>
            <li>
                <a href='/checkout'>Checkout</a>
            </li>
        </ul>
    );
}

export default navigationItems;