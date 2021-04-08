import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utiliy'

const initialState = {
    token: null,
    userLists: [],
    error: null,
    loading: false,
    selectedUser:'',
    pagesUsrs:''
}
  
const fetchUsersStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const selectedUsersInfo = (state, action) => {
    return updateObject(state, {selectedUser:action.selectedUser})
}

const fetchUsersSuccess = (state, action) => {

    return updateObject(state, {
        userLists: action.userLists,
        pagesUsrs : action.pagesUsrs,
        token: action.token,
        error: null,
        loading: false
    })
}
const fetchUsersFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false })
}

const fetchUsers = (state, action) => {
    return updateObject(state, {
        userLists: action.userLists,
        //token: action.token,
        error: null,
        loading: false

    })
}
const fetchUser = (state, action) => {
    return updateObject(state, {
        selectedUser: action.selectedUser,
        //token: action.token,
        error: null,
        loading: false
    })
}

const updateUser = (state, action) => {
    return updateObject(state, {
            userLists: action.userLists
    })
}

const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS: return fetchUsers(state, action);
        case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
        case actionTypes.SELECTED_USER: return selectedUsersInfo(state, action);
        //case actionTypes.FETCH_USER: return fetchUser(state, action);
        case actionTypes.EDIT_USER: return updateUser(state, action);

        default: return state
    }
}

export default userListReducer;