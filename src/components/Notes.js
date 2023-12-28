import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

function Notes() {

    const context = useContext(noteContext);
    const { notes, getnote, editnote } = context;
    useEffect(() => {
        getnote();
        //eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setnote] = useState({ id : "", etitle: "", edescription: "", etag: "" });

    const updatenote = (currentnote) => {
        ref.current.click();
        setnote({id : currentnote._id, etitle : currentnote.title, edescription : currentnote.description, etag : currentnote.tag});
    }

    const handleClick = (e) => {
        console.log("Updating a note...", note);
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <Addnote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
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
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Discard Changes</button>
                            <button type="button" className="btn btn-success" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes
