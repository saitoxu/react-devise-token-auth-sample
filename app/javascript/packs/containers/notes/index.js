import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list'
import { fetchNotes, deleteNote } from '../../modules/notes'

class NoteList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchNotes())
  }

  handleClick(e) {
    e.preventDefault()
    const { id, title } = e.target.dataset
    if (confirm(`Are you ok to delete "${title}"?`)) {
      this.props.dispatch(deleteNote(id))
    }
  }

  renderNotes() {
    const { notes } = this.props
    const noteList = []
    notes.forEach((note, i) => {
      noteList.push(
        <ListItem key={i} itemContent={<div>
          <Link to={`/notes/${note.id}`}>{note.title}</Link> <a data-id={note.id} data-title={note.title} href="#" onClick={this.handleClick.bind(this)}>Delete</a>
        </div>} />
      )
    })
    return (
      <List selectable ripple>
        <ListSubHeader caption='Note List' />
        {noteList}
      </List>
    )
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
