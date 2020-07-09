import React from 'react';
import NoteList from './NoteList';
import FolderList from './FolderList';

export default function HomePage() {
  return (
    <div className='container'>
      <FolderList/>
      <NoteList />
    </div>
  )
}