import * as actions from './actionTypes'
import axios from 'axios'

const startAuth = () => ({ type:actions.START_AUTH })

const authSuccess = (idToken, userId) => ({ type:actions.AUTH_SUCCESS, userId:userId, token:idToken })

const authFail = (error) => ({ type:actions.AUTH_FAIL, error:error})

const tokenTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(()=>dispatch(logout()), expirationTime*1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('expirationDate')
    return {type:actions.AUTH_LOGOUT}
}

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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('id', response.data.localId)
                localStorage.setItem('expirationDate', expirationDate)

                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(tokenTimeout(response.data.expiresIn))
            })
            .catch( error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const autoCheckAuth = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if (token){
            const expirationTime = new Date(localStorage.getItem('expirationDate')).getTime()
            if (expirationTime > new Date().getTime()){
                tokenTimeout((expirationTime - new Date().getTime())/1000)
                dispatch(authSuccess(token, localStorage.getItem('id')))
            } else { dispatch(logout()) }
        }
        else { dispatch(logout()) }
    }
}