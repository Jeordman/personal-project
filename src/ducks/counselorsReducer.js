import axios from "axios";
import { GET_COUNSELORS } from './actionTypes'

const initialState = {
  counselors: [],
  error: false
};

export function getCounselors() {
    let data = axios.get(`/api/getCounselors`).then(res => res.data)
    return {
        type: GET_COUNSELORS,
        payload: data
    }
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COUNSELORS + "_FULFILLED":
      console.log('my payload',payload)
      return { counselors: payload, error: false };
    case GET_COUNSELORS + "_REJECTED":
      return { ...state, error: payload };
    default:
      return state;
  }
}
