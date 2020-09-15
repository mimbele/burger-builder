import React from 'react'
import styles from './Burger.module.css'
import Ingredient from './Ingredients/Ingredients'

const burger = (props) => {

    //props.ingredients is transformed to the appropriate corresponding jsx
    // and is stored in ingredientsJSX
    let ingredientsJSX = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
            .map( (_,i) => <Ingredient type={igKey} key={igKey + i}/> );
        })
        .reduce((newArray, currentElement) => 
            newArray.concat(currentElement), []); //reduce flattens the 2d array
    
    if (ingredientsJSX.length === 0) {
        ingredientsJSX = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <Ingredient type='bread-top' />
            {ingredientsJSX}
            <Ingredient type='bread-bottom' />
        </div>
    );
}

export default burger;