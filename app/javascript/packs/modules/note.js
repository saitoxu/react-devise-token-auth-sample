import axios from 'axios'
import { updateAuthentication, expireAuthentication } from './auth'

// Actions
const REQUEST = 'react-devise-sample/note/REQUEST'
const RECEIVED = 'react-devise-sample/note/RECEIVED'
const FAILED = 'react-devise-sample/note/FAILED'

// Action Creators
export function fetchNote(id) {
  return (dispatch, getState) => {
    const { auth } = getState()
    dispatch(requestNote())
    return axios({
      url: `/api/notes/${id}`,
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid,
        'expiry': auth.expiry,
        'token-type': 'Bearer'
      }
    }).then(response => {
      dispatch(updateAuthentication(response.headers))
      dispatch(receiveNote(response.data.note))
    }).catch(error => {
      dispatch(failFetchNote())
      if (error.response && error.response.status === 401) {
        dispatch(expireAuthentication())
      }
    })
  }
}

function requestNote() {
  return { type: REQUEST }
}

function receiveNote(note) {
  return { type: RECEIVED, note }
}

function failFetchNote() {
  return { type: FAILED }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST:
      return Object.assign(
        {},
        state,
        {
          loading: true
        }
      )
    case RECEIVED:
      return {
        loading: false,
        note: action.note
      }
    case FAILED:
      return Object.assign(
        {},
        state,
        {
          loading: false,
          note: null
        }
      )
    default: return state
  }
}

const initialState = {
  loading: false,
  note: null
}
