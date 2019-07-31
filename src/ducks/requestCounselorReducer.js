import axios from "axios";

import {
  REQUEST_COUNSELOR,
  CHECK_IF_REQUESTED,
  GET_REQUESTED_USERS,
  REJECT_REQUEST,
  ACCEPT_REQUEST,
  GET_ACCEPTED_USERS,
  LOGOUT_REQUEST_COUNSELOR
} from "./actionTypes";

const initialState = {
  acceptedCounselors: [],
  acceptedUsers: [],
  requestedUsers: [],
  userRequests: {}
};

export const requestCounselor = (user_id, counselor_id) => {
  let response = axios
    .post("/api/requestCounselor", { user_id, counselor_id })
    .then(res => res.data);
  return {
    type: REQUEST_COUNSELOR,
    payload: response
  };
};

export const checkIfRequested = counselor_id => {
  let requests = axios
    .get(`/api/checkIfRequested/${counselor_id}`)
    .then(res => res.data);
  return {
    type: CHECK_IF_REQUESTED,
    payload: requests
  };
};

export const getRequestedUsers = counselor_id  => {
  let requestsList = axios
    .get(`/api/getRequestedUsers/${counselor_id}`)
    .then(res => res.data);
  return {
    type: GET_REQUESTED_USERS,
    payload: requestsList
  };
};

export const logoutRequestCounselor = () => {
  return {
    type: LOGOUT_REQUEST_COUNSELOR,
    payload: axios.delete("/api/logoutRequestCounselor")
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_COUNSELOR + "_FULFILLED":
      return { ...state };
    case CHECK_IF_REQUESTED + "_FULFILLED":
      return { ...state, requestedUsers: payload };
    case CHECK_IF_REQUESTED + "_PENDING":
      return { ...state };
    case GET_REQUESTED_USERS + "_FULFILLED":
      return { ...state, userRequests: payload };
    case GET_REQUESTED_USERS + "_PENDING":
      return { ...state };
    case LOGOUT_REQUEST_COUNSELOR + "_FULFILLED":
      return {
        acceptedCounselors: [],
        acceptedUsers: [],
        requestedUsers: [],
        userRequests: []
      };
    default:
      return {
        ...state
      };
  }
}
