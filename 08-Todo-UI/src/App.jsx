import { useState } from 'react'

function App() {
  // We use state to hold our list of todos. It starts as an array of objects.
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: false }
  ]);
  
  // State to hold the value of the input field
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(), // Generate a unique ID
      text: inputValue,
      completed: false
    };

    // Update the state array.
    // We cannot do todos.push(newTodo) because State must be updated immutably.
    // Instead, we create a new array with all existing todos (...todos) plus the new one.
    setTodos([...todos, newTodo]);
    
    // Clear the input field
    setInputValue("");
  };

  const toggleTodo = (id) => {
    // Map over the todos array, find the one that was clicked, and flip its 'completed' status
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    // Filter out the todo that we want to delete
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  // Basic styling
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
      <h2>Todo List UI</h2>
      
      <form style={styles.form} onSubmit={handleAddTodo}>
        <input 
          type="text" 
          style={styles.input}
          placeholder="Add a new task..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update state as the user types
        />
        <button type="submit" style={styles.button}>Add</button>
      </form>

      <ul style={styles.list}>
        {/* We use Array.map() to loop through our state and render HTML for each item */}
        {todos.map(todo => (
          <li key={todo.id} style={styles.listItem}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none', 
                cursor: 'pointer',
                flex: 1
              }}
            >
              {todo.text}
            </span>
            <button style={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p>No tasks yet! Add one above.</p>}
    </div>
  )
}

export default App
