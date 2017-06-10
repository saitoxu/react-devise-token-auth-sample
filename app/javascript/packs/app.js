// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import FacebookLogin from 'react-facebook-login'
import auth from './modules/auth'
import Home from './home'
import PrivateRoute from './privateRoute'
import Signup from './signup'
import Login from './login'
import NoteList from './noteList'

const history = createHistory()

const rootReducer = combineReducers({
  auth,
  router: routerReducer
})

const middlewares = [thunkMiddleware, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares))

const App = (props) => {
  const { isAuthenticated } = props
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <hr/>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/notes" isAuthenticated={isAuthenticated} component={NoteList} />
    </div>
  )
}

function mapStateToProps(state) {
  const { auth } = state
  const { loading, isAuthenticated } = auth
  return {
    loading,
    isAuthenticated
  }
}

const ConnectedApp = connect(mapStateToProps)(App)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConnectedApp />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
})
