import React from 'react';
import history from './history';
import Context from './Context';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types'

export default class FolderList extends React.Component {
  static contextType = Context;
  
  //  on click - > 
  //  change selected to the list name the user clicks
  //  change route to selected folder

  changeSelected = (folderId) => {
    history.push(`/folders/${folderId}`)
  }

  //create a list item for each folder in an array of folders in state
  folderList = () => {
    const List = this.context.folders.map((item, idx) => {
      let selected = '';
      if(this.props.match){
        if(item.id == this.props.match.params.folderId){
          selected = 'selected'
        }
      }
      
      return (
        <div id={selected} 
          className={item.folder_name}
          key={idx}>
          <h3
          id={item.id}
          onClick={(e) => this.changeSelected(e.target.id)}>
          {item.folder_name}
          </h3>
        </div>
      )
    });
    return List
  }

  render() {
    return (
      <div className='folders'>
        <h2>
          Folders
        </h2>
        {this.folderList()}
        <Link to='/add-new-folder'>
        <button type='button'>Add New Folder</button>
        </Link>
      </div>
    )
  }
}

FolderList.propTypes = {
  match: propTypes.object
}