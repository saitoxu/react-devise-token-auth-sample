import axios from 'axios'
import { updateAuthentication, expireAuthentication } from './auth'

// Actions
const REQUEST = 'react-devise-sample/notes/REQUEST'
const RECEIVED = 'react-devise-sample/notes/RECEIVED'
const FAILED = 'react-devise-sample/notes/FAILED'

// Action Creators
export function fetchNotes() {
  return (dispatch, getState) => {
    const { auth } = getState()
    dispatch(requestNotes())
    return axios({
      url: '/api/notes',
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid,
        'expiry': auth.expiry,
        'token-type': 'Bearer'
      }
    }).then(response => {
      dispatch(updateAuthentication(response.headers))
      dispatch(receiveNotes(response.data.notes))
    }).catch(error => {
      dispatch(failFetchNotes())
      if (error.response && error.response.status === 401) {
        dispatch(expireAuthentication())
      }
    })
  }
}

function requestNotes() {
  return { type: REQUEST }
}

function receiveNotes(notes) {
  return { type: RECEIVED, notes }
}

function failFetchNotes() {
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
        notes: action.notes
      }
    case FAILED:
      return Object.assign(
        {},
        state,
        {
          loading: false
        }
      )
    default: return state
  }
}

const initialState = {
  loading: false,
  notes: []
}
