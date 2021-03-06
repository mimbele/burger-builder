import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios'
import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler'
import Input from '../../../components/UI/Input/Input'
import { purchaseBurger } from '../../../store/actions/order'
import Modal from '../../../components/UI/Modal/Modal'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                config: {type: 'text', placeholder: 'Your Name'},
                value: '',
                validationRules: { required:true, minLength:4 },
                validationErrorMessage: 'Name should be at least 4 characters long',
                isValid: false,
                hasBeenTouched: false
            },
            address: {
                elementType: 'input',
                config: {type: 'textarea', placeholder: 'Your Address'},
                value: '',
                validationRules: { required:true, minLength:10 },
                validationErrorMessage: 'Address should be at least 10 characters long',
                isValid: false,
                hasBeenTouched: false
            },
            email: {
                elementType: 'input',
                config: {type: 'email', placeholder: 'Your Email'},
                value: '',
                validationRules: { required:true },
                validationErrorMessage: 'Please enter a valid email address. eg: example@example.com',
                isValid: false,
                hasBeenTouched: false
            },
            deliveryMethod: {
                elementType: 'select',
                config: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}]},
                value: 'fastest',
                validationRules: {},
                validationErrorMessage: '',
                isValid: true
            },
        },
        isFormValid: false
    }

    order = (event) => {
        event.preventDefault(); // prevent the form to send a request and reload the page
        const formData = {}
        for (let elementName in this.state.orderForm) {
            formData[elementName] = this.state.orderForm[elementName].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: formData,
            userId: this.props.userId
        }

        this.props.purchaseBurger(order, this.props.authToken)
    }

    changeInput = (event, id) => {
        const updatedForm = { ...this.state.orderForm }
        const updatedElement = { ...updatedForm[id] }
        updatedElement.value = event.target.value
        updatedElement.isValid = this.validate(updatedElement.value, updatedElement.validationRules)
        updatedElement.hasBeenTouched = true
        updatedForm[id] = updatedElement

        let isFormValid = true
        for (let elementName in updatedForm) {
            isFormValid = isFormValid && updatedForm[elementName].isValid
        }

        this.setState({orderForm: updatedForm, isFormValid: isFormValid})
    }

    validate(value, rules) {
        let isValid = true
        if (rules.required) { isValid = (value.trim() !== '') && isValid }
        if (rules.minLength) { isValid = (value.length >= rules.minLength) && isValid }
        return isValid
    }

    goToHomePage = () => {
        this.props.history.push('/')
    }

    goToOrdersPage = () => {
        this.props.history.push('/orders')
    }

    render(){
        const formElements = []
        for (let elementName in this.state.orderForm) {
            formElements.push({
                id: elementName,
                data: this.state.orderForm[elementName]
            })
        }

        let form = (
            <form onSubmit={this.order}>
                    {formElements.map( element => (
                        <Input 
                            key={element.id}
                            label={element.id}
                            elementType={element.data.elementType}
                            config={element.data.config}
                            value={element.data.value}
                            invalid={!element.data.isValid && element.data.hasBeenTouched}
                            validationErrorMessage={element.data.validationErrorMessage}
                            changed={(event) => this.changeInput(event, element.id)} />
                    ))}
                    <Button btnType='Success' disabled={!this.state.isFormValid}>Order</Button>
                </form>);
        if (this.props.isLoading) {form = <Spinner />} 

        return (
            <div className={styles.ContactData}>
                <h4>Please Enter Your Contact Information</h4>
                {form}
                <Modal show={this.props.showSuccessModal}>
                    <h3>Your Order Has Been Successfully Submitted!</h3>
                    <Button clicked={this.goToOrdersPage} btnType='Success'>Review All Orders</Button>
                    <Button clicked={this.goToHomePage} btnType='Success'>Go To Home Page</Button>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    isLoading: state.orders.isLoading,
    showSuccessModal: state.orders.purchasedSuccessfully,
    authToken: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = (dispatch) => ({
    purchaseBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))