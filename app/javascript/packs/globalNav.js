import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signout } from './modules/auth'

class GlobalNav extends React.Component {
  signout(e) {
    e.preventDefault()
    this.props.dispatch(signout())
  }

  render() {
    const { isAuthenticated } = this.props
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        { !isAuthenticated && <li><Link to="/signup">Signup</Link></li> }
        { !isAuthenticated && <li><Link to="/login">Login</Link></li> }
        { isAuthenticated && <li><a href="#" onClick={this.signout.bind(this)}>Signout</a></li> }
      </ul>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return { isAuthenticated }
}

export default connect(mapStateToProps)(GlobalNav)
