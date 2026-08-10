# 10 - Full Stack MERN Todo

Welcome to Level 4! You are now building Full-Stack applications. We are combining the React Todo UI from Level 3 with a Node/Express/MongoDB backend so that your tasks are permanently saved!

## Learning Objectives
- Connecting a React Frontend to an Express Backend.
- Handling CORS (Cross-Origin Resource Sharing).
- Performing full CRUD (Create, Read, Update, Delete) from React via `fetch`.
- Syncing React State with Database State.

## Setup Instructions

Because this is a full-stack app, you need to run TWO servers simultaneously.

### 1. Start the Backend (Express + MongoDB)
1. Open a terminal and navigate to the backend folder: `cd 10-MERN-Todo/backend`
2. Install dependencies: `npm install`
3. Make sure MongoDB is running on your machine (or add a `.env` file with `MONGO_URI`).
4. Start the backend server: `node index.js`
   *(It will run on http://localhost:5000)*

### 2. Start the Frontend (React)
1. Open a **SECOND, NEW** terminal window.
2. Navigate to the frontend folder: `cd 10-MERN-Todo/frontend`
3. Install dependencies: `npm install`
4. Start the React app: `npm run dev`
   *(It will run on http://localhost:5173)*

Open your browser to the React app URL. Try adding a task, refreshing the page, and watching it persist!

## Code Explanation

- **CORS (`backend/index.js`)**: Browsers block frontend apps from making requests to different ports by default for security. We install and use the `cors` middleware in Express to explicitly allow our React app to talk to it.
- **Syncing State (`frontend/src/App.jsx`)**: When the user adds a task, we don't just update React's state immediately. We FIRST send a `POST` request to the backend. The backend saves it to MongoDB and returns the generated object (which includes the MongoDB `_id`). THEN we add *that* object to our React state.
- **`_id` vs `id`**: MongoDB automatically generates unique IDs for every document under the field `_id` (with an underscore). Notice how the React `map()` function now uses `key={todo._id}`.

## 📝 Assignments

1. **Error Handling UI:** Right now, if the database fails, we just `console.error`. Add an `error` state in React and display a red error message on the screen if a `fetch` request fails.
2. **Edit Feature:** Add an "Edit" button next to "Delete". When clicked, change the UI to an input box to allow the user to modify the task text. Send a `PUT` request to update the text in the database.
