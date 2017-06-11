import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Home extends React.Component {
  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return (
        <div>
          <h2>Home</h2>
          <p><Link to="/notes">Notes</Link></p>
          <p><Link to="/notes/new">Create Note</Link></p>
        </div>
      )
    }
    return (
      <div>
        <h2>Home</h2>
        <p>Logged out</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return { isAuthenticated }
}

export default connect(mapStateToProps)(Home)
