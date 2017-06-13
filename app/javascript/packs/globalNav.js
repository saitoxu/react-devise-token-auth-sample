import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import { signout } from './modules/auth'

class GlobalNav extends React.Component {
  signout(e) {
    e.preventDefault()
    this.props.dispatch(signout())
  }

  render() {
    const { isAuthenticated } = this.props
    return (
      <AppBar title="Sample App" leftIcon={null} fixed>
        <Navigation type="horizontal">
          <Link to="/">Home</Link>
          { !isAuthenticated && <Link to="/signup">Signup</Link> }
          { !isAuthenticated && <Link to="/login">Login</Link> }
          { isAuthenticated && <a href="#" onClick={this.signout.bind(this)}>Signout</a> }
        </Navigation>
      </AppBar>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return { isAuthenticated }
}

export default connect(mapStateToProps)(GlobalNav)
