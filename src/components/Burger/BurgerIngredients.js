import React from 'react';
import styles from './BurgerIngredients.module.css'
import propTypes from 'prop-types'

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type){
        case ('bread-top'):
            ingredient = (
                <div className={styles.BreadTop}>
                    <div className={styles.seeds1}></div>
                    <div className={styles.seeds2}></div>
                </div>
            );
            break;
        case ('bread-bottom'):
            ingredient = <div className={styles.BreadBottom}></div>;
            break;
        case ('meat'):
                ingredient = <div className={styles.Meat}></div>;
                break;
        case ('cheese'):
                ingredient = <div className={styles.Cheese}></div>;
                break;
        case ('salad'):
                ingredient = <div className={styles.Salad}></div>;
                break;
        case ('bacon'):
                ingredient = <div className={styles.Bacon}></div>;
                break;
        default:
            ingredien = null;        
    }

    return ingredient;
}

burgerIngredient.propTypes = {
    type: propTypes.string.isRequired
};

export default burgerIngredient;