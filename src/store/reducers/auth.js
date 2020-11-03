import * as actions from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    isAuthenticated: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.START_AUTH:
            return {...state, isLoading:true }

        case actions.AUTH_SUCCESS:
            return
        case actions.AUTH_FAIL:
            return
        default:
            return state
    }
}