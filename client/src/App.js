import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/notes', { title, content });
      setNotes([...notes, res.data]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      <div className="app">
        <h1>Notepad</h1>

       
        <div>
          <input 
            type="text" 
            placeholder="Note Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <ReactQuill value={content} onChange={setContent} />
          <button onClick={addNote}>Add Note</button>
        </div>

        
        <div className="notes">
          {notes.map(note => (
            <div key={note._id} className="note">
              <h2>{note.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </Router>
  );
};

export default App;
