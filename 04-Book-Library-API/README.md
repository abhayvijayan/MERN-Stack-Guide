# 04 - Book Library API (MongoDB & Mongoose)

Welcome to Level 2! In this project, we introduce databases. We will be using **MongoDB** (a NoSQL database) and **Mongoose** (an elegant object modeling tool for MongoDB in Node.js). 

We will build a complete CRUD (Create, Read, Update, Delete) API for a book library.

## Learning Objectives
- Connecting an Express app to a MongoDB database.
- Defining data structures using Mongoose Schemas.
- Creating Models.
- Writing asynchronous routes (`async/await`).
- Performing standard CRUD operations on a database.
- Extracting parameters from URLs (`req.params`).

## Setup Instructions

1. **MongoDB Requirement:** You must have MongoDB running. You can either:
   - Install MongoDB locally on your machine.
   - Or create a free cloud database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Navigate to this folder: `cd 04-Book-Library-API`
3. Install dependencies:
   ```bash
   npm install
   ```
4. **Environment Variables**: Create a file named `.env` in this folder and add your MongoDB connection string if you are using Atlas. If you are using local MongoDB, the code defaults to `mongodb://localhost:27017/book_library`.
   ```env
   # Example .env file content:
   # MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/library?retryWrites=true&w=majority
   PORT=3000
   ```
5. Start the server:
   ```bash
   node index.js
   ```

## Code Explanation

- **Mongoose Schema (`models/Book.js`)**: MongoDB doesn't care what your data looks like, but your application does. Mongoose schemas let you define the exact shape of your data (e.g., `title` must be a String and is required).
- **`async / await`**: Database operations take time. Instead of blocking the server, we use `await` to tell JavaScript to pause that specific function until the database finishes its job. 
- **`req.params`**: When we define a route like `/books/:id`, the `:id` is a variable. We access whatever the user types there using `req.params.id`.

## 📝 Assignments

1. **Add a New Field:** Open `models/Book.js` and add a new field to the schema called `pages` (type: Number). Then test adding a new book with page count via Postman.
2. **Search by Genre:** Create a new GET route at `/books/genre/:genreName` that uses `Book.find({ genre: req.params.genreName })` to return all books of a specific genre.
3. **Delete All (Danger!):** Create a DELETE route at `/books` that uses `Book.deleteMany({})` to clear the entire database. *Use with caution!*
