import axios from 'axios'
import { expireAuthentication } from './auth'

// Actions
const REQUEST = 'react-devise-sample/notes/REQUEST'
const RECEIVED = 'react-devise-sample/notes/RECEIVED'
const FAILED = 'react-devise-sample/notes/FAILED'
const DELETED = 'react-devise-sample/notes/DELETED'

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
      dispatch(receiveNotes(response.data.notes))
    }).catch(error => {
      dispatch(failFetchNotes())
      if (error.response && error.response.status === 401) {
        dispatch(expireAuthentication())
      }
    })
  }
}

export function deleteNote(id) {
  return (dispatch, getState) => {
    const { auth } = getState()
    return axios({
      url: `/api/notes/${id}`,
      method: 'DELETE',
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid,
        'expiry': auth.expiry,
        'token-type': 'Bearer'
      }
    }).then(response => {
      dispatch(deletedNote(id))
    }).catch(error => {
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

function deletedNote(id) {
  return { type: DELETED, id }
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
    case DELETED: {
      const notes = [].concat(
        state.notes.filter((note) => note.id !== parseInt(action.id))
      )
      return { loading: false, notes }
    }
    default: return state
  }
}

const initialState = {
  loading: false,
  notes: []
}
