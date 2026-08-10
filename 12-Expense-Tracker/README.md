# 12 - Full Stack Expense Tracker

In this project, you will build an application to track income and expenses. This project focuses heavily on **Derived State**—calculating data on the fly from an existing array of objects rather than storing duplicate values in state.

## Learning Objectives
- Derived State (calculating values on every render without `useState`).
- Using JavaScript Array methods (`.filter()` and `.reduce()`).
- Storing enumerated values (`enum`) in Mongoose.

## Setup Instructions

This is a full-stack app.

### 1. Start the Backend (Express + MongoDB)
1. Open a terminal and navigate to the backend folder: `cd 12-Expense-Tracker/backend`
2. Install dependencies: `npm install`
3. Ensure MongoDB is running.
4. Start the backend server: `node index.js`
   *(Runs on http://localhost:5000)*

### 2. Start the Frontend (React)
1. Open a **SECOND, NEW** terminal window.
2. Navigate to the frontend folder: `cd 12-Expense-Tracker/frontend`
3. Install dependencies: `npm install`
4. Start the React app: `npm run dev`
   *(Runs on http://localhost:5173)*

## Code Explanation

- **Mongoose Enums**: Look at `backend/models/Expense.js`. The `type` field has `enum: ['income', 'expense']`. This tells MongoDB to reject any data where the type is not exactly one of those two strings. It prevents bad data like "incoem" from entering your database.
- **Derived State**: In React, we *don't* have a `const [totalIncome, setTotalIncome] = useState(0)`. Why? Because total income can always be calculated perfectly from the `transactions` array. Storing it in state would require updating two states simultaneously, leading to bugs. Instead, we use `.reduce()` to calculate it freshly every time the component renders.

## 📝 Assignments

1. **Number Formatting:** Currently, if you type long numbers, the UI gets messy. Create a helper function `formatCurrency(amount)` that returns a nicely formatted string with commas (e.g., `$1,250.00`). Apply it to the summary section.
2. **Delete All History:** Add a button below the list to "Clear History". This requires adding a `DELETE /api/expenses` route on the backend that deletes everything, and sending a fetch request to that route from the frontend.
