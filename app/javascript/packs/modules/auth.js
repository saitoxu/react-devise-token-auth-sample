import axios from 'axios'

// Actions
const REQUEST = 'react-devise-sample/auth/REQUEST'
const RECEIVED = 'react-devise-sample/auth/RECEIEVD'
const FAILED = 'react-devise-sample/auth/FAILED'
const PASSED = 'react-devise-sample/auth/PASSED'
const SIGNOUT = 'react-devise-sample/auth/SIGNOUT'

// Action Creators
export function authenticate(email, password) {
  return (dispatch, getState) => {
    dispatch(startAuthentication())
    return axios({
      url: '/auth/sign_in',
      method: 'POST',
      data: { email, password }
    }).then(response => {
      const uid = response.headers['uid']
      const client = response.headers['client']
      const accessToken = response.headers['access-token']
      const expiry = response.headers['expiry']
      dispatch(successAuthentication(uid, client, accessToken, expiry))
    }).catch(error => {
      console.log(error)
    })
  }
}

export function validateToken() {
  return (dispatch, getState) => {
    const { auth } = getState()
    const { uid, client, accessToken, expiry } = auth
    console.log(auth)
    if (!uid || !client || !accessToken || !expiry) {
      dispatch(doSignout()) // clean
    } else {
      return axios({
        url: '/auth/validate_token',
        params: {
          uid,
          client,
          'access-token': accessToken
        }
      }).then(response => {
        const uid = response.headers['uid']
        const client = response.headers['client']
        const accessToken = response.headers['access-token']
        const expiry = response.headers['expiry']
        dispatch(successAuthentication(uid, client, accessToken, expiry))
      }).catch(error => {
        dispatch(doSignout())
      })
    }
  }
}

export function signout() {
  return (dispatch, getState) => {
    const { auth } = getState()
    console.log(auth)
    return axios({
      url: '/auth/sign_out',
      method: 'DELETE',
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid
      }
    }).then(response => {
      dispatch(doSignout())
    }).catch(error => {
      console.log(error)
    })
  }
}

function startAuthentication() {
  return { type: REQUEST }
}

function successAuthentication(uid, client, accessToken, expiry) {
  return { type: RECEIVED, uid, client, accessToken, expiry }
}

function failAuthentication() {
  return { type: FAILED }
}

function receiveValidationResult() {
  return { type: PASSED }
}

function doSignout() {
  return { type: SIGNOUT }
}

// Reducer
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
      return Object.assign(
        {},
        state,
        {
          loading: false,
          isAuthenticated: true,
          uid: action.uid,
          client: action.client,
          accessToken: action.accessToken,
          expiry: action.expiry
        }
      )
    case FAILED:
      return Object.assign(
        {},
        state,
        {
          loading: false
        }
      )
    case PASSED:
      return Object.assign(
        {},
        state,
        {
          loading: false,
          isAuthenticated: true
        }
      )
    case SIGNOUT:
      return Object.assign(
        {},
        initialState
      )
    default: return state
  }
}

const initialState = {
  loading: false,
  isAuthenticated: false,
  client: null,
  accessToken: null,
  uid: null,
  expiry: null
}
