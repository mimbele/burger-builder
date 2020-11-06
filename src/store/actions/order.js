import * as actions from './actionTypes'
import axios from '../../axios'

const purchaseBugerSuccess = (orderID, orderData) => ({
    type: actions.PURCHASE_BURGER_SUCCESS, orderID: orderID, orderData: orderData
})

const purchaseBurgerFail = (error) => ({
    type: actions.PURCHASE_BURGER_FAIL, error: error
})

export const startNewOrder = () => ({ type: actions.START_NEW_ORDER })

const startPurchase = () => ({ type: actions.START_PURCHASE })

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(startPurchase())
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBugerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

const fetchOrdersSuccess = (orders) => ({type: actions.FETCH_ORDERS_SUCCESS, orders: orders})

const fetchOrdersFail = () => ({type: actions.FETCH_ORDERS_FAIL})

const startFetching = () => ({type: actions.START_FETCH})

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(startFetching())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams)
            .then(response => {
                const orders = []
                for (let orderKey in response.data){
                    orders.push({
                        ...response.data[orderKey],
                        id: orderKey
                    })
                }
                dispatch(fetchOrdersSuccess(orders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail())
            })
    }
}