import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/recipes';
// Since our images are hosted on the backend port 5000, we need the base url
const BACKEND_URL = 'http://localhost:5000/';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({ title: '', ingredients: '', instructions: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When uploading a file, e.target.files is an array of files. We grab the first one.
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.ingredients) return;

    // Because we are sending a file (binary data), we CANNOT use JSON.stringify()
    // We MUST use the native FormData object.
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('ingredients', formData.ingredients);
    submitData.append('instructions', formData.instructions);
    
    if (imageFile) {
      // The first argument 'image' must match exactly what `upload.single('image')` expects on the backend!
      submitData.append('image', imageFile);
    }

    try {
      // Notice we do NOT set 'Content-Type': 'application/json' when using FormData.
      // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
      const res = await fetch(API_URL, {
        method: 'POST',
        body: submitData
      });
      
      const newRecipe = await res.json();
      setRecipes([newRecipe, ...recipes]);
      
      // Reset
      setFormData({ title: '', ingredients: '', instructions: '' });
      setImageFile(null);
      // To reset the file input visually, we'd normally use a ref, but keeping it simple here
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    app: { fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' },
    form: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '30px' },
    input: { padding: '10px' },
    textarea: { padding: '10px', minHeight: '80px' },
    btn: { padding: '10px', backgroundColor: '#e67e22', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
    card: { border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' },
    image: { width: '100%', height: '200px', objectFit: 'cover', backgroundColor: '#eee' },
    cardContent: { padding: '15px' }
  };

  return (
    <div style={styles.app}>
      <h1>My Recipe Book</h1>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <h3>Add New Recipe</h3>
        <input style={styles.input} type="text" name="title" placeholder="Recipe Name" value={formData.title} onChange={handleInputChange} required />
        <textarea style={styles.textarea} name="ingredients" placeholder="Ingredients (comma separated)" value={formData.ingredients} onChange={handleInputChange} required />
        <textarea style={styles.textarea} name="instructions" placeholder="Cooking Instructions" value={formData.instructions} onChange={handleInputChange} required />
        
        <label>Recipe Image:</label>
        {/* accept="image/*" restricts the file picker to only images */}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        
        <button style={styles.btn} type="submit">Save Recipe</button>
      </form>

      <div style={styles.grid}>
        {recipes.map(recipe => (
          <div key={recipe._id} style={styles.card}>
            {/* If an imageUrl exists, we append it to the BACKEND_URL because that is where the static files are served */}
            {recipe.imageUrl ? (
              <img src={`${BACKEND_URL}${recipe.imageUrl}`} alt={recipe.title} style={styles.image} />
            ) : (
              <div style={styles.image}> {/* Placeholder */} </div>
            )}
            <div style={styles.cardContent}>
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions.substring(0, 50)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
