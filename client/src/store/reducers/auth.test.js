import authReducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('Auth Reducer ', ()=>{
    it('Should return the initial state', ()=>{
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false  
        })
    });
    it('Should store the token', ()=>{
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false  
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'alskdjasljkd',
            userId: 1
        })).toEqual({
            token: 'alskdjasljkd',
            userId: 1,
            error: null,
            loading: false
        })
    });
})
