# 05 - User Auth API (JWT & bcrypt)

In this project, you will learn one of the most critical parts of web development: **Authentication**.
You will build a system to securely register users and log them in using JSON Web Tokens (JWT).

## Learning Objectives
- Hashing passwords using `bcryptjs` (NEVER store plain-text passwords!).
- Comparing hashed passwords during Login.
- Generating JSON Web Tokens (JWT) using `jsonwebtoken`.
- Validating unique constraints in Mongoose (e.g., email must be unique).

## Setup Instructions

1. Navigate to this folder: `cd 05-User-Auth-API`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB connection string and a secret key:
   ```env
   # .env
   # MONGO_URI=mongodb+srv://... (or leave blank for localhost)
   JWT_SECRET=my_super_secret_key_12345
   PORT=3000
   ```
4. Start the server:
   ```bash
   node index.js
   ```

## Code Explanation

- **bcrypt**: If a database is hacked, you don't want the hackers to see everyone's passwords. `bcrypt` converts a password like "password123" into a random string of characters (a hash). When the user logs in, we use `bcrypt.compare()` to see if the password they typed matches the hash.
- **JWT (JSON Web Token)**: HTTP is stateless (it forgets who you are immediately). To stay logged in, the server gives the user a token upon successful login. The user's frontend (React app) will save this token and attach it to future requests.

## 📝 Assignments

1. **Test Registration:** Open Postman or Thunder Client and send a `POST` request to `http://localhost:3000/register` with a JSON body containing `username`, `email`, and `password`. Verify that you get a success message.
2. **Test Login:** Send a `POST` request to `http://localhost:3000/login` with your `email` and `password`. You should receive a long string called a Token.
3. **Protected Route (Challenge):** Create a new file called `middleware/auth.js`. Write an Express middleware function that checks if a `Authorization` header exists in the request. If it does, use `jwt.verify()` to validate the token. If it's valid, allow the request to proceed using `next()`. Finally, create a route `app.get('/profile', authMiddleware, (req, res) => { ... })` that returns the logged-in user's data.
