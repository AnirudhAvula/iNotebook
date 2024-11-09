//this is uesd for showing notes using mapping
//and also displays the form for adding new noteS
import React, { useContext, useEffect,useState, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate = useNavigate()
  const context = useContext(NoteContext)
  const { notes, getNotes, editNote } = context;  //using or bringing notes array, functions to fetch notes and edit note from the context
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate('/login')
      props.showAlert("You are Not Logged in!! Please Authenticate yourself!!","danger")
    }
    
    //eslint-disable-next-line
  } ,[])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle:"", edescription: "", etag: "default"})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id,  etitle: currentNote.title , edescription: currentNote.description, etag : currentNote.tag})
  }


  const handleClick=(e)=>{
    e.preventDefault(); 
    if (note.etitle.length < 3 || note.edescription.length < 5) {
      alert("Title must be at least 3 characters and description at least 5 characters long.");
      return;
    }  
    console.log("Updating the note..",note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Note Successfully","success")

  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})  //changes the value of text according to the name
  }

  return (
    <>
      <AddNote showAlert ={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal"   data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edesc" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag'value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}   type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container'>
        {notes.length===0 && 'No notes to display' }
        </div>
        {notes.map((note) => { //mapping
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert= {props.showAlert}/>//passing the note in notes array as a prop
        })}
      </div>
    </>
  )
}

export default Notes
