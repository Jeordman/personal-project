import axios from "axios";
import { GET_COUNSELORS, LOGIN } from './actionTypes'

const initialState = {
  counselors: [],
  user: {},
  redirect: false,
  error: false
};

export function getCounselors() {
    let data = axios.get(`/api/getCounselors`).then(res => res.data)
    return {
        type: GET_COUNSELORS,
        payload: data
    }
}

export const loginCounselor = (username, password) => {
  let userInfo = axios
    .post('/api/loginCounselor', { username, password})
    .then(res => res.data)
    return {
      type: LOGIN,
      payload: userInfo
    }
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COUNSELORS + "_FULFILLED":

      return { counselors: payload, error: false };
    case GET_COUNSELORS + "_REJECTED":
      return { ...state, error: payload };
    case LOGIN + '_FULFILLED':
       return {
         ...state, 
         user: payload,
         redirect: false,
         error: false
       }
       case LOGIN + '_REJECTED':
         return { ...state, error: payload }
    default:
      return state;
  }
}
