# 02 - Calculator API

In this project, we build a Calculator API. This introduces you to a vital concept in web development: **Receiving data from the client**.

## Learning Objectives
- How to read **Query Parameters** from a URL (`req.query`).
- How to perform basic data validation.
- How to convert string inputs into numbers.
- Returning appropriate HTTP Status codes (e.g., `400 Bad Request`).

## Setup Instructions

1. Open your terminal and navigate to this folder: `cd 02-Calculator-API`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
4. Test it by opening your browser and visiting:
   [http://localhost:3000/add?num1=15&num2=5](http://localhost:3000/add?num1=15&num2=5)

## Code Explanation

When a client wants to send small amounts of data in a GET request, they append it to the URL after a `?`.
For example: `http://localhost:3000/add?num1=15&num2=5`

In Express, you can read these values using `req.query`:
```javascript
const num1 = req.query.num1; // "15"
```
Because URLs are text, everything inside `req.query` is a String. We use `Number()` to convert them to integers/floats before doing math. 

We also check if the conversion failed using `isNaN()` (Is Not A Number). If it failed, we return a `400` status code, which tells the client "You sent a bad request".

## 📝 Assignments

1. **Multiplication Route:** Create a new GET route at `/multiply` that multiplies `num1` and `num2` and returns the result.
2. **Division Route:** Create a new GET route at `/divide`. 
   - *Challenge:* Division by zero is a mathematical error. Add validation in your `/divide` route to check if `num2` is `0`. If it is, return a `400` status code with an error message saying "Cannot divide by zero!".
3. **Dynamic Operation (Bonus):** Create a single route `/calculate` that takes three query parameters: `num1`, `num2`, and `operation` (which could be "add", "subtract", "multiply", etc.). Use a `switch` statement to perform the correct math based on the `operation` string.
