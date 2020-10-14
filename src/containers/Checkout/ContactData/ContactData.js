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
                value: ''
            },
            address: {
                elementType: 'input',
                config: {type: 'textarea', placeholder: 'Your Address'},
                value: ''
            },
            email: {
                elementType: 'input',
                config: {type: 'email', placeholder: 'Your Email'},
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                config: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}]},
                value: ''
            },
        },
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
        updatedForm[id] = updatedElement

        this.setState({orderForm: updatedForm})
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
                            changed={(event) => this.changeInput(event, element.id)} />
                    ))}
                    <Button btnType='Success'>Order</Button>
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