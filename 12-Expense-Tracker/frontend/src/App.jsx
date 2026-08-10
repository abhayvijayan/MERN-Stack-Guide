import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/expenses';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ description: '', amount: '', type: 'expense' });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    try {
      const payload = {
        description: formData.description,
        amount: Number(formData.amount),
        type: formData.type
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const newTransaction = await res.json();
      
      setTransactions([newTransaction, ...transactions]);
      setFormData({ description: '', amount: '', type: 'expense' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Derived State (Calculated on every render)
  // We don't need to put these in `useState` because they can be calculated directly from `transactions`.
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // Styling
  const styles = {
    app: { maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' },
    summary: { display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' },
    form: { display: 'flex', gap: '10px', marginBottom: '20px' },
    input: { flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' },
    btn: { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    list: { listStyle: 'none', padding: 0 },
    item: (type) => ({
      display: 'flex', justifyContent: 'space-between', padding: '15px', 
      borderLeft: `5px solid ${type === 'income' ? '#28a745' : '#dc3545'}`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '10px', backgroundColor: 'white'
    })
  };

  return (
    <div style={styles.app}>
      <h1 style={{ textAlign: 'center' }}>Expense Tracker</h1>

      <div style={styles.summary}>
        <div>
          <h3>Balance</h3>
          <h2 style={{ color: balance >= 0 ? '#28a745' : '#dc3545' }}>${balance.toFixed(2)}</h2>
        </div>
        <div>
          <h3>Income</h3>
          <h2 style={{ color: '#28a745' }}>${totalIncome.toFixed(2)}</h2>
        </div>
        <div>
          <h3>Expenses</h3>
          <h2 style={{ color: '#dc3545' }}>${totalExpense.toFixed(2)}</h2>
        </div>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input 
          type="text" name="description" placeholder="Description" 
          value={formData.description} onChange={handleInputChange} style={styles.input} 
        />
        <input 
          type="number" name="amount" placeholder="Amount" 
          value={formData.amount} onChange={handleInputChange} style={{...styles.input, maxWidth: '100px'}} 
        />
        <select name="type" value={formData.type} onChange={handleInputChange} style={styles.input}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit" style={styles.btn}>Add</button>
      </form>

      <h3>History</h3>
      <ul style={styles.list}>
        {transactions.map(t => (
          <li key={t._id} style={styles.item(t.type)}>
            <span>{t.description}</span>
            <span>
              {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
              <button 
                onClick={() => deleteTransaction(t._id)}
                style={{ marginLeft: '15px', background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}
              >
                x
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
