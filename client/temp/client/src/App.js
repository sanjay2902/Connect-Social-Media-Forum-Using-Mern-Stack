import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // Fetch data from the backend
  useEffect(() => {
    axios.get('http://localhost:4000/api/posts')
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.error('Error fetching data', err);
        setError('Failed to fetch data.');
      });
  }, []);

  // Function to handle delete request
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/posts/${id}`)
      .then(() => {
        setData(data.filter(post => post._id !== id));
      })
      .catch(err => {
        console.error('Error deleting post', err);
        setError('Failed to delete post.');
      });
  };

  // Function to handle post submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content };

    axios.post('http://localhost:4000/api/posts', newPost)
      .then(response => {
        setData([...data, response.data]);
        setTitle('');
        setContent('');
      })
      .catch(err => {
        console.error('Error creating post', err);
        setError('Failed to create post.');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Posts</h2>
      <ul>
        {data.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
