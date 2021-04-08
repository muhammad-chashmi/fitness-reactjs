import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}
export const signUpSuccess = (token, userId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        token: token,
        userId: userId
    }
}
export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
}
// export const checkAuthTimeout = (expireTime) => {
//     return dispatch => {
//         setTimeout(()=>{
//             dispatch(authLogout())
//         }, expireTime)
//     };
// }
export const signUp = (name, email, password, passwordConfirm, role) => {
    return dispatch => {
        dispatch(signUpStart())
        const signUpData = {
            name: name,
            email: email,
            password: password,
            passwordConfirm:passwordConfirm,
            role:role
        }
        axios.post('users/signup', signUpData)
            .then(response => {
               // console.log(response.data.response.);
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('expire_date', 456000)
                dispatch(signUpSuccess({
                    token: response.data.token,
                    userId: 1
                }))
                // dispatch(checkAuthTimeout(3000))

            })
            .catch(err => {
                console.log(err)
                dispatch(signUpFail(err.message))
            })

    }
}
// export const authLogout = () =>{
//     localStorage.removeItem('token')
//     localStorage.removeItem('expire_date')
//     return {
//         type: actionTypes.AUTH_LOGOUT
//     }
// }