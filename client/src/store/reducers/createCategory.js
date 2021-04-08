import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utiliy'

const initialState = {
    catLists: [],
    error: null,
    loading: false,
    pagesUsrs:''
}
  
const createCategoryStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const createCategorySuccess = (state, action) => {

    return updateObject(state, {
        userLists: action.catLists,
        pagesUsrs : action.pagesCats,
        error: null,
        loading: false
    })
}
const createCategoryFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false })
}

// const createCategory = (state, action) => {
//     return updateObject(state, {
//         catLists: action.catLists,
//         error: null,
//         loading: false

//     })
// }
// const fetchUser = (state, action) => {
//     return updateObject(state, {
//         selectedUser: action.selectedUser,
//         //token: action.token,
//         error: null,
//         loading: false
//     })
// }

// const updateUser = (state, action) => {
//     return updateObject(state, {
//             userLists: action.userLists
//     })
// }

const createCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CATEGORY_START: return createCategoryStart(state, action);
        case actionTypes.CREATE_CATEGORY_SUCCESS: return createCategorySuccess(state, action);
        case actionTypes.CREATE_CATEGORY_FAIL: return createCategoryFail(state, action);

        default: return state
    }
}

export default createCategoryReducer;