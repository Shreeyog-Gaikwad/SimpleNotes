import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
    const context = useContext(noteContext);
    const { deletenote } = context;

    const { note , updatenote} = props;
    return (
        <div className='col-md-4 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium expedita provident nostrum temporibus quia quis, laboriosam ipsa illum voluptates reiciendis, tempore animi facilis illo doloribus sed quos accusamus nemo natus!</p>
                    <i className="fa-solid fa-pen-to-square fa-lg mx-2" style={{ color: "#3670d3" }} onClick={()=>{updatenote(note)}}></i>
                    <i className="fa-solid fa-trash-can fa-lg mx-2" style={{ color: "#c80909" }} onClick={()=>{deletenote(note._id); props.showAlert("Note deleted Successfully" , "success")}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
