import React, { useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

function Addnote(props) {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""});
        props.showAlert("Note Added Successfully" , "success");
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container my-3'>
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default Addnote;
