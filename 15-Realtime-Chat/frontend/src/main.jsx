import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // We remove React.StrictMode here because it causes the component to render twice in development mode.
  // When working with WebSockets (socket.io), this double render causes it to connect twice instantly, which can be confusing.
  <App />
)
