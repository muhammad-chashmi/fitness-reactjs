import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'



export const createCoachStart = () => {
    return {
        type: actionTypes.CREATE_COACH_START
    }
}
export const fetchUsersSuccess = ({ coachLists }) => {    

    return {
        type: actionTypes.CREATE_COACH_SUCCESS,
        coachLists

    }
}

export const createCoachFail = (error) => {
    return {
        type: actionTypes.CREATE_COACH_FAIL,
        error: error
    }
}

export const createNewCoach = (name, email, address, about, instagram,facebook, telegram, role, payPlan, city ) => {

    
return dispatch => {
   
   const signUpData = {
    name: name,
    email: email,
    address: address,
    about:about,
    facebook:facebook,
    telegram:telegram,
    instagram:instagram,
    role:role,
    payPlan:payPlan,
    city:city
}
console.log('test signUpData ->' + JSON.stringify(signUpData));

   const headers = {
       Authorization: ('Bearer '+ localStorage.getItem('token')),
       'Content-Type': 'application/json'
     }

   axios.patch(`users/user/${id}`,signUpData, {
       headers: headers
     })
       .then(response => {

           //dispatch(selectedUsersInfo(response.data.data.doc))
           
       })
       .catch(err => {
           console.log(err)
           dispatch(createCoachFail(err.message))
       })
}
}