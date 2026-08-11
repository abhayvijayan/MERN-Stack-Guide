require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_ecommerce')
    .then(() => {
        console.log('Connected to MongoDB!');
        seedProducts(); // Seed DB if empty
    })
    .catch((err) => console.error('MongoDB error:', err));


// Helper to add some products if the DB is empty
async function seedProducts() {
    const count = await Product.countDocuments();
    if (count === 0) {
        const sampleProducts = [
            { name: 'Wireless Headphones', price: 99.99, description: 'Noise-cancelling headphones', imageUrl: 'https://via.placeholder.com/200?text=Headphones' },
            { name: 'Mechanical Keyboard', price: 149.50, description: 'RGB Mechanical gaming keyboard', imageUrl: 'https://via.placeholder.com/200?text=Keyboard' },
            { name: 'Gaming Mouse', price: 59.99, description: 'High DPI laser mouse', imageUrl: 'https://via.placeholder.com/200?text=Mouse' }
        ];
        await Product.insertMany(sampleProducts);
        console.log('Database seeded with sample products!');
    }
}

// ==========================================
// ROUTES
// ==========================================

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST to create an order (Checkout)
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, email, address, cart } = req.body;

        // In a real app, you MUST recalculate the total amount on the backend!
        // Never trust the total sent by the frontend (users can modify it in devtools).
        let calculatedTotal = 0;
        const orderItems = [];

        for (let item of cart) {
            // Find the real product in the DB to get the true price
            const product = await Product.findById(item._id);
            if (!product) throw new Error(`Product ${item._id} not found`);

            calculatedTotal += product.price * item.quantity;
            
            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                priceAtPurchase: product.price
            });
        }

        // Create the order
        const newOrder = new Order({
            customerName,
            email,
            address,
            items: orderItems,
            totalAmount: calculatedTotal
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`E-Commerce Backend running on http://localhost:${PORT}`);
});
