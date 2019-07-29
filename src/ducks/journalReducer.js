import axios from "axios";
import {
  GET_USER_JOURNAL,
  LOGOUT_JOURNAL,
  EDIT_USER_JOURNAL
} from "./actionTypes";

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

export const editUserJournal = (entry_id, user_id, new_note) => {
  let response = axios
    .put(`/api/editUserJournal/${entry_id}`, { user_id, new_note })
    .then(res => res.data);
  return {
    type: EDIT_USER_JOURNAL,
    payload: response
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
    case EDIT_USER_JOURNAL + '_FULFILLED':
      return {
        journalEntries: payload
      }
    default:
      return {
        ...state
      };
  }
}
