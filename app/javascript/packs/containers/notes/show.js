import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNote } from '../../modules/note'

class Note extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch(fetchNote(id))
  }

  render() {
    const { loading, note } = this.props
    if (loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    if (note) {
      const { id } = this.props.match.params
      return (
        <div>
          <h2>{note.title}</h2>
          <Link to={`/notes/${id}/edit`}>Edit</Link>
          <p>{note.content}</p>
        </div>
      )
    }
    return (
      <div>
        <h2>Not Found</h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { note } = state
  return {
    loading: note.loading,
    note: note.note
  }
}

export default connect(mapStateToProps)(Note)
