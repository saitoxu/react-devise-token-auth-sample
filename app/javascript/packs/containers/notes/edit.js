import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { expireAuthentication } from '../../modules/auth'
import { fetchNote } from '../../modules/note'

class NoteEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      redirect: false
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch(fetchNote(id))
  }

  componentWillReceiveProps(nextProps) {
    const title = nextProps.note ? nextProps.note.title : ''
    const content = nextProps.note ? nextProps.note.content : ''
    this.setState({ title, content })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { id } = this.props.match.params
    const { title, content } = this.state
    const { auth } = this.props
    const data = {
      note: { title, content }
    }
    axios({
      url: `/api/notes/${id}`,
      method: 'PUT',
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
    const { id } = this.props.match.params
    const { redirect } = this.state
    const { loading } = this.props
    if (loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    if (redirect) {
      return <Redirect to={`/notes/${id}`} />
    }
    return (
      <div>
        <h2>Edit Note</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Title</label>
          <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
          <label>Content</label>
          <textarea value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, note } = state
  return { auth, loading: note.loading, note: note.note }
}

export default connect(mapStateToProps)(NoteEdit)
