import React from 'react'
import styles from './Button.module.css'

//my costum button that recieves 'onClick' and 'type' (which is either 'Danger' or 'Success') as props
const button = (props) => {
    const btnDisplay = props.hide ? 'none' : 'inline-block'
    return(
        <button
            style={{display: btnDisplay}}
            className={[styles.Button, styles[props.btnType]].join(' ')}
            onClick={props.clicked}> {props.children} </button>
    );
}

export default button;