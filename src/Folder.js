import React from 'react';
import Context from './Context';
import history from './history';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types'

export default class Folder extends React.Component {
  static contextType = Context;
  
  changeSelected = (noteId) => {
    history.push(`/notes/${noteId}`)
  }

  handleClickDelete = (e, id) => {
    e.preventDefault();
    this.context.handleDelete(id);
  }
  
  noteList = () => {
    const noteList = this.context.notes
    .filter((item) => {
      return item.folder_id == this.props.match.params.folderId;
    }).map((item, idx) => {
      return (
        <div className={item.note_name} key={idx}>
          <h3>{item.note_name}</h3>
          {item.date_modified}
          <p>{item.content}</p>
          <button id={item.id} type='button' onClick={(e) => this.changeSelected(e.target.id)}>Show More</button>
          <button onClick={(e) => this.handleClickDelete(e, item.id)}
          >Delete</button>
        </div>
      );
    });
    return noteList;
  }
  
    render() {
      return (
        <div className='notes'>
          <h2>Notes</h2>
          <Link to='/add-new-note'>
            <button>Add Note</button>
          </Link>
          {this.noteList()}
        </div>
      )
    }
}

Folder.propTypes = {
  match: propTypes.object
}
