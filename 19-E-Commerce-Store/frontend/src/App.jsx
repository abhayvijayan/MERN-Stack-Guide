import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('shop'); // 'shop' or 'cart'
  const [checkoutData, setCheckoutData] = useState({ customerName: '', email: '', address: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data);
  };

  const addToCart = (product) => {
    // Check if it's already in the cart
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      // Increase quantity
      setCart(cart.map(item => 
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Cart is empty!');

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...checkoutData,
          cart: cart
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Success! Order ID: ${data.orderId}`);
        setCart([]); // Empty the cart
        setView('shop');
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    app: { fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', color: 'white', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px' },
    navBtn: { backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
    card: { border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' },
    btn: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer', borderRadius: '4px', width: '100%' },
    cartItem: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '10px 0', alignItems: 'center' },
    checkoutForm: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '20px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }
  };

  return (
    <div style={styles.app}>
      
      <div style={styles.nav}>
        <h2>TechShop</h2>
        <div>
          <button style={styles.navBtn} onClick={() => setView('shop')}>Shop</button>
          <button style={{...styles.navBtn, marginLeft: '10px'}} onClick={() => setView('cart')}>
            Cart ({cart.reduce((a, c) => a + c.quantity, 0)})
          </button>
        </div>
      </div>

      {view === 'shop' ? (
        <div style={styles.grid}>
          {products.length === 0 ? <p>Loading products...</p> : products.map(p => (
            <div key={p._id} style={styles.card}>
              <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <h3>{p.name}</h3>
              <p style={{ color: '#555' }}>${p.price.toFixed(2)}</p>
              <button style={styles.btn} onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>Your Shopping Cart</h2>
          {cart.length === 0 ? <p>Your cart is empty.</p> : (
            <div>
              {cart.map(item => (
                <div key={item._id} style={styles.cartItem}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
              
              <h3 style={{ textAlign: 'right', marginTop: '20px' }}>Total: ${cartTotal.toFixed(2)}</h3>

              <hr style={{ margin: '30px 0' }} />

              <h3>Checkout Details</h3>
              <form style={styles.checkoutForm} onSubmit={handleCheckout}>
                <input style={styles.input} type="text" placeholder="Full Name" required value={checkoutData.customerName} onChange={e => setCheckoutData({...checkoutData, customerName: e.target.value})} />
                <input style={styles.input} type="email" placeholder="Email" required value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})} />
                <textarea style={styles.input} placeholder="Shipping Address" required value={checkoutData.address} onChange={e => setCheckoutData({...checkoutData, address: e.target.value})} />
                <button style={styles.btn} type="submit">Place Order</button>
              </form>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default App
