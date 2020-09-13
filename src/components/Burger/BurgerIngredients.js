import React from 'react';
import styles from './BurgerIngredients.module.css'
import propTypes from 'prop-types'

const burgerIngredient = (props) => {

    switch (props.type){
        case ('bread-top'):
            return (
                <div className={styles.BreadTop}>
                    <div className={styles.Seeds1}></div>
                    <div className={styles.Seeds2}></div>
                </div>
            );
        case ('bread-bottom'):
            return <div className={styles.BreadBottom}></div>;
        case ('meat'):
            return <div className={styles.Meat}></div>;
        case ('cheese'):
            return <div className={styles.Cheese}></div>;
        case ('salad'):
            return <div className={styles.Salad}></div>;
        case ('bacon'):
            return <div className={styles.Bacon}></div>;
        default:
            return null;        
    }
}

burgerIngredient.propTypes = {
    type: propTypes.string.isRequired
};

export default burgerIngredient;