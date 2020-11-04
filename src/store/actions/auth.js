import * as actions from './actionTypes'
import axios from 'axios'

const startAuth = () => ({ type:actions.START_AUTH })

const authSuccess = (idToken, userId) => ({ type:actions.AUTH_SUCCESS, userId:userId, token:idToken })

const authFail = (error) => ({ type:actions.AUTH_FAIL, error:error})

export const authenticate = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(startAuth())
        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjD5hX3NzrM4H2KYywIK4qqCdvCglXKQE'
        if (! isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjD5hX3NzrM4H2KYywIK4qqCdvCglXKQE'
        }
        axios.post(url, payload)
            .then( response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch( error => {
                console.log(error.response)
                dispatch(authFail(error.response.data.error))
            })
    }
}