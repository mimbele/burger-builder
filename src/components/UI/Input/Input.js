import React from 'react'
import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null
    let errorMessage = ''

    const inputStyles = [styles.InputElement]
    if (props.invalid) {
        inputStyles.push(styles.Invalid)
        errorMessage = props.validationErrorMessage
    }

    switch (props.elementType) {
        case 'input' :
            inputElement = <input className={inputStyles.join(' ')} 
                {...props.config} value={props.value} onChange={props.changed} />
            break
        case 'textarea' :
            inputElement = <textarea className={inputStyles.join(' ')} 
                {...props.config} value={props.value} onChange={props.changed} />
            break
        case 'select' :
                inputElement = (
                    <select className={inputStyles.join(' ')} 
                        value={props.value} onChange={props.changed}>
                            {props.config.options.map(option => (
                                <option key={option.value} 
                                    value={option.value}> {option.displayValue} </option>
                            ))}
                    </select>);
                break
        default:
            inputElement = <input className={inputStyles.join(' ')} 
                {...props.config} value={props.value} onChange={props.changed} />
    }

    return (
        <div className={styles.Input} >
            <p className={styles.Label}> {props.label} </p>
            {inputElement}
            <p className={styles.Error}>{errorMessage}</p>
        </div>
    );
}

export default input