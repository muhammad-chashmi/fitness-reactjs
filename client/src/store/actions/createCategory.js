//actionTypes.createCategory(title, uniqueTitle, pictureURL, iconURL, color, description,metaKeyWord, active)

import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'



export const createCategoryStart = () => {
    return {
        type: actionTypes.CREATE_CATEGORY_START
    }
}
export const createCategorySuccess = ({ categoryLists }) => {    

   // console.log("success pages   " + pagesUsrs)

    return {
        type: actionTypes.CREATE_CATEGORY_SUCCESS,
        categoryLists

    }
}

export const createCategoryFail = (error) => {
    return {
        type: actionTypes.CREATE_CATEGORY_FAIL,
        error: error
    }
}

export const createCategory = (title, uniqueTitle, pictureURL, iconURL, color, description, metaKeyWord, MetaDescription, active) => {

    //console.log('test id ->' + JSON.stringify(id));
    //console.log('test token ->' + JSON.stringify(localStorage.getItem('token')));
    
return dispatch => {
   //dispatch(fetchUsersStart())
   
   const newCategoryData = {
    title: title,
    uniqueTitle: uniqueTitle,
    pictureURL: pictureURL,
    iconURL:iconURL,
    color:color,
    description:description,
    metaKeyWord:metaKeyWord,
    active:active,
    MetaDescription:MetaDescription
}

    console.log('test newCategoryData ->' + JSON.stringify(newCategoryData));


const headers = {
       Authorization: ('Bearer '+ localStorage.getItem('token')),
       'Content-Type': 'application/json'
     }

   axios.post('admin/createCategory',newCategoryData, {
       headers: headers
     }).then(response => {
        //dispatch(createCategorySuccess(err.message))
            console.log("success create new cayegory...!!!")
       })
       .catch(err => {
           console.log(err)
           dispatch(createCategoryFail(err.message))
       })
}
}