import * as actions from './actions'

const DEFAULT_BURGER_PRICE = 4

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 1,
    cheese: 0.5,
    meat: 1.9
}

const initialState = {
    ingredients: {salad:0, meat:0, bacon:0, cheese:0 },
    totalPrice: DEFAULT_BURGER_PRICE,
    defaultBurgerPrice: DEFAULT_BURGER_PRICE
}

const updatePrice = (currentPrice, amount) => {
    return currentPrice + amount
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: { ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: updatePrice(state.totalPrice ,INGREDIENT_PRICES[action.ingredientName])
            }

        case actions.REMOVE_INGREDIENT:
            let oldCount = state.ingredients[action.ingredientName]
            if (oldCount <= 0) {
                return state;
            }
            else {
                return {
                    ...state,
                    ingredients: { ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    },
                    totalPrice: updatePrice(state.totalPrice ,-INGREDIENT_PRICES[action.ingredientName])
                }
            }

        default:
            return state
    }
}

export default reducer