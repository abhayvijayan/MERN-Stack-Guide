# 17 - Task Manager (Kanban Board)

In this project, you will build a Trello-clone (Kanban board) with columns for "To Do", "In Progress", and "Done". This project reinforces data filtering and optimistic UI updates.

## Learning Objectives
- Helper functions to render complex UI based on state.
- Filtering an array into separate categories for display.
- "Optimistic UI Updates" for a snappier user experience.

## Setup Instructions

### 1. Start the Backend
1. Terminal 1: `cd 17-Task-Manager/backend`
2. `npm install`
3. `node index.js` (Runs on port 5000)

### 2. Start the Frontend
1. Terminal 2: `cd 17-Task-Manager/frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

## Code Explanation

- **Helper Rendering**: Instead of writing the same HTML three times for the three columns, we wrote a helper function: `renderColumn('To Do', 'Todo')`. This keeps the code incredibly clean and maintainable.
- **Optimistic UI Updates**: Look at `updateStatus` in `App.jsx`. Instead of waiting for the `fetch` request to complete before moving the task to a new column, we update React's state *first*. The UI updates instantly (optimistically assuming the network won't fail), and *then* we send the request to the database in the background.

## 📝 Assignments

1. **Error Reversion:** What happens if the backend fails (e.g., server crashes) *after* we've optimistically updated the UI? The user sees the task move, but it didn't actually save! Modify `updateStatus` so that if the `fetch` request throws an error, you set the task's status back to its original state.
2. **Drag and Drop (Bonus):** Currently, you move tasks using a dropdown menu. Research how to use the HTML5 Drag and Drop API (or a library like `react-beautiful-dnd`) to allow users to drag tasks between columns!
