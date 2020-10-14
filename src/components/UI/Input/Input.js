import React from 'react'
import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null
    switch (props.elementType) {
        case 'input' :
            inputElement = <input className={styles.InputElement} 
                {...props.config} value={props.value} onChange={props.changed} />
            break
        case 'textarea' :
            inputElement = <textarea className={styles.InputElement} 
                {...props.config} value={props.value} onChange={props.changed} />
            break
        case 'select' :
                inputElement = (
                    <select className={styles.InputElement} 
                        value={props.value} onChange={props.changed}>
                            {props.config.options.map(option => (
                                <option key={option.value} 
                                    value={option.value}> {option.displayValue} </option>
                            ))}
                    </select>);
                break
        default:
            inputElement = <input className={styles.InputElement} 
                {...props.config} value={props.value} onChange={props.changed} />

    }
    return (
        <div className={styles.Input} >
            <p className={styles.Label}> {props.label} </p>
            {inputElement}
        </div>
    );
}

export default input