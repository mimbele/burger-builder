import * as actions from '../actions/actionTypes'

const initialState = {
    orders: [],
    isLoading: false,
    purchasedSuccessfully: false,

}

const reducer = (state= initialState, action) =>{
    switch(action.type) {
        case actions.START_PURCHASE:
            return {...state, isLoading: true, purchasedSuccessfully: false}

        case actions.PURCHASE_BURGER_SUCCESS:
            const newOrder = { ...action.orderData, id: action.orderID }
            return {...state, isLoading: false, orders: state.orders.concat(newOrder), purchasedSuccessfully: true }

        case actions.PURCHASE_BURGER_FAIL:
            return {...state, isLoading:false}

        case actions.START_FETCH:
            return {...state, isLoading: true}

        case actions.FETCH_ORDERS_SUCCESS:
            return {...state, isLoading: false, orders: action.orders}

        case actions.FETCH_ORDERS_FAIL:
            return {...state, isLoading: false}

        default: 
            return state
    }
}

export default reducer