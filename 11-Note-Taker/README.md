# 11 - Full Stack Note Taker

In this project, you'll build a complete Note Taking application. It reinforces full-stack concepts and introduces a more complex React layout utilizing CSS Grid and Flexbox alongside form management.

## Learning Objectives
- Managing a complex form state with a single state object.
- Handling `<textarea>` and `<select>` inputs in React.
- Basic CSS Grid for responsive layouts.

## Setup Instructions

This is a full-stack app, so you need to run TWO servers simultaneously.

### 1. Start the Backend (Express + MongoDB)
1. Open a terminal and navigate to the backend folder: `cd 11-Note-Taker/backend`
2. Install dependencies: `npm install`
3. Ensure MongoDB is running (or add `.env` with `MONGO_URI`).
4. Start the backend server: `node index.js`
   *(Runs on http://localhost:5000)*

### 2. Start the Frontend (React)
1. Open a **SECOND, NEW** terminal window.
2. Navigate to the frontend folder: `cd 11-Note-Taker/frontend`
3. Install dependencies: `npm install`
4. Start the React app: `npm run dev`
   *(Runs on http://localhost:5173)*

## Code Explanation

- **Form State Object**: Instead of having three `useState` hooks (`title`, `content`, `category`), we used a single object: `useState({ title: '', content: '', category: 'General' })`.
- **`handleInputChange`**: We gave every input a `name` attribute matching the state object's keys. When the user types, we dynamically update the correct field using `[e.target.name]: e.target.value`.

## 📝 Assignments

1. **Filtering by Category:** Add three buttons at the top of the note list ("All", "Work", "Personal"). Create a new state variable called `activeCategory`. Modify the `notes.map` function to only render notes that match the selected category (or all of them if "All" is selected).
2. **Sort by Date:** Modify the backend `index.js` `GET /api/notes` route. Currently, it uses `.sort({ updatedAt: -1 })`. Change it to `-1` or `1` and see how the order changes on the frontend. Then, add a toggle button on the frontend to switch between Oldest First and Newest First.
