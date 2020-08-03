import React from 'react';
import NoteList from './NoteList';
import FolderList from './FolderList';

export default function HomePage(props) {
  return (
    <div className='container'>
      <FolderList {...props}/>
      <NoteList {...props}/>
    </div>
  )
}