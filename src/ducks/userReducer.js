import axios from "axios";
import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  GET_USER,
  GET_USERS,
  EDIT_USER,
  COMPLETE_SURVEY,
  ADD_TO_JOURNAL
} from "./actionTypes";

const initialState = {
  users: [],
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

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.delete("/api/logout")
  };
};

export const getUser = () => {
  let data = axios.get("/api/user").then(res => res.data);
  return {
    type: GET_USER,
    payload: data
  };
};

export function getUsers() {
  let data = axios.get("/api/getUsers").then(res => res.data);
  return {
    type: GET_USERS,
    payload: data
  };
}

export const editUser = (
  user_id,
  new_first_name,
  new_last_name,
  new_photo,
  new_info
) => {
  let data = axios
    .put(`/api/editUser/${user_id}`, {
      new_first_name,
      new_last_name,
      new_photo,
      new_info
    })
    .then(res => res.data);
  return {
    type: EDIT_USER,
    payload: data
  };
};

//might be useless
export const completeSurvey = (user_id, date, mood) => {
  let data = axios
    .post("/api/completeSurvey", { user_id, date, mood })
    .then(res => res.data);
  return {
    type: COMPLETE_SURVEY,
    payload: data
  };
};

export const addToJournal = (user_id, date, mood, note) => {
  let data = axios
  .post('/api/addToJournal', {user_id, date, mood, note})
  .then(res => res.data);
  return {
    type : ADD_TO_JOURNAL,
    payload: data
  }
}

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
    case LOGOUT + "_FULFILLED":
      return { users: [], user: {}, redirect: false, error: false };
    case GET_USERS + "_FULFILLED":
      return { ...state, users: payload, error: false };
    case GET_USERS + "_REJECTED":
      return { ...state, error: payload };
    case EDIT_USER + "_FULFILLED":
      return {
        ...state,
        redirect: false,
        error: false,
        counselor: true,
        user: { payload, loggedIn: true }
      };
    case COMPLETE_SURVEY + '_FULFILLED':
      return {
        ...state
      }
    case ADD_TO_JOURNAL + '_FULFILLED':
      return {
        ...state
      }
    default:
      return state;
  }
}
