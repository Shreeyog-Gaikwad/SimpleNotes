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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4OTQ1OWMzZDU4MThiODVlODYyZGI1In0sImlhdCI6MTcwMzc0NDYxNn0.dJfs6BWBE3o904D9Zbfr0K9Iy9IHBeJG42DeoVuVRps"
      }
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  }

  //Adding a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4OTQ1OWMzZDU4MThiODVlODYyZGI1In0sImlhdCI6MTcwMzc0NDYxNn0.dJfs6BWBE3o904D9Zbfr0K9Iy9IHBeJG42DeoVuVRps"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    const note = {
      "_id": "",//"6589c8fgha34264a09lob779f665f",
      "user": "",//"6589459c3d5818b85e862db5",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "",//"2023-12-25T18:23:31.807Z",
      "__v": 0
    }
    setnotes(notes.concat(note));
  }

  //Deleting a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4OTQ1OWMzZDU4MThiODVlODYyZGI1In0sImlhdCI6MTcwMzc0NDYxNn0.dJfs6BWBE3o904D9Zbfr0K9Iy9IHBeJG42DeoVuVRps"
      }
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes);
  }

  //Editing a note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4OTQ1OWMzZDU4MThiODVlODYyZGI1In0sImlhdCI6MTcwMzc0NDYxNn0.dJfs6BWBE3o904D9Zbfr0K9Iy9IHBeJG42DeoVuVRps"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes.title = title;
        newNotes.description = description;
        newNotes.tag = tag;
        break;
      }
    }
    console.log(id,newNotes);
    setnotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, addnote, deletenote, editnote, getnote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;