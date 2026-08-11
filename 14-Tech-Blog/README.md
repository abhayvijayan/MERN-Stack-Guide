# 14 - Tech Blog (Relational Data)

In this project, you'll learn about one-to-many relationships in a database. A single Blog Post can have many Comments.

## Learning Objectives
- MongoDB ObjectIds and References (`ref`).
- Fetching related data.
- Complex layout with Sidebar and Main Content.

## Setup Instructions

### 1. Start the Backend
1. Terminal 1: `cd 14-Tech-Blog/backend`
2. `npm install`
3. `node index.js` (Runs on port 5000)

### 2. Start the Frontend
1. Terminal 2: `cd 14-Tech-Blog/frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

## Code Explanation

- **`ref: 'Post'`**: In `models/Comment.js`, we store the parent's `_id` in a field called `postId`. We tell Mongoose that this ID references the `Post` model.
- **Combined Fetching**: In `backend/index.js`, the route `GET /api/posts/:id` does two database queries: first it finds the post by ID, and second, it finds all comments where `postId` matches that ID. It returns both in one JSON response (`{ post, comments }`).
- **Sidebar UI**: Notice the CSS Flexbox layout in React. The sidebar has a fixed width and `overflowY: 'auto'`, meaning it scrolls independently of the main content window!

## 📝 Assignments

1. **Delete Post:** If you delete a Post, what happens to its Comments? They become "orphans"! Write a DELETE route that first deletes all comments where `postId` equals the deleted post, and then deletes the post itself.
2. **Comment Count:** The sidebar currently just shows the Title and Author of the post. Update the backend `GET /api/posts` route to somehow include the count of comments for each post, and display "X Comments" in the sidebar. *(Hint: look into MongoDB Aggregation, or just query the Comment model inside a Promise.all() loop).*
