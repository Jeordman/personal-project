import axios from "axios";
import { LOGIN, LOGOUT, SIGNUP, GET_USER } from "./actionTypes";

const initialState = {
  user: {},
  redirect: false,
  error: false
};

//functions to login/signout/etc
export const login = (username, password) => {
  let userInfo = axios
    .post("/api/login", { username, password })
    .then(res => res.data);
  return {
    type: LOGIN,
    payload: userInfo
  };
};
//sign up
export const signup = (username, password, first_name, last_name, photo) => {
  let res = axios
    .post("/api/signup", { username, password, first_name, last_name, photo })
    .then(res => res.data);
  return {
    type: SIGNUP,
    payload: res
  };
};

export const getUser = () => {
  let data = axios.get("/api/user").then(res => res.data);
  return {
    type: GET_USER,
    payload: data
  };
};

//export function
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN + "_FULFILLED":
      return {
        ...state,
        user: payload,
        redirect: false,
        error: false
      };
    case LOGIN + "_REJECTED":
      return { ...state, error: payload };

    case SIGNUP + "_FULFILLED":
      return {
        ...state,
        redirect: false,
        user: payload,
        error: false
      };
    case SIGNUP + "_REJECTED":
      return { ...state, error: payload };

    case GET_USER + "_PENDING":
      return { ...state, redirect: false, error: false };
    case GET_USER + "_FULFILLED":
      return { ...state, user: payload, error: false };
    case GET_USER + "_REJECTED":
      return { ...state, redirect: true, error: payload };
    default:
      return state;
  }
}
