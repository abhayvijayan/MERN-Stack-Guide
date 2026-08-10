import { useState } from 'react'

// A React Component is just a JavaScript function that returns HTML (called JSX)
function App() {
  // useState is a React "Hook".
  // It gives us a variable (count) and a function to update that variable (setCount).
  // When we call setCount, React automatically re-renders the component to show the new value.
  const [count, setCount] = useState(0)

  // Inline styling for simplicity in this beginner project
  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'sans-serif',
      marginTop: '50px'
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      margin: '5px',
      cursor: 'pointer'
    },
    countText: {
      fontSize: '48px',
      margin: '20px'
    }
  }

  return (
    <div style={styles.container}>
      <h1>My First React App</h1>
      
      <div style={styles.countText}>
        {/* We use curly braces {} to write JavaScript variables inside JSX */}
        Count: {count}
      </div>

      {/* onClick is an event listener. When clicked, we call an arrow function that updates the state */}
      <button style={styles.button} onClick={() => setCount(count + 1)}>
        Increment (+)
      </button>

      <button style={styles.button} onClick={() => setCount(count - 1)}>
        Decrement (-)
      </button>

      <br /><br />
      <button style={styles.button} onClick={() => setCount(0)}>
        Reset Count
      </button>
    </div>
  )
}

export default App
