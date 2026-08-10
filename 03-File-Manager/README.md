# 03 - File Manager API

This project takes things up a notch by interacting with the computer's hard drive! You will learn how to read and write files using Node's built-in `fs` (File System) module, and you'll learn about **POST** requests.

## Learning Objectives
- Using Node.js core modules (`fs`, `path`).
- Handling **POST** requests.
- Reading data from the **Request Body** (`req.body`).
- Understanding Middleware (`express.json()`).
- Reading and writing files to the disk.

## Setup Instructions

1. Open your terminal and navigate to this folder: `cd 03-File-Manager`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```

## How to Test POST Requests

You cannot easily test POST requests just by typing a URL into your browser. You need an API Client.
We recommend installing [Postman](https://www.postman.com/) or the [Thunder Client](https://www.thunderclient.com/) extension for VS Code.

**To Create a file (POST):**
- **URL**: `http://localhost:3000/create`
- **Method**: `POST`
- **Body** (Raw JSON):
  ```json
  {
      "filename": "my-note.txt",
      "content": "Hello! This is my first saved note."
  }
  ```

**To Read the file (GET):**
- **URL**: `http://localhost:3000/read?filename=my-note.txt`
- **Method**: `GET`
*(You can test the GET request in your browser)*

## Code Explanation

- **`fs` module**: Node.js allows us to interact with the file system. `fs.writeFile` creates a file, and `fs.readFile` reads it.
- **POST Request**: While GET requests are for *retrieving* data, POST requests are for *sending/creating* data.
- **Request Body**: When clients send data via POST, it is hidden in the "body" of the request.
- **`app.use(express.json())`**: This is called **middleware**. It intercepts incoming requests and automatically parses the JSON data in the body so we can use it via `req.body`.

## 📝 Assignments

1. **Delete File Route:** Use `fs.unlink()` to create a `DELETE` route at `/delete` that takes a `filename` query parameter and deletes the file from the `data` folder.
2. **List Files Route:** Create a GET route at `/list` that uses `fs.readdir()` to read the `data` directory and returns an array of all the filenames currently saved.
3. **Append Route (Bonus):** Create a PUT (or POST) route at `/append` that takes `filename` and `content` in the request body, and uses `fs.appendFile()` to add new text to the end of an existing file instead of overwriting it.
