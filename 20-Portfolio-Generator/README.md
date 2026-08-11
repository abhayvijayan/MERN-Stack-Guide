# 20 - Portfolio Generator (Deployment Ready)

Congratulations! You have reached the final project. This is a real, usable Portfolio website that you can deploy to the internet. It includes a public-facing page to show off your work, and a hidden Admin Dashboard to add new projects and read messages sent from your contact form.

## Learning Objectives
- React Router Dom (`BrowserRouter`, `Routes`, `Route`).
- Multi-page React Applications.
- Preparing a full-stack app for real-world use.

## Setup Instructions

### 1. Start the Backend
1. Terminal 1: `cd 20-Portfolio-Generator/backend`
2. `npm install`
3. `node index.js` (Runs on port 5000)

### 2. Start the Frontend
1. Terminal 2: `cd 20-Portfolio-Generator/frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

Go to `http://localhost:5173` to see your public portfolio. Click "Admin Login" at the very bottom (or navigate to `http://localhost:5173/admin`) to access the dashboard!

## Code Explanation

- **React Router**: Up until now, our apps have been "Single Page Applications" (SPAs) that literally only have one view. In `frontend/src/App.jsx`, we imported `react-router-dom` to create actual routes (`/` and `/admin`). Notice how the URL in the browser changes, but the page never fully reloads!
- **Data Formatting**: In the Admin dashboard, the `techStack` input is a single text field where you type comma-separated values (e.g. "React, Node, MongoDB"). Before sending this to the backend, we use `.split(',').map(s => s.trim())` to convert that string into a proper Array of strings, which perfectly matches our Mongoose Schema (`techStack: [String]`).

## 📝 Assignments

1. **Admin Security:** Right now, *anyone* who knows the URL `/admin` can access your dashboard and read your messages! Implement the Role-Based Access Control from **Project 18** to lock down the admin page. Require a password before rendering the `<Admin />` component.
2. **Deploy It!:** Your final assignment is to put this on the internet. 
    - Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to host your database in the cloud (change `MONGO_URI` in `.env`).
    - Deploy your Backend to a service like [Render](https://render.com) or [Heroku](https://heroku.com).
    - Deploy your Frontend to a service like [Vercel](https://vercel.com) or [Netlify](https://netlify.com). (Don't forget to change `API_URL` in `App.jsx` to your deployed backend URL!).
    - Add all 20 of these projects to your new live portfolio!

***

### 🎉 YOU DID IT! 🎉
You have successfully completed 20 Full-Stack MERN projects. You have leveled up from basic APIs to complex, state-driven, database-backed web applications. You are a Full Stack Developer!
