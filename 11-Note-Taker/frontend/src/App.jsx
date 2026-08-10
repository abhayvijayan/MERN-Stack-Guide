import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  
  // Instead of separate state variables for title, content, etc., 
  // we can use a single object for the form state.
  const [formData, setFormData] = useState({ title: '', content: '', category: 'General' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    // e.target.name is the 'name' attribute of the input
    // e.target.value is what the user typed
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newNote = await res.json();
      
      setNotes([newNote, ...notes]);
      
      // Reset form
      setFormData({ title: '', content: '', category: 'General' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Styling
  const styles = {
    app: { display: 'flex', gap: '20px', padding: '20px', fontFamily: 'sans-serif' },
    formPanel: { flex: 1, padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' },
    listPanel: { flex: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' },
    input: { width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '10px', height: '100px', marginBottom: '10px', boxSizing: 'border-box' },
    btn: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' },
    card: { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', position: 'relative' },
    deleteBtn: { position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '50%' }
  };

  return (
    <div style={styles.app}>
      
      <div style={styles.formPanel}>
        <h2>Add a Note</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="title" 
            placeholder="Note Title" 
            value={formData.title} 
            onChange={handleInputChange} 
            style={styles.input} 
          />
          
          <select name="category" value={formData.category} onChange={handleInputChange} style={styles.input}>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          <textarea 
            name="content" 
            placeholder="Write your note here..." 
            value={formData.content} 
            onChange={handleInputChange} 
            style={styles.textarea} 
          />
          
          <button type="submit" style={styles.btn}>Save Note</button>
        </form>
      </div>

      <div style={styles.listPanel}>
        {notes.length === 0 ? <p>No notes found.</p> : notes.map(note => (
          <div key={note._id} style={styles.card}>
            <button style={styles.deleteBtn} onClick={() => deleteNote(note._id)}>X</button>
            <small style={{ color: 'gray' }}>{note.category}</small>
            <h3 style={{ marginTop: '5px' }}>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
