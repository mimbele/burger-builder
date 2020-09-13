import React from 'react'
import styles from './Burger.module.css'
import Ingredient from './BurgerIngredients'

const burger = (props) => {
    return (
        <div className={styles.Burger}>
            <Ingredient type='bread-top' />
            <Ingredient type='cheese' />
            <Ingredient type='meat' />
            <Ingredient type='bread-bottom' />
        </div>
    );
}

export default burger;