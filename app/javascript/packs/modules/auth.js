// Actions
const REQUEST = 'react-devise-sample/auth/REQUEST'
const RECEIVED = 'react-devise-sample/auth/RECEIEVD'
const FAILED = 'react-devise-sample/auth/FAILED'

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
        const uid = res.headers.get('uid')
        debugger
        // for (const header of res.headers) {
        //   console.log(header)
        // }
        return res.json()
      })
      .then(json => {
        debugger
        dispatch(receiveUserInfo())
      })
      .catch(err => dispatch(failAuthentication()))
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
    default: return state
  }
}

const initialState = {
  loading: false,
  isAuthenticated: false
}
