import { useState, useEffect } from 'react'
import io from 'socket.io-client'

// Connect to our backend server
// Note: In a real app, you only want to establish this connection once outside the component
// or using a specific useEffect to prevent multiple connections.
const socket = io.connect('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('receive_message', (data) => {
      // We must use the callback version of setState here,
      // otherwise 'messages' will be stale inside the useEffect closure.
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup function when component unmounts
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const joinChat = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "") {
      const messageData = {
        author: username,
        text: currentMessage,
        time: new Date().toLocaleTimeString()
      };
      
      // Send the message to the backend
      socket.emit('send_message', messageData);
      setCurrentMessage("");
    }
  };

  const styles = {
    app: { fontFamily: 'sans-serif', maxWidth: '500px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' },
    header: { backgroundColor: '#333', color: 'white', padding: '15px', textAlign: 'center', margin: 0 },
    chatBody: { height: '400px', overflowY: 'auto', padding: '20px', backgroundColor: '#f9f9f9' },
    messageBubble: (isMe) => ({
      padding: '10px 15px',
      borderRadius: '20px',
      backgroundColor: isMe ? '#007bff' : '#e5e5ea',
      color: isMe ? 'white' : 'black',
      maxWidth: '70%',
      alignSelf: isMe ? 'flex-end' : 'flex-start',
      display: 'inline-block'
    }),
    messageWrapper: (isMe) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: isMe ? 'flex-end' : 'flex-start',
      marginBottom: '15px'
    }),
    inputArea: { display: 'flex', borderTop: '1px solid #ccc', padding: '10px' },
    input: { flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' },
    btn: { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
  };

  if (!isJoined) {
    return (
      <div style={{ ...styles.app, padding: '40px', textAlign: 'center' }}>
        <h2>Join the Chat</h2>
        <form onSubmit={joinChat}>
          <input 
            type="text" 
            placeholder="Enter your username..." 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={styles.input}
          />
          <button style={{ ...styles.btn, marginTop: '15px' }} type="submit">Join</button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <h2 style={styles.header}>Live Chat</h2>
      
      <div style={styles.chatBody}>
        {messages.length === 0 ? <p style={{textAlign: 'center', color: 'gray'}}>No messages yet...</p> : null}
        
        {messages.map((msg, index) => {
          const isMe = msg.author === username;
          return (
            <div key={index} style={styles.messageWrapper(isMe)}>
              <small style={{ color: 'gray', marginBottom: '2px' }}>
                {isMe ? 'You' : msg.author} • {msg.time}
              </small>
              <div style={styles.messageBubble(isMe)}>
                {msg.text}
              </div>
            </div>
          )
        })}
      </div>

      <form onSubmit={sendMessage} style={styles.inputArea}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={currentMessage} 
          onChange={(e) => setCurrentMessage(e.target.value)} 
          style={styles.input}
        />
        <button style={styles.btn} type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
