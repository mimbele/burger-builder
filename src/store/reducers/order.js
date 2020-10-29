import * as actions from '../actions/actionTypes'

initialState = {
    orders: [],
    isLoading: false
}

const reducer = (state= initialState, action) =>{
    switch(action.type) {
        case actions.START_PURCHASE:
            return {...state, isLoading: true}

        case actions.PURCHASE_BURGER_SUCCESS:
            const newOrder = { ...action.orderData, id: action.orderID }
            return {...state, isLoading: false, orders: state.orders.concat(newOrder) }

        case actions.PURCHASE_BURGER_FAIL:
            return {...state, isLoading:false}

        default: 
            return state
    }
}

export default reducer