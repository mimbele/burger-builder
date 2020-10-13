import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styles from './Checkout.module.css'
import Burger from '../../components/Burger/Burger'
import Button from '../../components/UI/Button/Button'
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0,
        continued: false
    }

    componentWillMount () {
        //super();
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let price = 0
        for (let param of query.entries()){
            // now each 'param' is an array in this form: ['salad', '1']
            if (param[0] === 'price') {
                price = +param[1]
            }
            else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.setState({continued: true})
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        console.log(this.props)
        return (
            <div className={styles.Checkout}>
                <h2>Hope You Enjoy This Burger! ^_^ </h2>
                <div style={{width: '100%', margin: 'auto'}}>
                    <Burger ingredients={this.state.ingredients}/>
                </div>
                <strong><p>Total Price: {this.state.totalPrice.toFixed(2)}$</p></strong>
                
                <Button hide={this.state.continued} clicked={this.checkoutCancelled} btnType='Danger'>Cancel</Button>
                <Button hide={this.state.continued} clicked={this.checkoutContinued} btnType='Success'>Continue</Button>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => 
                        (<ContactData 
                            ingredients={this.state.ingredients} 
                            totalPrice={this.state.totalPrice} 
                            {...props} />)} />
            </div>
        );
    }
}

export default Checkout;