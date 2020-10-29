import React, { Component } from 'react'
import axios from '../../axios'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import { addIngredient, removeIngredient, initIngredients } from '../../store/actions/burgerBuilder'

class BurgerBuilder extends Component {
    state = {
        isOrdering: false, //isOrdering bacomes true when Order button is pressed and triggers orderHandler
        isLoading: false, //isLoading bacomes true while order is being sent to the server and triggers showing the loading Spinner
    }

    componentDidMount () {
        this.props.initIngredients()
    }

    orderHandler = () => {
        this.setState({isOrdering: true});
    }

    cancelOrder = () => {
        this.setState({isOrdering: false});
    }

    continueOrder = () => {
        this.props.history.push('/checkout')
    }

    render(){
        const disableLessButton = { ...this.props.ingredients}
        for (let key in disableLessButton) {
            disableLessButton[key] = (disableLessButton[key] <= 0)
        } // disableLessButton = { salad: true, meat: false, ...}

        const disableOrderButton = (this.props.totalPrice === this.props.defaultBurgerPrice);

        let orderSummery = null;
        let burger = this.props.fetchDataError ? <p>Data can't be loaded! :/</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (<Aux>
                        <Burger ingredients={this.props.ingredients}/>
                        <BuildControls 
                            price={this.props.totalPrice}
                            addHandler={this.props.moreIngredient}
                            removeHandler={this.props.lessIngredient}
                            disableLessButton={disableLessButton}
                            disableOrderButton={disableOrderButton}
                            orderHandler={this.orderHandler}/>
                    </Aux>);

            orderSummery = (<OrderSummery 
                            ingredients={this.props.ingredients} 
                            price={this.props.totalPrice}
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

const mapStateToProps = state => {
    return {
        ingredients : state.burger.ingredients,
        totalPrice : state.burger.totalPrice,
        defaultBurgerPrice : state.burger.defaultBurgerPrice,
        fetchDataError : state.burger.fetchDataError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        moreIngredient : (igName) => dispatch(addIngredient(igName)),
        lessIngredient : (igName) => dispatch(removeIngredient(igName)),
        initIngredients: () => dispatch(initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));