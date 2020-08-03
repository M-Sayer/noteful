import React from 'react';
import Context from './Context';
import history from './history';

export default class Note extends React.Component {
  static contextType = Context;
  
  handleClickDelete = (e, id) => {
    e.preventDefault();
    this.context.handleDelete(id);
    history.goBack();
  }

  note = () => {
    const note = this.context.notes
  .filter((item) => {
    return item.id == this.props.match.params.noteId;
  }).map((item, idx) => {
 
      return (
        <>
          <div className='folders'>
 
            <button onClick={() => history.goBack()}
            >Go Back</button>
          </div>
          <div className='notes' key={idx}>
            <button onClick={(e) => this.handleClickDelete(e, item.id)}
            >Delete</button>
            <h3>{item.name}</h3>
            {item.modified}
            <section className='note-content'>
              <p>{item.content}</p>
            </section>
          </div>
        </>
      )
    });
    return note;
  } 
  
  render() {
    return (
      <>
        <div className='container'>
          {this.note()}
        </div>
      </>
    )
  }
  
}