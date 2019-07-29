import axios from "axios";
import { GET_USER_JOURNAL, LOGOUT_JOURNAL } from "./actionTypes";

const initialState = {
  journalEntries: []
};

export const getUserJournal = user_id => {
  let response = axios
    .get(`api/getUserJournal/${user_id}`)
    .then(res => res.data);
  return {
    type: GET_USER_JOURNAL,
    payload: response
  };
};

export const logoutJournal = () => {
  return {
    type: LOGOUT_JOURNAL,
    payload: axios.delete("/api/logoutJournal")
  };
};


export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_JOURNAL + "_FULFILLED":
      return {
        ...state,
        journalEntries: payload
      };
    case GET_USER_JOURNAL + "_PENDING":
      return {
        ...state
      };
      case LOGOUT_JOURNAL + "_FULFILLED":
      return { 
        journalEntries: []
      };
    default:
      return {
        ...state
      };
  }
}
