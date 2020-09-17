import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 1,
    cheese: 0.5,
    meat: 1.9
}

const DEFAULT_BURGER_PRICE = 4;

class BurgerBuilder extends Component {
    state = {
        ingredients: { salad: 0, bacon: 0, cheese:0, meat: 0 },
        totalPrice: DEFAULT_BURGER_PRICE,
        isOrdering: false //isOrdering bacomes true when Order button is pressed and triggers orderHandler
    }

    //click handler for "More" button in Build Control
    moreIngredient = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedIngredients = { ...this.state.ingredients}
        updatedIngredients[type] = oldCount + 1
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState( {ingredients: updatedIngredients,
                        totalPrice: updatedPrice} );
    }

    //click handler for "Less" button in Build Control
    lessIngredient = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updatedIngredients = { ...this.state.ingredients}
        updatedIngredients[type] = oldCount - 1
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState( 
            {ingredients: updatedIngredients, totalPrice: updatedPrice} );
    }

    orderHandler = () => {
        this.setState({isOrdering: true});
    }

    cancelOrder = () => {
        this.setState({isOrdering: false});
    }

    continueOrder = () => {
        alert('Ordering the burger'); //to be fully implemented in the future
    }

    render(){
        const disableLessButton = { ...this.state.ingredients}
        for (let key in disableLessButton) {
            disableLessButton[key] = (disableLessButton[key] <= 0)
        } // disableLessButton = { salad: true, meat: false, ...}

        const disableOrderButton = (this.state.totalPrice === DEFAULT_BURGER_PRICE);

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price={this.state.totalPrice}
                    addHandler={this.moreIngredient}
                    removeHandler={this.lessIngredient}
                    disableLessButton={disableLessButton}
                    disableOrderButton={disableOrderButton}
                    orderHandler={this.orderHandler}/>

                <Modal show={this.state.isOrdering} cancelOrder={this.cancelOrder}>
                    <OrderSummery 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        cancelOrder={this.cancelOrder}
                        continueOrder={this.continueOrder}/>
                </Modal>
            </Aux>
        );
    }
}

export default BurgerBuilder;