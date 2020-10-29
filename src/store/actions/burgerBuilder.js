import * as actions from './actionTypes'
import axios from '../../axios'

export const addIngredient = (igName) => ({type: actions.ADD_INGREDIENT, ingredientName: igName})

export const removeIngredient = (igName) => ({type: actions.REMOVE_INGREDIENT, ingredientName: igName})

const setIngredient = (ingredients) => ({type:actions.SET_INGREDIENTS, ingredients: ingredients})

const fetchDataError = () => ({type:actions.FETCH_DATA_ERROR})

export const initIngredients = () => {
    return (dispatch) => {
        axios.get( '/ingredients.json' )
            .then( response => {
                dispatch(setIngredient(response.data))
            })
            .catch( error => {
                dispatch(fetchDataError())
            });
        
    }
}