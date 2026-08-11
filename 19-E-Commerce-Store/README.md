# 19 - E-Commerce Store (Cart & Checkout)

In this project, you will build the core mechanics of a shopping cart and a secure checkout process. You'll handle complex data structures (Arrays of Objects inside a Schema) and crucial security logic.

## Learning Objectives
- Managing Shopping Cart State in React.
- Arrays of Sub-documents in Mongoose.
- The Golden Rule of E-Commerce Security (Backend validation).

## Setup Instructions

### 1. Start the Backend
1. Terminal 1: `cd 19-E-Commerce-Store/backend`
2. `npm install`
3. `node index.js` (Runs on port 5000)
*(Note: When the backend starts for the first time, it will automatically inject 3 sample products into the database!)*

### 2. Start the Frontend
1. Terminal 2: `cd 19-E-Commerce-Store/frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

## Code Explanation

- **Shopping Cart State**: In `App.jsx`, the cart is an array of objects. When adding a product, we use `.find()` to check if it's already there. If it is, we use `.map()` to update the `quantity` of that specific item, rather than adding a duplicate item to the list.
- **The Golden Rule of E-Commerce**: Look at `backend/index.js` in the `POST /api/orders` route. Notice how we **DO NOT** accept a `totalAmount` from the frontend! A hacker could easily send `{ totalAmount: 0.01 }` in the fetch request. Instead, we take the `productId` and `quantity`, query the database for the *true* price of that product, and calculate the total on the backend!

## 📝 Assignments

1. **Quantity Controls:** In the Cart view, add `+` and `-` buttons next to each item so the user can easily adjust quantities without having to go back to the Shop view. Make sure the `-` button removes the item entirely if the quantity drops to 0.
2. **Order History:** Create a new route `GET /api/orders` on the backend, and a new "Order History" view on the frontend that fetches and displays all past orders.
3. **Stripe Integration (Bonus):** Research the `stripe` NPM package and the Stripe Checkout API. How would you replace our simple "Place Order" button with a real credit card payment flow?
