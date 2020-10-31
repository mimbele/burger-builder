import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Authentication.module.css'

class Authentication extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                config: {type: 'email', placeholder: 'Email'},
                value: '',
                validationRules: { required:true },
                validationErrorMessage: 'Please enter a valid email address. eg: example@example.com',
                isValid: false,
                hasBeenTouched: false
            },
            password: {
                elementType: 'input',
                config: {type: 'password', placeholder: 'Password'},
                value: '',
                validationRules: { required:true, minLength:6 },
                validationErrorMessage: 'Your password should be at least 6 characters long',
                isValid:false,
                hasBeenTouched: false
            }
        },
        isFormValid: false
    }

    validate(value, rules) {
        let isValid = true
        if (rules.required) { isValid = (value.trim() !== '') && isValid }
        if (rules.minLength) { isValid = (value.length >= rules.minLength) && isValid }
        return isValid
    }

    authenticate = () => {}

    changeInput = (event, elementID) => {
        const updatedForm = { ...this.state.authForm }
        const updatedElement = { ...updatedForm[elementID] }
        updatedElement.value = event.target.value
        updatedElement.isValid = this.validate(updatedElement.value, updatedElement.validationRules)
        updatedElement.hasBeenTouched = true
        updatedForm[elementID] = updatedElement

        let isFormValid = true
        for (let elementName in updatedForm) {
            isFormValid = isFormValid && updatedForm[elementName].isValid
        }

        this.setState({authForm: updatedForm, isFormValid: isFormValid})
    }

    render () {
        const formElements = []
        for (let elementName in this.state.authForm) {
            formElements.push({
                id: elementName,
                data: this.state.authForm[elementName]
            })
        }


        let form = (
            <form onSubmit={this.authenticate}>
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
                </form>);

        return (
            <div className={styles.Authentication}>
                <h4>Please Enter Your Account Information</h4>
                {form}
                <Button btnType='Success' disabled={!this.state.isFormValid}>Submit</Button>
            </div>
        )
    }
}

export default Authentication