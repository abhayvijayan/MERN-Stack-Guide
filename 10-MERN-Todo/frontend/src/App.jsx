import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch todos from the backend when the app loads
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    try {
      // POST request to backend
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue })
      });
      const newTodo = await res.json();
      
      // Update React state with the newly created DB record
      setTodos([newTodo, ...todos]);
      setInputValue("");
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      // PUT request to backend to toggle status
      const res = await fetch(`${API_URL}/${id}`, { method: 'PUT' });
      const updatedTodo = await res.json();
      
      // Update React state
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error("Failed to toggle todo", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      // DELETE request to backend
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      
      // Remove from React state
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  const styles = {
    container: { maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif' },
    form: { display: 'flex', marginBottom: '20px' },
    input: { flex: 1, padding: '10px', fontSize: '16px' },
    button: { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' },
    list: { listStyle: 'none', padding: 0 },
    listItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' },
    deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <h2>MERN Todo List (Full Stack)</h2>
      
      <form style={styles.form} onSubmit={handleAddTodo}>
        <input 
          type="text" 
          style={styles.input}
          placeholder="Add a new task..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button type="submit" style={styles.button}>Add</button>
      </form>

      {loading ? (
        <p>Loading tasks from database...</p>
      ) : (
        <ul style={styles.list}>
          {todos.map(todo => (
            // Notice we use todo._id because MongoDB generates _id
            <li key={todo._id} style={styles.listItem}>
              <span 
                onClick={() => toggleTodo(todo._id)}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer', flex: 1 }}
              >
                {todo.text}
              </span>
              <button style={styles.deleteBtn} onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
