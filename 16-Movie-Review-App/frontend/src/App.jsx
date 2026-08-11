import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/movies';

function App() {
  const [movies, setMovies] = useState([]);
  
  // Pagination & Filtering State
  const [genreFilter, setGenreFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3; // Show 3 movies per page

  // Form State
  const [formData, setFormData] = useState({ title: '', genre: 'Action', rating: 5, review: '' });

  // Re-fetch whenever currentPage or genreFilter changes!
  useEffect(() => {
    fetchMovies();
  }, [currentPage, genreFilter]);

  const fetchMovies = async () => {
    try {
      // Build the URL with query parameters
      const url = `${API_URL}?genre=${genreFilter}&page=${currentPage}&limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();
      
      setMovies(data.movies);
      setTotalPages(data.totalPages || 1);
      
      // If we filter and the new result has fewer pages than our current page, go back to page 1
      if (data.currentPage > data.totalPages && data.totalPages > 0) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.review) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ title: '', genre: 'Action', rating: 5, review: '' });
      // Re-fetch to get the updated list
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  // STYLES
  const styles = {
    app: { fontFamily: 'sans-serif', maxWidth: '800px', margin: '40px auto', padding: '0 20px' },
    form: { display: 'grid', gap: '10px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', marginBottom: '30px' },
    input: { padding: '8px' },
    btn: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' },
    filterBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', backgroundColor: '#333', color: 'white', borderRadius: '4px' },
    card: { border: '1px solid #ccc', padding: '15px', borderRadius: '4px', marginBottom: '15px' },
    pagination: { display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', marginTop: '20px' }
  };

  return (
    <div style={styles.app}>
      <h1>Movie Reviews</h1>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <h3>Add a Review</h3>
        <input style={styles.input} type="text" name="title" placeholder="Movie Title" value={formData.title} onChange={handleInputChange} required />
        
        <select style={styles.input} name="genre" value={formData.genre} onChange={handleInputChange}>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
        
        <input style={styles.input} type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleInputChange} />
        
        <textarea style={styles.input} name="review" placeholder="Write your review..." value={formData.review} onChange={handleInputChange} required />
        <button style={styles.btn} type="submit">Submit Review</button>
      </form>

      <div style={styles.filterBar}>
        <div>
          <label>Filter by Genre: </label>
          <select value={genreFilter} onChange={(e) => {
            setGenreFilter(e.target.value);
            setCurrentPage(1); // Always reset to page 1 when filtering
          }}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>
        <span>Showing Page {currentPage} of {totalPages}</span>
      </div>

      <div>
        {movies.length === 0 ? <p>No movies found.</p> : movies.map(movie => (
          <div key={movie._id} style={styles.card}>
            <h3 style={{ margin: '0 0 5px 0' }}>{movie.title} ({movie.rating}/5 ⭐)</h3>
            <span style={{ backgroundColor: '#eee', padding: '3px 8px', borderRadius: '10px', fontSize: '12px' }}>{movie.genre}</span>
            <p>{movie.review}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => prev - 1)}
          style={{ padding: '5px 10px' }}
        >
          Previous
        </button>
        
        <span>Page {currentPage}</span>
        
        <button 
          disabled={currentPage === totalPages || totalPages === 0} 
          onClick={() => setCurrentPage(prev => prev + 1)}
          style={{ padding: '5px 10px' }}
        >
          Next
        </button>
      </div>

    </div>
  )
}

export default App
