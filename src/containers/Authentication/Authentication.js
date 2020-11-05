import React, { Component } from 'react'
import axios from '../../axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Authentication.module.css'
import { authenticate } from '../../store/actions/auth'
import withErrorHandler from '../../hoc/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

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
        isFormValid: false,
        isSignUp: true // so that this page can toggle between sign-in and sign-up
    }

    validate(value, rules) {
        let isValid = true
        if (rules.required) { isValid = (value.trim() !== '') && isValid }
        if (rules.minLength) { isValid = (value.length >= rules.minLength) && isValid }
        return isValid
    }

    authenticate = (event) => {
        event.preventDefault()
        this.props.authenticate(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp)
    }

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

    toggleAuthMode = () => {
        this.setState( oldState => ({
            isSignUp: !oldState.isSignUp
        }))
    }

    render () {
        const formTitle = this.state.isSignUp ? 'Sign Up' : 'Sign In'
        const toggleBtnTitle = this.state.isSignUp ? 'Sign In' : 'Sign Up'
        const toggleBtnMessage = this.state.isSignUp ? 'already have an account? ' : 'don\'t have an account? '

        const formElements = []
        for (let elementName in this.state.authForm) {
            formElements.push({
                id: elementName,
                data: this.state.authForm[elementName]
            })
        }

        const formElementsJSX = formElements.map( element => (
                <Input 
                    key={element.id}
                    label={element.id}
                    elementType={element.data.elementType}
                    config={element.data.config}
                    value={element.data.value}
                    invalid={!element.data.isValid && element.data.hasBeenTouched}
                    validationErrorMessage={element.data.validationErrorMessage}
                    changed={(event) => this.changeInput(event, element.id)} />
            ))

        let form = (
            <form onSubmit={this.authenticate}>
                    {formElementsJSX}
                <Button btnType='Success' disabled={!this.state.isFormValid}>{formTitle}</Button>
                </form>);
        if (this.props.isLoading) {
            form = <Spinner />
        }


        let errorMessage = null
        if (this.props.error) {
            errorMessage = <p className={styles.Error}>{this.props.error.message}</p>
        }

        const redirect = (this.props.isAuthenticated ? 
            (this.props.burgerIsBeingBuilt ? <Redirect to='/checkout'/> : <Redirect to='/burger-builder'/>) : null)

        return (
            <div className={styles.Authentication}>
                <h4>Please Enter Your Account Information To {formTitle}</h4>
                {form}
                {errorMessage}
                <br />
                {toggleBtnMessage}<Button btnType='Danger' clicked={this.toggleAuthMode}>{toggleBtnTitle}</Button>
                {redirect}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    burgerIsBeingBuilt: state.burger.totalPrice !== state.burger.defaultBurgerPrice
})

const mapDispatchToProps = (dispatch) => ({
    authenticate : (email, password, isSignUp) => dispatch(authenticate(email, password, isSignUp))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Authentication, axios))