import * as actions from './actionTypes'

export const addIngredient = (igName) => ({type: actions.ADD_INGREDIENT, ingredientName: igName})
export const removeIngredient = (igName) => ({type: actions.REMOVE_INGREDIENT, ingredientName: igName})