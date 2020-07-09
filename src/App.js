import React from 'react';
import { Route } from 'react-router-dom';
import Context from './Context'
import history from './history'

import dummyStore from './dummyStore';
import Header from './Header';
import HomePage from './HomePage';
import Folder from './Folder';
import Note from './Note';
import FolderList from './FolderList';
import NoteList from './NoteList';
import AddFolder from './AddFolder';
import AddNote from './AddNote';

class App extends React.Component {
  state = {
    folders : [],
    notes : []
  }

  getAllData() {
    Promise.all([
      fetch('http://localhost:9090/folders'),
      fetch('http://localhost:9090/notes')
    ])
    .then(([foldersRes, notesRes]) => {
      return Promise.all([foldersRes.json(), notesRes.json()])
    })
    .then(([folders, notes]) => {
      this.setState({
        folders, notes
      })
    }) 
    .catch(error => console.log(error))
  }

  //  POST new folder to API 
  handleAddNewFolder = (folderName) => {
    console.log(folderName)
    let data = {
      name : folderName
    }

    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    })
      .then(response => response.json())
      .then( () => this.getAllData());

      history.goBack()
  }

  handleAddNewNote = (note) => {
    let noteData = {
      name: note.name,
      folderId: note.folderId,
      content: note.content
    }

    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(noteData)
    })
    .then(response => response.json())
    .then( () => this.getAllData())

    history.goBack()
  }

  handleDelete = (noteId) => {

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method : 'delete'
    })
    .then( () => this.getAllData());
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
        handleDelete : this.handleDelete
      }}>
      
        <main className='App'>
        <Header />
        <Route 
          exact path='/'
          render={() => (
            <HomePage />
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

      </Context.Provider>
    );
  }
}

export default App;