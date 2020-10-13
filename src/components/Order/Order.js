import React from 'react'
import styles from './Order.module.css'

const order = (props) => {
    const ingredients = []
    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }
    const ingredientsJSX = ingredients.map( ig => (
        <span key={ig.name} className={styles.Ingredients}>
            {ig.name} ({ig.amount}) 
        </span>
    ));


    return (
        <div className={styles.Order}>
            <p>ingredients: {ingredientsJSX}</p>
            <p>price: <b>{props.price.toFixed(2)}$</b></p>
        </div>
    );
}

export default order;