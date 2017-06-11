import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import FacebookLogin from 'react-facebook-login'
import { validateToken } from './modules/auth'
import Home from './home'
import PrivateRoute from './privateRoute'
import Signup from './signup'
import Login from './login'
import NoteList from './noteList'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(validateToken())
  }

  render() {
    const { isAuthenticated } = this.props
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
}

function mapStateToProps(state) {
  const { auth, router } = state
  const { loading, isAuthenticated } = auth
  return {
    loading,
    isAuthenticated,
    router
  }
}

export default connect(mapStateToProps)(App)
