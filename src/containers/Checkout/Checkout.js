import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Checkout.module.css'
import Burger from '../../components/Burger/Burger'
import Button from '../../components/UI/Button/Button'
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        continued: false
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.setState({continued: true})
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div className={styles.Checkout}>
                <h2>Hope You Enjoy This Burger! ^_^ </h2>
                <div style={{width: '100%', margin: 'auto'}}>
                    <Burger ingredients={this.props.ingredients}/>
                </div>
                <strong><p>Total Price: {this.props.totalPrice.toFixed(2)}$</p></strong>
                
                <Button hide={this.state.continued} clicked={this.checkoutCancelled} btnType='Danger'>Cancel</Button>
                <Button hide={this.state.continued} clicked={this.checkoutContinued} btnType='Success'>Continue</Button>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
})

export default connect(mapStateToProps)(Checkout);