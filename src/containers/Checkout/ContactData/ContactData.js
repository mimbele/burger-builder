import React, { Component } from 'react'
import axios from '../../../axios'
import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        ingredients: this.props.ingredients,
        totalPrice: this.props.totalPrice,
        isLoading: false
    }

    order = (event) => {
        event.preventDefault(); // prevent the form to send a request and reload the page
        this.setState({isLoading: true})

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: { //customer data will later be connected to the form data
                name: 'Maryam Naderi',
                address: 'blah blah blah',
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'}
        
        
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({isLoading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
                this.setState({isLoading: false})
            })
    }

    render(){
        let form = (
            <form>
                    <input className={styles.Input} type='text' name='name' placeholder='Your Name: ' />
                    <input className={styles.Input} type='email' name='email' placeholder='Your Email: ' />
                    <p style={{textAlign: 'left'}}>Address:</p>
                    <input className={styles.Input} type='text' name='street' placeholder='Street: ' />
                    <input className={styles.Input} type='text' name='postal' placeholder='Postal Code: ' />
                    <Button clicked={this.order} btnType='Success'>Order</Button>
                    {this.state.isLoading ? <Spinner /> : null}
                </form>);
        if (this.state.isLoading) {form = <Spinner />} 

        return (
            <div className={styles.ContactData}>
                <h3>Please Enter Your Contact Information</h3>
                {form}
            </div>
        );
    }
}

export default withErrorHandler(ContactData, axios);