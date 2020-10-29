import * as actions from './actionTypes'
import axios from '../../axios'

const purchaseBugerSuccess = (orderID, orderData) => ({
    type: actions.PURCHASE_BURGER_SUCCESS, orderID: orderID, orderData: orderData
})

const purchaseBurgerFail = (error) => ({
    type: actions.PURCHASE_BURGER_FAIL, error: error
})

const startPurchase = () => ({ type: actions.START_PURCHASE })

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(startPurchase())
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response)
                dispatch(purchaseBugerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}