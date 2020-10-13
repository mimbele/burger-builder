import React, { Component } from 'react'
import axios from '../../axios'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 1,
    cheese: 0.5,
    meat: 1.9
}

const DEFAULT_BURGER_PRICE = 4;

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: DEFAULT_BURGER_PRICE,
        isOrdering: false, //isOrdering bacomes true when Order button is pressed and triggers orderHandler
        isLoading: false, //isLoading bacomes true while order is being sent to the server and triggers showing the loading Spinner
        loadingDataError: false //loadingDataError becomes true when data can't be retrieved from the server at componentDidMount and therefore BurgerBuilder app is essentially broken
    }

    componentDidMount () {
        axios.get( '/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            })
            .catch( error => {
                this.setState( { loadingDataError: true } );
            });
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
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disableLessButton = { ...this.state.ingredients}
        for (let key in disableLessButton) {
            disableLessButton[key] = (disableLessButton[key] <= 0)
        } // disableLessButton = { salad: true, meat: false, ...}

        const disableOrderButton = (this.state.totalPrice === DEFAULT_BURGER_PRICE);

        let orderSummery = null;
        let burger = this.state.loadingDataError ? <p>Data can't be loaded! :/</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (<Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                            price={this.state.totalPrice}
                            addHandler={this.moreIngredient}
                            removeHandler={this.lessIngredient}
                            disableLessButton={disableLessButton}
                            disableOrderButton={disableOrderButton}
                            orderHandler={this.orderHandler}/>
                    </Aux>);

            orderSummery = (<OrderSummery 
                            ingredients={this.state.ingredients} 
                            price={this.state.totalPrice}
                            cancelOrder={this.cancelOrder}
                            continueOrder={this.continueOrder}/>);
        }
        if (this.state.isLoading) {
            orderSummery = <Spinner />
        }

        return(
            <Aux>
                {burger}

                <Modal show={this.state.isOrdering} cancelModal={this.cancelOrder}>
                    {orderSummery}
                </Modal>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);