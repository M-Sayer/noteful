import React from 'react';
import Context from './Context';

//user should navigate here from add new note button
//path /add-new-note
//user should submit a form to POST new note to API
//note should have name, content, folder, 
//user should be re-directed upon successful completion of form
//user shoold be informed of any errors before being redirected

export default class AddNote extends React.Component {
  static contextType = Context;
  
  state = {
    name : '',
    folderId : '',
    content : ''
  }

  folderOptions = () => this.context.folders.map((folder, idx) => (
    <option key={idx} value={folder.id}>
      {folder.folder_name}
    </option>
  ))

  setNoteName = (name) => {
    this.setState({
      name : name
    })
  }

  setContent = (content) => {
    this.setState({
      content : content
    })
  }

  setFolderId = (id) => {
    this.setState({
      folderId : id
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let note = {...this.state}
    this.context.handleAddNewNote(note)
  }

  render() {
    return (
      <div className='container'>
        <form 
        onSubmit={(e) => this.handleSubmit(e)}
        id='new-note-form'>
          <label htmlFor='note-name'>Note Name</label>
          <input required type='text'
          id='note-name'
          value={this.state.name}
          onChange={(e) => this.setNoteName(e.target.value)} />
          <label htmlFor='folder-select'>Select Folder</label>
          <select required
            id="folder-select"
            onChange={(e) => this.setFolderId(e.target.value)}>
            <option value=''>select</option>
            {this.folderOptions()}
          </select>
          <label htmlFor='note-content'>Note Content</label>
          <textarea required
          id='note-content'
          value={this.state.content}
          onChange={(e) => this.setContent(e.target.value)}/>
          <button type='submit'>Submit</button>
        </form>
        {this.context.error && <p>something went wrong</p>}
      </div>
    )
  }

  
} 