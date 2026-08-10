# 01 - Hello API

Welcome to your very first backend project! In this project, you will build a basic API (Application Programming Interface) using **Node.js** and **Express**.

## Learning Objectives
- What is a server?
- How to initialize a Node.js project.
- How to install third-party packages (Express).
- How to create routes (endpoints) and send JSON responses.

## Setup Instructions

1. Open your terminal and navigate to this folder: `cd 01-Hello-API`
2. If you haven't already, install the dependencies by running:
   ```bash
   npm install
   ```
3. Start the server by running:
   ```bash
   node index.js
   ```
4. Open your browser and go to [http://localhost:3000](http://localhost:3000). You should see your JSON response!

## Code Explanation

Open `index.js` and read through the comments. Notice how we:
1. Imported `express`.
2. Created an `app` object.
3. Used `app.get()` to define what happens when someone visits a specific URL.
4. Used `app.listen()` to actually turn the server on so it waits for visitors.

## 📝 Assignments

To complete this level, do the following:

1. **Add a new route:** Create a new GET route at `/contact` that returns a JSON object containing a mock email address and phone number.
2. **Change the port:** Modify the code so the server runs on port `8080` instead of `3000`. Be sure to restart your server (`Ctrl+C` in the terminal, then run `node index.js` again) and visit `http://localhost:8080` to verify it works.
3. **Send HTML (Bonus):** Express can send more than just JSON. Create a route at `/html` and use `res.send("<h1>Hello HTML!</h1>")`. See what happens in your browser!
