import axios from 'axios';

const instance = axios.create({
    baseURL:'/api/v1/' 
    //'https://jsonplaceholder.typicode.com/'
})

export default instance;