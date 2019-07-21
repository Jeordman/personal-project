import axios from 'axios'
import { LOGIN, LOGOUT, SIGNUP } from './actionTypes'

const initialState = {
    user: {},
    redirect: false,
    error: false
}

//functions to login/signout/etc
export const login = (username, password) => {
    let userInfo = axios
        .post('/api/login', { username, password })
        .then(res => res.data)
    return {
        type: LOGIN,
        payload: userInfo
    }  
}

//export function
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOGIN + '_FULFILLED':
            return {
                ...state,
                user: payload,
                redirect: false,
                error: false
            }
        case LOGIN + '_REJECTED':
            return { ...state, error: payload };
        default:
            return state;
    }
}