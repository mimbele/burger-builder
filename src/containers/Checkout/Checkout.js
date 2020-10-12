import React, { Component } from 'react'
import styles from './Checkout.module.css'
import Burger from '../../components/Burger/Burger'
import Button from '../../components/UI/Button/Button'


class Checkout extends Component {
    state = {
        ingredients: {salad:1, meat:1, bacon:1, cheese:1}
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let param of query.entries()){
            //param = ['salad', '1']
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
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
                <strong><p>Total Price: {}$</p></strong>
                
                <Button clicked={this.checkoutCancelled} btnType='Danger'>Cancel</Button>
                <Button clicked={this.checkoutContinued} btnType='Success'>Order</Button>
            </div>
        );
    }
}

export default Checkout;