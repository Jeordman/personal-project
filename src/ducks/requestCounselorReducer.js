import axios from "axios";

import {
  REQUEST_COUNSELOR,
  CHECK_IF_REQUESTED,
  REJECT_REQUEST,
  ACCEPT_REQUEST,
  GET_ACCEPTED_USERS,
  LOGOUT_REQUEST_COUNSELOR
} from "./actionTypes";

const initialState = {
  acceptedCounselors: [],
  acceptedUsers: [],
  requestedUsers: []
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

    case LOGOUT_REQUEST_COUNSELOR + "_FULFILLED":
      return {
        acceptedCounselors: [],
        acceptedUsers: [],
        requestedUsers: []
      };
    default:
      return {
        ...state
      };
  }
}
