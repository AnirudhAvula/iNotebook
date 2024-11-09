// User fills in title and description and clicks Submit.

import React, { useState,useContext }from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description: "", tag: "default"})
    const handleClick=(e)=>{
      e.preventDefault(); 
      if (note.title.length < 3 || note.description.length < 5) {
        alert("Title must be at least 3 characters and description at least 5 characters long.");
        return;
      }
      addNote(note.title, note.description, note.tag);//Handle Click calls the addNote from context (i.e NoteState.js) passing title, description and tag
      setNote({title:"", description: "", tag: "default"})
      props.showAlert("Note Added Successfully", "success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})  //changes the value of text according to the name
    }
  return (
    <div>
       <div className='container my-5'>
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <textarea type="text" className="form-control" id="desc" name='description' value={note.description} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
          </div>
          
          <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
