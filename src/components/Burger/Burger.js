import React from 'react'
import styles from './Burger.module.css'
import Ingredient from './BurgerIngredients'

const burger = (props) => {

    //props.ingredients is transformed to the appropriate corresponding jsx
    // and is stored in ingredientsJSX
    const ingredientsJSX = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
            .map( (_,i) => <Ingredient type={igKey} key={igKey + 1}/> );
        });

    return (
        <div className={styles.Burger}>
            <Ingredient type='bread-top' />
            {ingredientsJSX}
            <Ingredient type='bread-bottom' />
        </div>
    );
}

export default burger;