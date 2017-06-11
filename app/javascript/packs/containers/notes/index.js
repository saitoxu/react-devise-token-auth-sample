import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchNotes } from '../../modules/notes'

class NoteList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchNotes())
  }

  renderNotes() {
    const { notes } = this.props
    const noteList = []
    notes.forEach((note, i) => {
      noteList.push(
        <li key={i}>
          <Link to={`/notes/${note.id}`}>{note.title}</Link>
        </li>
      )
    })
    return <ul>{noteList}</ul>
  }

  render() {
    const { loading } = this.props
    if (loading) {
      return (
        <div>
          <h2>Note List</h2>
          <p>Loading...</p>
        </div>
      )
    }
    return (
      <div>
        <h2>Note List</h2>
        {this.renderNotes()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const noteListState = state.notes
  const { loading, notes } = noteListState
  return { loading, notes }
}

export default connect(mapStateToProps)(NoteList)
