//Card component for used in showing notes while mapping

import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
// import NoteState from '../context/notes/NoteState';

const Noteitem = (props) => {
    const {note,updateNote,showAlert}=props; //importing notes from props to display its title and description
    const context = useContext(NoteContext);
    const {deleteNote} = context;  //bringling deleteNote from context i.e NoteState
  return (
    <div className='col-md-3 my-3'>
        <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    
    <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id);showAlert("Note Deleted Successfully", "success")}}></i>  {/* Since note is passed as a prop from Notes.js we can use its id  */}
    <i className=" mx-2 fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
    </div>
</div>
    
    </div>
  )
}

export default Noteitem
