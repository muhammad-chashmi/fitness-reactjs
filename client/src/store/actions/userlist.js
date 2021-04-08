import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'



export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    }
}
export const fetchUsersSuccess = ({ userLists },{pagesUsrs} ) => {    

    console.log("success pages   " + pagesUsrs)

    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        pagesUsrs,
        userLists

    }
}

export const selectedUsersInfo = (selectedUser) => {
    return {
        type: actionTypes.SELECTED_USER,
        selectedUser:selectedUser
    }
}

export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    }
}

// export const updateUsersList = (userLists) => {
   
//     dispatch(editUsersListDispatch(response.data.data.doc))
   
// }

export const fetchUsers = (page) => {
    return dispatch => {
        dispatch(fetchUsersStart())
        console.log('test token1 ->' + JSON.stringify(localStorage.getItem('token')));

        const headers = {
            Authorization: ('Bearer '+ localStorage.getItem('token'))
          }
                console.log('page number:->', page)

          const params = {
            page: page
        };

        axios.get(('users/getAllUser?page='+ page),{
            headers: headers
          })
            .then(response => {
                console.log("success users list req   " + JSON.stringify(response.data.data.data))
                console.log("success users pages   " + response.data.pages)

                //localStorage.setItem('token', response.data.token)
                //localStorage.setItem('expire_date', 456000)
                dispatch(fetchUsersSuccess(
                    {userLists:response.data.data.data} ,  
                    {pagesUsrs : response.data.pages}
                   // token: response.data.token
                ))
                // dispatch(checkAuthTimeout(3000))
                // return {
                //     type: actionTypes.FETCH_USERS,
                //     token: response.data.token,
                //     userList: response.data.data,
                //     error: null,
                //     loading: false             
                //    }
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchUsersFail(err.message))
            })
    }
}

const fetchUserDispatch = (selectedUser) => {
    return {
        type: actionTypes.FETCH_USER,
        selectedUser: selectedUser,
        error: null,
        loading: false
    }
}
const editUsersListDispatch = ({userLists}) => {
    return {
        type: actionTypes.EDIT_USER,
        userLists
    }
}
export const fetchUser = ({id}) => {

         console.log('test token ->' + ('Bearer '+ localStorage.getItem('token')));
         
    return dispatch => {
      //  dispatch(fetchUsersStart())
        const headers = {
            Authorization: ('Bearer '+ localStorage.getItem('token')),
            'Content-Type': 'application/json'

          }

        axios.get(`users/user/${id}`, {
            headers: headers
          })
            .then(response => {
                console.log("success user list req   " + JSON.stringify(response.data.data.doc))

                // localStorage.setItem('token', response.data.token)
                // localStorage.setItem('expire_date', 456000)
                dispatch(selectedUsersInfo({
                    selectedUser:response.data.data.doc          
                }))
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchUsersFail(err.message))
            })
    }
}

export const updateUser = (id, name, email, address, about, instagram,facebook, telegram, role, payPlan, city, profileImg ) => {

    console.log('test id ->' + JSON.stringify(id));
    console.log('test token ->' + JSON.stringify(localStorage.getItem('token')));
    
return dispatch => {
   //dispatch(fetchUsersStart())
   
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

const profile = new FormData();
profile.append('profileImg', profileImg);
profile.append('id', id);
// const profile = {
//     _id: id,
//     profileImg: profileImg

// }

console.log('test signUpData ->' + JSON.stringify(signUpData));

   //  application/json; charset=utf-8
   const headers = {
       Authorization: ('Bearer '+ localStorage.getItem('token')),
       'Content-Type': 'application/json'
     }

   axios.patch(`users/user/${id}`,signUpData, {
       headers: headers
     })
       .then(response => {
          // console.log("success user list req 22  " + JSON.stringify(response.data.data.doc))

           dispatch(selectedUsersInfo(response.data.data.doc))

           return axios.post('users/user-profile', profile,{
            headers: headers
          } )
           .then(response => {
            console.log("success save user profile image")
           })

       })
       .catch(err => {
           console.log(err)
           //dispatch(fetchUsersFail(err.message))
       })
}
}