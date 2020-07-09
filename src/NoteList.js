import React from 'react';
import history from './history';
import Context from './Context';
import {Link} from 'react-router-dom';

export default class NoteList extends React.Component {
  static contextType = Context;

  changeSelected = (noteId) => {
    history.push(`/notes/${noteId}`)
  }

  handleClickDelete = (e, id) => {
    e.preventDefault()
    this.context.handleDelete(id)
  }

  allNotes = () => {
    const notes = this.context.notes.map((item,idx) => {
      return (
        <div
        id={item.id}
        className={item.name} key={idx}>
          <span>
            <h3>{item.name}</h3>
            <p>{item.modified}</p>
            <button id={item.id} type='button' onClick={(e) => this.changeSelected(e.target.id)}>Show More</button>
            <button type='button' 
            onClick={(e) => this.handleClickDelete(e,item.id)}>Delete</button>
          </span>
        </div>
      )
    });
    return notes;
  }

  render() {
    return (
      <div className = 'notes'>
        <h2>
          Notes
        </h2>
        <Link to='/add-new-note'>
        <button>Add Note</button>
        </Link>
        {this.allNotes()}
      </div>
    )
  }
}