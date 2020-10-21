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
import * as actions from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        isOrdering: false, //isOrdering bacomes true when Order button is pressed and triggers orderHandler
        isLoading: false, //isLoading bacomes true while order is being sent to the server and triggers showing the loading Spinner
        loadingDataError: false //loadingDataError becomes true when data can't be retrieved from the server at componentDidMount and therefore BurgerBuilder app is essentially broken
    }

    componentDidMount () {
        // this will later be re adjusted

        // axios.get( '/ingredients.json' )
        //     .then( response => {
        //         this.setState( { ingredients: response.data } );
        //     })
        //     .catch( error => {
        //         this.setState( { loadingDataError: true } );
        //     });
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
        const disableLessButton = { ...this.props.ingredients}
        for (let key in disableLessButton) {
            disableLessButton[key] = (disableLessButton[key] <= 0)
        } // disableLessButton = { salad: true, meat: false, ...}

        const disableOrderButton = (this.props.totalPrice === this.props.defaultBurgerPrice);

        let orderSummery = null;
        let burger = this.state.loadingDataError ? <p>Data can't be loaded! :/</p> : <Spinner />;

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
        ingredients : state.ingredients,
        totalPrice : state.totalPrice,
        defaultBurgerPrice : state.defaultBurgerPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        moreIngredient : (igName) => dispatch({type: actions.ADD_INGREDIENT, ingredientName: igName}),
        lessIngredient : (igName) => dispatch({type: actions.REMOVE_INGREDIENT, ingredientName: igName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));