import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Holds the currently viewing post details
  const [comments, setComments] = useState([]); // Holds comments for the selected post
  
  // Forms
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });
  const [newComment, setNewComment] = useState({ text: '', author: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch(`${API_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });
    const savedPost = await res.json();
    setPosts([savedPost, ...posts]);
    setNewPost({ title: '', content: '', author: '' });
  };

  const viewPost = async (id) => {
    // Fetch the single post AND its related comments
    const res = await fetch(`${API_URL}/posts/${id}`);
    const data = await res.json();
    
    setSelectedPost(data.post);
    setComments(data.comments);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.text) return;

    const res = await fetch(`${API_URL}/posts/${selectedPost._id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    });
    const savedComment = await res.json();
    
    // Add the new comment to the bottom of the list
    setComments([...comments, savedComment]);
    setNewComment({ text: '', author: '' });
  };

  // --- STYLING ---
  const styles = {
    app: { display: 'flex', fontFamily: 'sans-serif', height: '100vh', margin: 0 },
    sidebar: { width: '30%', borderRight: '1px solid #ccc', padding: '20px', overflowY: 'auto' },
    main: { width: '70%', padding: '40px', overflowY: 'auto', backgroundColor: '#f9f9f9' },
    input: { display: 'block', width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' },
    btn: { padding: '8px 15px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer' },
    card: { padding: '15px', border: '1px solid #ddd', marginBottom: '10px', cursor: 'pointer', backgroundColor: 'white' },
    commentCard: { padding: '10px', backgroundColor: '#eee', marginBottom: '10px', borderRadius: '5px' }
  };

  return (
    <div style={styles.app}>
      
      {/* SIDEBAR: List of all posts & Create Post Form */}
      <div style={styles.sidebar}>
        <h2>Tech Blog</h2>
        
        <form onSubmit={handleCreatePost} style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#eee' }}>
          <h3>New Post</h3>
          <input style={styles.input} type="text" placeholder="Title" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
          <input style={styles.input} type="text" placeholder="Author name (optional)" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} />
          <textarea style={styles.input} placeholder="Write something..." value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} />
          <button style={styles.btn} type="submit">Publish</button>
        </form>

        {posts.map(post => (
          <div key={post._id} style={styles.card} onClick={() => viewPost(post._id)}>
            <h4 style={{ margin: '0 0 5px 0' }}>{post.title}</h4>
            <small>By: {post.author}</small>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT: View a single post and its comments */}
      <div style={styles.main}>
        {!selectedPost ? (
          <h2>Select a post to read</h2>
        ) : (
          <div>
            <h1>{selectedPost.title}</h1>
            <p style={{ color: 'gray' }}>By {selectedPost.author} on {new Date(selectedPost.createdAt).toLocaleDateString()}</p>
            <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{selectedPost.content}</p>
            
            <hr style={{ margin: '40px 0' }} />
            
            <h3>Comments ({comments.length})</h3>
            
            {/* List existing comments */}
            {comments.map(c => (
              <div key={c._id} style={styles.commentCard}>
                <strong>{c.author}</strong> said:
                <p style={{ margin: '5px 0 0 0' }}>{c.text}</p>
              </div>
            ))}

            {/* Form to add a new comment */}
            <form onSubmit={handleAddComment} style={{ marginTop: '20px' }}>
              <input style={styles.input} type="text" placeholder="Your name (optional)" value={newComment.author} onChange={e => setNewComment({...newComment, author: e.target.value})} />
              <textarea style={styles.input} placeholder="Add a comment..." value={newComment.text} onChange={e => setNewComment({...newComment, text: e.target.value})} required />
              <button style={styles.btn} type="submit">Submit Comment</button>
            </form>

          </div>
        )}
      </div>

    </div>
  )
}

export default App
