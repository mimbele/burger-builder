import React from 'react'
import styles from './MenuIcon.module.css'

const menuIcon = (props) => {
    const classes = [styles.MenuIcon, props.mobileOnly ? styles.MobileOnly : null ].join(' ');
    return (
        <div className={classes} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default menuIcon;