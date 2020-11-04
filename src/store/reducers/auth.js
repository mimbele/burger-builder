import * as actions from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    userId: null
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.START_AUTH:
            return {...state, isLoading:true, error:null }

        case actions.AUTH_SUCCESS:
            return {...state, token:action.token, userId:action.userId, isLoading:false, error:null}

        case actions.AUTH_FAIL:
            return {...state, isLoading:false, error:action.error}

        default:
            return state
    }
}

export default reducer