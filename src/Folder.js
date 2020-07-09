import React from 'react';
import Context from './Context';
import history from './history';
import {Link} from 'react-router-dom';

export default class Folder extends React.Component {
  static contextType = Context;
  
  changeSelected = (noteId) => {
    history.push(`/notes/${noteId}`)
  }

  handleClickDelete = (e, id) => {
    e.preventDefault();
    this.context.handleDelete(id);
  }
  // console.log(props.notes);
  // console.log(props.match.params.folderId);
  
  noteList = () => {
    const noteList = this.context.notes
    .filter((item) => {
      return item.folderId === this.props.match.params.folderId;
    }).map((item, idx) => {
      return (
        <div className={item.name} key={idx}>
          <h3>{item.name}</h3>
          {item.modified}
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
