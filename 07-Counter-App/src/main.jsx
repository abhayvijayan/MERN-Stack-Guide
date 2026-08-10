import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// This is the entry point of our React application.
// It grabs the <div id="root"> from index.html and renders our <App /> component inside it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
