import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/jobs';
const SECRET_TOKEN = 'SecretAdminToken123'; // In a real app, this comes from a login system!

function App() {
  const [jobs, setJobs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ title: '', company: '', location: '', salary: '' });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': isAdmin ? SECRET_TOKEN : 'FakeToken' // Send token based on role
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create');
      }

      setJobs([data, ...jobs]);
      setFormData({ title: '', company: '', location: '', salary: '' });
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleDelete = async (id) => {
    setErrorMsg('');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': isAdmin ? SECRET_TOKEN : 'FakeToken' 
        }
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      
      setJobs(jobs.filter(j => j._id !== id));
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const styles = {
    app: { fontFamily: 'sans-serif', maxWidth: '800px', margin: '40px auto', padding: '0 20px' },
    roleToggle: { backgroundColor: isAdmin ? '#dc3545' : '#28a745', color: 'white', padding: '10px', textAlign: 'center', cursor: 'pointer', borderRadius: '4px', marginBottom: '20px' },
    form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' },
    input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px' },
    btn: { gridColumn: 'span 2', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    jobCard: { border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    error: { backgroundColor: '#ffe6e6', color: 'red', padding: '10px', borderRadius: '4px', marginBottom: '20px' }
  };

  return (
    <div style={styles.app}>
      <h1>Dev Job Board</h1>

      {/* Role Toggle Switch */}
      <div style={styles.roleToggle} onClick={() => setIsAdmin(!isAdmin)}>
        Current Role: <strong>{isAdmin ? 'ADMIN' : 'GUEST'}</strong> (Click to swap)
      </div>

      {errorMsg && <div style={styles.error}>{errorMsg}</div>}

      {/* Only show the 'Add Job' form if the user is an admin */}
      {isAdmin && (
        <form style={styles.form} onSubmit={handleCreateJob}>
          <input style={styles.input} name="title" placeholder="Job Title" value={formData.title} onChange={handleInputChange} required />
          <input style={styles.input} name="company" placeholder="Company" value={formData.company} onChange={handleInputChange} required />
          <input style={styles.input} name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} required />
          <input style={styles.input} name="salary" placeholder="Salary" value={formData.salary} onChange={handleInputChange} required />
          <button style={styles.btn} type="submit">Post Job</button>
        </form>
      )}

      <div>
        {jobs.map(job => (
          <div key={job._id} style={styles.jobCard}>
            <div>
              <h2 style={{ margin: '0 0 5px 0', color: '#007bff' }}>{job.title}</h2>
              <div style={{ color: '#555', fontSize: '14px' }}>
                <strong>{job.company}</strong> • {job.location} • {job.salary}
              </div>
            </div>
            
            {/* Only show delete button if admin */}
            {isAdmin && (
              <button 
                onClick={() => handleDelete(job._id)}
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px' }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
