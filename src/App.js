import React from 'react';
import { Route } from 'react-router-dom';
import Context from './Context'
import history from './history'


import Header from './Header';
import HomePage from './HomePage';
import Folder from './Folder';
import Note from './Note';
import FolderList from './FolderList';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import ErrorBoundary from './ErrorBoundary'


class App extends React.Component {
  state = {
    folders : [],
    notes : [],
    error: {},
  }

  setError(error) {
    this.setState({ error })
  }

  getAllData() {
    Promise.all([
      fetch(`https://glacial-inlet-41949.herokuapp.com/folders`),
      fetch(`https://glacial-inlet-41949.herokuapp.com/notes`)
    ])
    .then(([foldersRes, notesRes]) => {
      return Promise.all([foldersRes.json(), notesRes.json()])
    })
    .then(([folders, notes]) => {
      this.setState({
        folders, notes
      })
    }) 
    .catch(error => this.setError(error))
  }

  //  POST new folder to API 
  handleAddNewFolder = (folderName) => {
    console.log(folderName)
    let data = {
      folder_name : folderName
    }

    fetch(`https://glacial-inlet-41949.herokuapp.com/folders`, {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => this.getAllData())
      .then(() => history.goBack())
      .catch(error => this.setError(error))
  }

  handleAddNewNote = (note) => {
    let noteData = {
      note_name: note.name,
      folder_id: note.folderId,
      content: note.content
    }

    fetch(`https://glacial-inlet-41949.herokuapp.com/notes`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(noteData)
    })
    .then(response => response.json())
    .then(() => this.getAllData())
    .then(() => history.goBack())
    .catch(error => this.setError(error))
  }

  handleDelete = (noteId) => {

    fetch(`https://glacial-inlet-41949.herokuapp.com/notes/${noteId}`, {
      method : 'delete'
    })
    .then(() => this.getAllData());
  }

  componentDidMount() {
    this.getAllData()
  }

  render() {
    return (
      <Context.Provider value={{
        folders : this.state.folders,
        notes : this.state.notes,
        handleAddNewFolder : this.handleAddNewFolder,
        handleAddNewNote : this.handleAddNewNote,
        handleDelete : this.handleDelete,
        error: this.state.error.message
      }}>
        <ErrorBoundary>
          <main className='App'>
          <Header />
          <Route 
            exact path='/'
            render={(props) => (
              <HomePage {...props}/>
            )} />
          
          <Route exact path='/folders/:folderId' 
            render = { (props) => (
              <div className='container'>
                <FolderList {...props}/>
                <Folder {...props} />
              </div>
            )} />
          <Route exact path='/notes/:noteId'
              render = {(props) => (
                <Note {...props}/> )} />

          <Route exact path ='/add-new-folder'
            component={AddFolder} />

          <Route exact path='/add-new-note'
            component={AddNote} />
          
          </main>
        </ErrorBoundary>
      </Context.Provider>
    );
  }
}

export default App;