# 15 - Realtime Chat (Socket.io)

In this project, you will build a realtime chat application. Up until now, we've used standard HTTP requests (`fetch`), which are strictly one-way: the client asks, the server answers. WebSockets allow two-way, persistent connections so the server can push data to the client instantly!

## Learning Objectives
- Understanding WebSockets vs HTTP.
- Using `socket.io` on the Express Backend.
- Using `socket.io-client` in React.
- Broadcasting events.

## Setup Instructions

*Note: This project does not use MongoDB. It stores chat history only in React state (refreshing clears the chat).*

### 1. Start the Backend
1. Terminal 1: `cd 15-Realtime-Chat/backend`
2. `npm install`
3. `node index.js` (Runs on port 5000)

### 2. Start the Frontend
1. Terminal 2: `cd 15-Realtime-Chat/frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

### How to test Realtime functionality:
Open **two different browser windows** side-by-side pointing to `http://localhost:5173`. Enter a different username in each. When you send a message in Window A, it will instantly appear in Window B without refreshing the page!

## Code Explanation

- **`io.emit()` vs `socket.emit()`**: In `backend/index.js`, we use `io.emit('receive_message', data)`. This broadcasts the message to *every single connected user*. If we used `socket.emit()`, it would only send it back to the specific user who sent it.
- **`useEffect` Cleanup**: In `frontend/src/App.jsx`, our `useEffect` returns a function `() => { socket.off('receive_message') }`. If we didn't do this, every time the component re-renders, it would attach *another* listener, resulting in duplicate messages appearing on the screen.

## 📝 Assignments

1. **Typing Indicator:** Add a feature that shows "Username is typing..." when someone is typing. You'll need to emit a new event (e.g. `typing`) on `onChange` of the input field, broadcast it from the server, and listen for it in React.
2. **Auto-Scroll to Bottom:** Right now, if the chat fills the screen, you have to manually scroll down. Research how to use the `useRef` hook in React to automatically scroll to the bottom of the `chatBody` div whenever a new message is added.
