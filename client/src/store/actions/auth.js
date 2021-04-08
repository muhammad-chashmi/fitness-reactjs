import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout())
        }, expireTime)
    };
}
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password
        }
        axios.post('users/login', authData)
            .then(response => {
               // console.log(response.data.response.);
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('expire_date', 456000)
                dispatch(authSuccess({
                    token: response.data.token,
                    userId: 1
                }))
                // dispatch(checkAuthTimeout(3000))

            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.message))
            })

    }
}
export const authLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('expire_date')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}