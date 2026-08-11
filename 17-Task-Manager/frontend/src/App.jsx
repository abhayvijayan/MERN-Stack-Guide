import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const newTask = await res.json();
    setTasks([newTask, ...tasks]);
    setFormData({ title: '', description: '' });
  };

  const updateStatus = async (id, newStatus) => {
    // Optimistic UI update (update React state immediately for a snappy feel)
    setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));

    // Then update backend
    try {
      await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error(err);
      // In a real app, if this fails, you should revert the state back!
    }
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t._id !== id));
  };

  // Helper function to render a single column
  const renderColumn = (title, statusValue) => {
    // Filter tasks that belong to this column
    const columnTasks = tasks.filter(t => t.status === statusValue);
    
    return (
      <div style={styles.column}>
        <h3 style={styles.columnHeader}>{title} ({columnTasks.length})</h3>
        {columnTasks.map(task => (
          <div key={task._id} style={styles.card}>
            <h4>{task.title}</h4>
            <p style={{ fontSize: '14px', color: 'gray' }}>{task.description}</p>
            
            <div style={styles.cardActions}>
              <select 
                value={task.status} 
                onChange={(e) => updateStatus(task._id, e.target.value)}
                style={styles.select}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <button style={styles.deleteBtn} onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const styles = {
    app: { fontFamily: 'sans-serif', padding: '20px' },
    form: { display: 'flex', gap: '10px', marginBottom: '30px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' },
    input: { padding: '10px', flex: 1 },
    btn: { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' },
    board: { display: 'flex', gap: '20px', minHeight: '600px' },
    column: { flex: 1, backgroundColor: '#f4f5f7', borderRadius: '8px', padding: '10px' },
    columnHeader: { textAlign: 'center', color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' },
    card: { backgroundColor: 'white', padding: '15px', borderRadius: '4px', marginBottom: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    cardActions: { display: 'flex', justifyContent: 'space-between', marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' },
    select: { padding: '5px' },
    deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }
  };

  return (
    <div style={styles.app}>
      <h1>Kanban Task Manager</h1>
      
      <form style={styles.form} onSubmit={handleCreateTask}>
        <input style={styles.input} type="text" name="title" placeholder="Task Title" value={formData.title} onChange={handleInputChange} required />
        <input style={styles.input} type="text" name="description" placeholder="Short description" value={formData.description} onChange={handleInputChange} />
        <button style={styles.btn} type="submit">Add Task</button>
      </form>

      <div style={styles.board}>
        {renderColumn('To Do', 'Todo')}
        {renderColumn('In Progress', 'In Progress')}
        {renderColumn('Done', 'Done')}
      </div>
    </div>
  )
}

export default App
