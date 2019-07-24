import axios from "axios";
import { GET_COUNSELORS, LOGIN_COUNSELOR, SIGNUP, LOGOUT_COUNSELOR } from "./actionTypes";

const initialState = {
  counselors: [],
  user: {},
  redirect: false,
  error: false,
  counselor: false
};

export function getCounselors() {
  let data = axios.get(`/api/getCounselors`).then(res => res.data);
  return {
    type: GET_COUNSELORS,
    payload: data
  };
}

export const loginCounselor = (username, password) => {
  let userInfo = axios
    .post("/api/loginCounselor", { username, password })
    .then(res => res.data);
  return {
    type: LOGIN_COUNSELOR,
    payload: userInfo
  };
};

export const signupCounselor = (
  username,
  password,
  first_name,
  last_name,
  photo
) => {
  let res = axios
    .post("/api/signupCounselor", {
      username,
      password,
      first_name,
      last_name,
      photo
    })
    .then(res => res.data);
  return {
    type: SIGNUP,
    payload: res
  };
};

export const logoutCounselor = () => { console.log('hit')
  return {
    type: LOGOUT_COUNSELOR,
    payload: axios.delete('/api/logoutCounselor')
  }
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COUNSELORS + "_FULFILLED":
      return { ...state, counselors: payload, error: false };
    case GET_COUNSELORS + "_REJECTED":
      return { ...state, error: payload };
    case LOGIN_COUNSELOR + "_FULFILLED":
      return {
        ...state,
        user: payload,
        redirect: false,
        error: false,
        counselor: true
      };
    case LOGIN_COUNSELOR + "_REJECTED":
      return { ...state, error: payload, counselor: true };
    case SIGNUP + "_FULFILLED":
      return { ...state, redirect: false, user: payload, error: false };
    case SIGNUP + '_REJECTED':
        return { ...state, error: payload}
    case LOGOUT_COUNSELOR + '_FULFILLED':
        return { ...state, redirect: false, error: false, counselor: false, user: {} }
    default:
      return state;
  }
}
