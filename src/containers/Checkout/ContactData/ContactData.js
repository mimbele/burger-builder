import React, { Component } from 'react'
import axios from '../../../axios'
import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                config: {type: 'text', placeholder: 'Your Name'},
                value: '',
                validationRules: { required:true, minLength:4 },
                isValid: false,
                hasBeenTouched: false
            },
            address: {
                elementType: 'input',
                config: {type: 'textarea', placeholder: 'Your Address'},
                value: '',
                validationRules: { required:true, minLength:10 },
                isValid: false,
                hasBeenTouched: false
            },
            email: {
                elementType: 'input',
                config: {type: 'email', placeholder: 'Your Email'},
                value: '',
                validationRules: { required:true },
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
                isValid: true
            },
        },
        isFormValid: false,
        ingredients: this.props.ingredients,
        totalPrice: this.props.totalPrice,
        isLoading: false
    }

    order = (event) => {
        event.preventDefault(); // prevent the form to send a request and reload the page
        this.setState({isLoading: true})

        const formData = {}
        for (let elementName in this.state.orderForm) {
            formData[elementName] = this.state.orderForm[elementName].value
        }
        
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            contactData: formData
        }
        
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
                            changed={(event) => this.changeInput(event, element.id)} />
                    ))}
                    <Button btnType='Success' disabled={!this.state.isFormValid}>Order</Button>
                </form>);
        if (this.state.isLoading) {form = <Spinner />} 

        return (
            <div className={styles.ContactData}>
                <h4>Please Enter Your Contact Information</h4>
                {form}
            </div>
        );
    }
}

export default withErrorHandler(ContactData, axios);