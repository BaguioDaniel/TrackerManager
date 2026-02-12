import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import Navigation from './components/navigation';
import Homepage from './components/homepage';
import Features from './components/features';
import Footer from './components/footer';
import Tasks from './components/tasks';

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!process.env.REACT_APP_CONTENTFUL_SPACE_ID || !process.env.REACT_APP_CONTENTFUL_ACCESS_KEY) {
      setError('Missing environment variables');
      return;
    }

    const client = createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_KEY,
    });

    client.getEntries({ content_type: 'projects' })
      .then(res => setProjects(res.items))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <Navigation />
      <Homepage />
      <Features />
      <Tasks projects={projects} />
      <Footer />
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default App;