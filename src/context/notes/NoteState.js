import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  //Get All Note
  const getNotes = async () => {
    //API call
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },

      });
      const json = await response.json()
      
      if (!response.ok) {
        throw new Error(json.error ||`HTTP error! Status: ${response.status}`);
      }
      setNotes(json)
      console.log(json)
      
    } catch (error) {
      console.error("Error Fetching Notes:", error.message);
    }
  };
  //Add a Note
  const addNote = async (title, description, tag) => {  //creates a  new note and updates 'notes' array using setNotes
    //TODO: API call
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })//send Note data as JSON
      });
      if (!response.ok) {
        const errorResponse = await response.json(); // Extracts error details from the response
      console.error("Validation Error:", errorResponse); // Logs the error details in the console
      alert(errorResponse.errors[0].msg); // Optionally, show a user-friendly message
      return; // Stops execution if there's an error
        // throw new Error(`HTTP error! Status: ${response.status}`);

      }

      const newNote = await response.json(); // the newly added note from the Backend
      console.log("Adding a new Note")
      //  const  note={
      //     "_id": "6718942774294a63c8c6esgsd3e5",
      //     "user": "671546a82443b02b4f6ec02f",
      //     "title": title,
      //     "description": description,
      //     "tag": tag,
      //     "date": "2024-10-23T06:13:59.598Z",
      //     "__v": 0
      //   };                                  //
      setNotes(notes.concat(newNote));       //concat returns an array whereas push updates an array
    
    }catch (error) {
      console.log("Error while Adding note:" + error.message)
    }
  }


  //Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
       'auth-token': localStorage.getItem('token')
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json)


    console.log("Deleting the note with id" + id)     
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }

  //Edit note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
       'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json()
    console.log(json)


    //Logic1 to edit on client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     notes[index].title = title;
    //     notes[index].description = description;
    //     notes[index].tag = tag;
    //   }
    //   break;

    // }
    // setNotes(notes)
   // Logic 2 to edit on client
     const newNotes = notes.map(note => note._id === id ? { ...note, title, description, tag } : note ); 
     setNotes(newNotes);
     
  }

  const [notes, setNotes] = useState(notesInitial)

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;