import React from 'react'
import styles from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button 
            className={styles.Less} 
            onClick={props.removeHandler}
            disabled={props.disableLessButton}>Less</button>
        <button 
            className={styles.More} 
            onClick={props.addHandler}>More</button>
    </div>
);

export default buildControl;