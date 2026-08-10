# 07 - React Counter App

Welcome to Level 3! It is time to learn the Frontend. We will be using **React**, the most popular frontend library in the world. This project uses **Vite** as a lightning-fast build tool to scaffold our React application.

## Learning Objectives
- Understanding React Components.
- JSX (writing HTML inside JavaScript).
- React State (`useState` Hook).
- Event Handling in React (`onClick`).

## Setup Instructions

1. Navigate to this folder: `cd 07-Counter-App`
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the local URL provided in the terminal (usually `http://localhost:5173`).

## Code Explanation

- **Components**: In React, everything is a component. `App.jsx` is our main component. It's just a function that returns HTML.
- **JSX**: Notice how we are writing `<div>` and `<h1>` directly inside our JavaScript file. This syntax is called JSX. React transforms it into real HTML behind the scenes.
- **`useState`**: Standard JavaScript variables don't update the screen when they change. If you want the screen to update, you must use React State. `useState(0)` gives us a variable `count` starting at `0`, and a function `setCount` to change it. Every time `setCount` is called, React re-renders the component to show the new number.

## 📝 Assignments

1. **Add a Step Feature:** Create a new state variable called `step` (default it to 1). Add two buttons to increment and decrement the `step` value. Then, modify your main Counter so that instead of adding `1`, it adds `step` (e.g., if step is 5, clicking increment adds 5 to the counter).
2. **Prevent Negatives:** Modify the Decrement button's `onClick` function so that the counter cannot go below zero. If `count` is 0, clicking decrement should do nothing.
3. **Change Colors:** Modify the inline styles so that if the count is greater than 10, the text turns green. If it's less than 0, it turns red.
