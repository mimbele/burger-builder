import React from 'react'
import Aux from '../../../hoc/Auxiliary'

const orderSummery = (props) => {
    const ingredients = Object.keys(props.ingredients)
    .map( igKey => (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}: </span>
            {props.ingredients[igKey]}
        </li>
    ));

    return (
        <Aux>
            <h2>Here's Your Order </h2>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
}

export default orderSummery;