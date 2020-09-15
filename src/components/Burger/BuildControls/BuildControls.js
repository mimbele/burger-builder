import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl'

const controls = [
    { label: "Salad", type: "salad"},
    { label: "Bacon", type: "bacon"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"}
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        { controls.map( control => (
            <BuildControl 
                key={control.label} label={control.label}
                addHandler={() => props.addHandler(control.type)}
                removeHandler={() => props.removeHandler(control.type)}
                disableLessButton={props.disableLessButton[control.type]}/>
        ))}
        
    </div>
);

export default buildControls;