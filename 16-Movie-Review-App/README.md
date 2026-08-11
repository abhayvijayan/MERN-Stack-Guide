# 16 - Movie Review App (Pagination & Filtering)

In this project, you will tackle a very common problem: what happens when your database has thousands of records? You can't send them all to the frontend at once! You must implement **Pagination** (sending data in pages) and **Filtering** (sending only what the user wants).

## Learning Objectives
- Using `skip()` and `limit()` in MongoDB/Mongoose.
- Extracting Query Parameters (`req.query`) in Express.
- Using `useEffect` dependencies in React to re-fetch data when filters change.
- Handling Pagination State (`currentPage`, `totalPages`).

## Setup Instructions

### 1. Start the Backend
1. Terminal 1: `cd 16-Movie-Review-App/backend`
2. `npm install`
3. `node index.js` (Runs on port 5000)

### 2. Start the Frontend
1. Terminal 2: `cd 16-Movie-Review-App/frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

Add at least 4 or 5 movies so you can see the pagination in action (the limit is currently set to 3 per page).

## Code Explanation

- **`skip()` and `limit()`**: In `backend/index.js`, we use `limit(3)` to say "only give me 3 documents max". We use `skip()` to say "skip the first X documents". For page 1, skip is 0. For page 2, skip is 3. For page 3, skip is 6. This is the math of pagination: `skip = (page - 1) * limit`.
- **`useEffect` Dependency Array**: In `App.jsx`, our useEffect looks like this: `useEffect(() => { fetchMovies() }, [currentPage, genreFilter])`. Whenever the user clicks "Next Page" (updating `currentPage`) or selects a new Genre, React automatically runs the `useEffect` again, triggering a new API call with the updated variables!

## 📝 Assignments

1. **Change Limit:** Add a `<select>` dropdown next to the genre filter that allows the user to choose how many movies to see per page (e.g., 2, 5, 10). Create a `limit` state variable and wire it up!
2. **Search by Title:** Add a text input to search for a movie by name. You'll need to pass the search string to the backend as a query parameter, and use a MongoDB Regex query in `index.js` to find titles that match.
