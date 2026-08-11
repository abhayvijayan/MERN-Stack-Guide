import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:5000/api';

// --- PUBLIC PORTFOLIO PAGE ---
function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    fetch(`${API_URL}/projects`).then(res => res.json()).then(data => setProjects(data));
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactForm)
    });
    alert('Thanks for reaching out!');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>John Doe</h1>
        <p style={{ fontSize: '1.2rem', color: 'gray' }}>Full Stack MERN Developer</p>
      </header>

      <section style={{ marginBottom: '50px' }}>
        <h2>My Projects</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {projects.map(p => (
            <div key={p._id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div style={{ marginBottom: '10px' }}>
                {p.techStack.map(tech => (
                  <span key={tech} style={{ backgroundColor: '#eee', padding: '3px 8px', borderRadius: '4px', marginRight: '5px', fontSize: '12px' }}>{tech}</span>
                ))}
              </div>
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'blue' }}>View Project →</a>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Contact Me</h2>
        <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input style={{ padding: '10px' }} placeholder="Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} required />
          <input style={{ padding: '10px' }} type="email" placeholder="Email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} required />
          <textarea style={{ padding: '10px', minHeight: '100px' }} placeholder="Your message..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} required />
          <button style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer' }} type="submit">Send Message</button>
        </form>
      </section>
      
      <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px' }}>
        <Link to="/admin" style={{ color: '#ccc' }}>Admin Login</Link>
      </footer>
    </div>
  )
}

// --- HIDDEN ADMIN DASHBOARD ---
function Admin() {
  const [messages, setMessages] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', techStack: '', link: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/messages`).then(res => res.json()).then(data => setMessages(data));
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    // Convert comma separated string to array
    const formattedProject = {
      ...newProject,
      techStack: newProject.techStack.split(',').map(s => s.trim())
    };

    await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedProject)
    });
    
    alert('Project Added!');
    setNewProject({ title: '', description: '', techStack: '', link: '' });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '40px 20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>← Back to Portfolio</button>
      
      <h1>Admin Dashboard</h1>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h2>Add New Project</h2>
        <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input style={{ padding: '8px' }} placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
          <input style={{ padding: '8px' }} placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
          <input style={{ padding: '8px' }} placeholder="Tech Stack (comma separated, e.g. React, Node, Express)" value={newProject.techStack} onChange={e => setNewProject({...newProject, techStack: e.target.value})} required />
          <input style={{ padding: '8px' }} placeholder="Link URL" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} />
          <button style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }} type="submit">Publish Project</button>
        </form>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2>Inbox ({messages.length})</h2>
        {messages.map(m => (
          <div key={m._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <strong>{m.name}</strong> ({m.email})
            <p style={{ margin: '5px 0' }}>{m.message}</p>
            <small style={{ color: 'gray' }}>{new Date(m.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
