import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios'
import Spinner from '../../components/UI/Spinner/Spinner'

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
        isOrdering: false, //isOrdering bacomes true when Order button is pressed and triggers orderHandler
        isLoading: false //isLoading bacomes true while order is being sent to the server and triggers showing the loading Spinner
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
        this.setState({isLoading: true})

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Maryam Naderi',
                address: 'blah blah blah',
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'}
        
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({isLoading: false, isOrdering:false})
            })
            .catch(error => {
                console.log(error)
                this.setState({isLoading: false, isOrdering:false})
            })
    }

    render(){
        const disableLessButton = { ...this.state.ingredients}
        for (let key in disableLessButton) {
            disableLessButton[key] = (disableLessButton[key] <= 0)
        } // disableLessButton = { salad: true, meat: false, ...}

        const disableOrderButton = (this.state.totalPrice === DEFAULT_BURGER_PRICE);

        let orderSummery = <OrderSummery 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice}
            cancelOrder={this.cancelOrder}
            continueOrder={this.continueOrder}/>;
        if (this.state.isLoading) {
            orderSummery = <Spinner />
        }

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
                    {orderSummery}
                </Modal>
            </Aux>
        );
    }
}

export default BurgerBuilder;