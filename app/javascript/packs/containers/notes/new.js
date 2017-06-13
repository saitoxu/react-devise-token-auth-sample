import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { expireAuthentication } from '../../modules/auth'

class NoteForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      redirect: false
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { title, content } = this.state
    const { auth } = this.props
    const data = {
      note: { title, content }
    }
    axios({
      url: '/api/notes',
      method: 'POST',
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid,
        'expiry': auth.expiry,
        'token-type': 'Bearer'
      },
      data
    }).then(response => {
      this.setState({ redirect: true })
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        this.props.dispatch(expireAuthentication())
      }
    })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to="/notes" />
    }
    return (
      <div>
        <h2>New Note</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Title</label>
          <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
          <label>Content</label>
          <textarea value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps)(NoteForm)
