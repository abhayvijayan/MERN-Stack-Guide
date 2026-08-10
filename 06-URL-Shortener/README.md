# 06 - URL Shortener API

In this project, you will build a backend service similar to bit.ly. It takes a long, ugly URL and generates a short, unique code. When users visit the short link, they are automatically redirected to the original long URL!

## Learning Objectives
- Understanding HTTP Redirects (`res.redirect()`).
- Generating unique identifiers (using the `shortid` package).
- Incrementing database values (tracking how many times a link was clicked).

## Setup Instructions

1. Navigate to this folder: `cd 06-URL-Shortener`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional, defaults to localhost):
   ```env
   # .env
   # MONGO_URI=mongodb+srv://...
   PORT=3000
   BASE_URL=http://localhost:3000
   ```
4. Start the server:
   ```bash
   node index.js
   ```

## Code Explanation

- **`shortid` package**: Instead of using long MongoDB `_id` strings (like `5f9e2...`), we use `shortid` to generate small codes like `bV8s9j`.
- **`res.redirect(url)`**: When the server receives a request for a short code, it looks up the original URL in the database and sends a `302 Redirect` response to the browser, telling it to go to the new destination.
- **Click Tracking**: Every time the redirect route is hit, we do `url.clicks++` and `url.save()` to keep track of analytics.

## 📝 Assignments

1. **Test the API:**
   - Open Postman, make a `POST` to `http://localhost:3000/api/shorten` with a JSON body:
     ```json
     { "longUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
     ```
   - Copy the generated `shortUrl` and paste it into your browser. You should be redirected!
2. **Analytics Route:** Create a new `GET` route at `/api/analytics/:code` that looks up the URL code in the database and returns just the number of `clicks` it has received.
3. **Custom URL Code (Bonus):** Modify the `POST /api/shorten` route to accept an optional `customCode` in the request body. If the user provides one (e.g., "my-portfolio"), use that instead of generating a random `shortid`. Be sure to check if the custom code is already taken!
