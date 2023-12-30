import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);

  //Fetching all notes
  const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setnotes(json);
  }

  //Adding a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  }

  //Deleting a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();

    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes);
  }

  //Editing a note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    getnote();

    //let newNotes = JSON.parse(JSON.stringify(notes));

    //for (let index = 0; index < notes.length; index++) {
    //  const element = notes[index];
    //  if (element._id === id) {
    //    notes.title = title;
    //    notes.description = description;
    //    notes.tag = tag;
    //    break;
    //  }
    //}
    //console.log(id,notes);
    //setnotes(notes);
  }

  return (
    <noteContext.Provider value={{ notes, addnote, deletenote, editnote, getnote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;