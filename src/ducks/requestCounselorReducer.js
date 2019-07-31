import axios from "axios";

import {
  REQUEST_COUNSELOR,
  CHECK_IF_REQUESTED,
  GET_REQUESTED_USERS,
  REJECT_REQUEST,
  ACCEPT_REQUEST,
  GET_ACCEPTED_USERS,
  LOGOUT_REQUEST_COUNSELOR,
  SEND_TEXT
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

// export const sendText = () => {
//   const recipient = 18015776800;
//   const textmessage = "You have a new request";
//   let response = axios
//     .get(
//       `localhost:9000/api/send-text?recipient=${recipient}&textmessage=${textmessage}`
//     )
//     .then(res => res.data);
//   return {
//     type: SEND_TEXT,
//     payload: response
//   };
// };

export function sendText(first_name, last_name) {
  const name = first_name + ' ' + last_name
  const message = 'You have a new counseling request from'
  let response = axios.post('/api/sendText', { name, message })
  .then(res => res.data)
  return {
    type: SEND_TEXT,
    payload: response
  }
}

export const checkIfRequested = counselor_id => {
  let requests = axios
    .get(`/api/checkIfRequested/${counselor_id}`)
    .then(res => res.data);
  return {
    type: CHECK_IF_REQUESTED,
    payload: requests
  };
};

export const getRequestedUsers = counselor_id => {
  let requestsList = axios
    .get(`/api/getRequestedUsers/${counselor_id}`)
    .then(res => res.data);
  return {
    type: GET_REQUESTED_USERS,
    payload: requestsList
  };
};

export const rejectRequest = (user_counselor_id, counselor_id) => {
  console.log("hit", user_counselor_id, counselor_id);
  const updated = axios
    .delete(
      `/api/rejectRequest/${+user_counselor_id}?counselor_id=${+counselor_id}`
    )
    .then(res => res.data);
  return {
    type: REJECT_REQUEST,
    payload: updated
  };
};

export const acceptRequest = (user_counselor_id, counselor_id) => {
  const updated = axios
    .put("/api/acceptRequest", { user_counselor_id, counselor_id })
    .then(res => {
      console.log(res.data);
      return res.data;
    });

  console.log(updated);
  return {
    type: ACCEPT_REQUEST,
    payload: updated
  };
};

export const getAcceptedUsers = counselor_id => {
  const allAccepted = axios
    .get(`/api/getAcceptedUsers/${counselor_id}`)
    .then(res => res.data);
  return {
    type: GET_ACCEPTED_USERS,
    payload: allAccepted
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
    case SEND_TEXT + "_FULFILLED":
      return { ...state };
    case CHECK_IF_REQUESTED + "_FULFILLED":
      return { ...state, requestedUsers: payload };
    case CHECK_IF_REQUESTED + "_PENDING":
      return { ...state };
    case GET_REQUESTED_USERS + "_FULFILLED":
      return { ...state, userRequests: payload };
    case GET_REQUESTED_USERS + "_PENDING":
      return { ...state };
    case REJECT_REQUEST + "_FULFILLED":
      return { ...state, requestedUsers: payload };
    case ACCEPT_REQUEST + "_FULFILLED":
      return {
        ...state,
        requestedUsers: payload.updatedRequests,
        acceptedUsers: payload.updatedUsers
      };
    case GET_ACCEPTED_USERS + "_FULFILLED":
      return { ...state, acceptedUsers: payload };
    case GET_ACCEPTED_USERS + "_PENDING":
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
