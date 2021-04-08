import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utiliy'

const initialState = {
    ingredients: {
        hotDog: 0,
        cheese: 0,
        salad: 0
    },
    totalPrice: 0,
}
const INGREDIENT_PRICES = {
    hotDog: 7000,
    cheese: 3000,
    salad: 1000
}

const addIngredient = (state, action)=>{
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updateIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}
const removeIngredient = (state, action)=>{
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients = updateObject(state.ingredients, updateIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}

const foodBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVER_INGREDIENT:
            return removeIngredient(state, action);
        default: return state
    }
}

export default foodBuilderReducer;