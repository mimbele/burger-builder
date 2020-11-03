import * as actions from './actionTypes'

const startAuth = () => ({ type:actions.START_AUTH })

const authSuccess = (authData) => ({ type:actions.AUTH_SUCCESS, authData: authData })

const authFail = () => ({ type:actions.AUTH_FAIL})

export const authenticate = (email, password) => {
    return (dispatch) => {
        dispatch(startAuth())

    }
}