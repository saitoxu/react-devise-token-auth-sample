// Actions
const REQUEST = 'react-devise-sample/auth/REQUEST'
const RECEIVED = 'react-devise-sample/auth/RECEIEVD'
const FAILED = 'react-devise-sample/auth/FAILED'
const PASSED = 'react-devise-sample/auth/PASSED'

// Action Creators
export function authenticate(email, password) {
  return (dispatch, getState) => {
    dispatch(startAuthentication())
    const fb = new FormData()
    fb.append('email', email)
    fb.append('password', password)
    const options = {
      method: 'POST',
      header: { 'Content-Type': 'application/json; charset=utf-8' },
      body: fb
    }
    return fetch('/auth/sign_in', options)
      .then(res => {
        const token = res.headers.get('access-token')
        const client = res.headers.get('client')
        const expiry = res.headers.get('expiry')
        const uid = res.headers.get('uid')
        localStorage.setItem('access-token', token)
        localStorage.setItem('client', client)
        localStorage.setItem('expiry', expiry)
        localStorage.setItem('uid', uid)
        return res.json()
      })
      .then(json => {
        dispatch(receiveUserInfo())
      })
      .catch(err => dispatch(failAuthentication()))
  }
}

export function validateToken() {
  return (dispatch, getState) => {
    const uid = localStorage.uid
    const client = localStorage.client
    const accessToken = localStorage.getItem('access-token')
    console.log(uid, client, accessToken)
    if (uid === 'null' || client === 'null' || accessToken === 'null') {
      // dispatch()
      return
    } else {
      const url = `/auth/validate_token?uid=${uid}&client=${client}&access-token=${accessToken}`
      const options = {
        method: 'GET',
        header: { 'Content-Type': 'application/json; charset=utf-8' }
      }
      return fetch(url, options)
        .then(res => {
          const token = res.headers.get('access-token')
          const client = res.headers.get('client')
          const expiry = res.headers.get('expiry')
          const uid = res.headers.get('uid')
          localStorage.setItem('access-token', token)
          localStorage.setItem('client', client)
          localStorage.setItem('expiry', expiry)
          localStorage.setItem('uid', uid)
          return res.json()
        })
        .then(json => {
          if (json.success) {
            dispatch(receiveValidationResult())
          }
        })
    }
  }
}

function startAuthentication() {
  return { type: REQUEST }
}

function receiveUserInfo() {
  return { type: RECEIVED }
}

function failAuthentication() {
  return { type: FAILED }
}

function receiveValidationResult() {
  return { type: PASSED }
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
          isAuthenticated: true
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
    default: return state
  }
}

const initialState = {
  loading: false,
  isAuthenticated: false
}
