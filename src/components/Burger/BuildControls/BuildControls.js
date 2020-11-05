import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl'

const controls = [
    { label: "Salad", type: "salad"},
    { label: "Bacon", type: "bacon"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"}
];

const buildControls = (props) => {
    const buttonName = props.isAuthenticated ? 'ORDER THIS BURGER!' : 'LOGIN TO CONTINUE'
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong>$</p>
            { controls.map( (control,i) => (
                <BuildControl 
                    key={control.label + i} label={control.label}
                    addHandler={() => props.addHandler(control.type)}
                    removeHandler={() => props.removeHandler(control.type)}
                    disableLessButton={props.disableLessButton[control.type]}/>
            ))}
            <button 
                className={styles.OrderButton}
                disabled={props.disableOrderButton}
                onClick={props.orderHandler}>{buttonName}</button>
        </div>
    )
}

export default buildControls;