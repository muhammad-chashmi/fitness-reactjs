import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utiliy'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const signUpStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const signUpSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: 1,
        error: null,
        loading: false
    })
}
const signUpFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false })
}
// const signUpLogout = (state, action) => {
//     return updateObject(state, { token: null, userId: null })
// }
const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signUpStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(state, action)
        case actionTypes.SIGNUP_FAIL: return signUpFail(state, action)
        //case actionTypes.SIGNUP_LOGOUT: return signUpLogout(state, action)
        default: return state
    }
}

export default signUpReducer;