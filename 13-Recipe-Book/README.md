# 13 - Recipe Book (Image Uploads)

Welcome to Level 5! In this project, you'll tackle one of the most common but tricky requirements in web development: **File Uploads**. You will build a Recipe Book where users can upload photos of their dishes.

## Learning Objectives
- Using `multer` in Express to handle `multipart/form-data`.
- Storing files on the server's hard drive.
- Serving static files using `express.static`.
- Using `FormData` in React to send binary files to the backend.

## Setup Instructions

### 1. Start the Backend
1. Terminal 1: `cd 13-Recipe-Book/backend`
2. `npm install`
3. `node index.js` (Runs on port 5000)

### 2. Start the Frontend
1. Terminal 2: `cd 13-Recipe-Book/frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

## Code Explanation

- **`FormData` vs JSON**: When you send text data, you use `JSON.stringify()`. But JSON cannot handle binary data like images. Instead, React uses the built-in `FormData` object to construct a payload that includes the file.
- **Multer Middleware**: When the request hits the Express server, `express.json()` doesn't know how to read `FormData`. We use the `multer` package (`upload.single('image')`). Multer grabs the file, saves it to the `uploads/` folder, and gives us the path in `req.file.path`.
- **Serving Images**: To display the image in React, the browser makes a GET request to `http://localhost:5000/uploads/my-image.jpg`. By default, Express blocks direct access to folders. We use `app.use('/uploads', express.static(...))` to make that specific folder public.

## 📝 Assignments

1. **Delete File on Delete:** If you add a delete route to remove a recipe from MongoDB, the image file stays on the server's hard drive forever, wasting space! Write a DELETE route that first finds the recipe, uses the Node `fs.unlink()` method to delete the image from the `uploads/` folder, and *then* deletes the document from MongoDB.
2. **File Size Limit:** Look up the Multer documentation and add a `limits` configuration to restrict image uploads to a maximum of 2 Megabytes.
