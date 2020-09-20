import React from 'react'
import BurgerLogo from '../../assets/images/burger-logo.png'
import styles from './Logo.module.css'

const logo = (props) => {
    const classes = [styles.Logo, props.desktopOnly ? styles.DesktopOnly : null ].join(' ');
    return (
        <div className={classes}>
            <img src={BurgerLogo} alt='burger logo' />
        </div>
    );
}

export default logo;