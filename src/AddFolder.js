import React from 'react';
import Context from './Context';

//user should navigate here from add new folder button
//path /add-new-folder
//user should submit a form to POST new folder to API
//user should be re-directed upon successful completion of form
//user shoold be informed of any errors before being redirected

export default class AddFolder extends React.Component {
  static contextType = Context;
  
  state = {
    folderName : '' 
  }

  setFolderName = (input) => {
    this.setState({
      folderName : input
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.handleAddNewFolder(this.state.folderName);
    this.setState({
      folderName : ''
    })
  }

  render() {
    console.log('context',this.context)
    return (
      <div className='add-folder-form'>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor='form-name-input'>New Folder Name</label>
          <input required id='form-name-input' 
          type='text'
          onChange={(e) => this.setFolderName(e.target.value)}
          value={this.state.folderName}  />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}