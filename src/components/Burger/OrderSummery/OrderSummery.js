import React from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

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
            <strong><p>Total Price: {props.price.toFixed(2)}$</p></strong>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancelOrder} btnType='Danger'>Cancel</Button>
            <Button clicked={props.continueOrder} btnType='Success'>Continue</Button>
        </Aux>
    );
}

export default orderSummery;