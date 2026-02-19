import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Homepage from './components/homepage';
import Features from './components/features';
import Footer from './components/footer';
import Tasks from './components/tasks';
import ProjectDetail from './components/project-detail';
import { createContentfulClient, fetchContentfulProjects } from './utils/contentfulUtils';
import { LOG_EVENTS } from './utils/constants';

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const client = createContentfulClient();
    if (!client) {
      setError('Missing Contentful configuration');
      return;
    }

    fetchContentfulProjects(client)
      .then(items => setProjects(items))
      .catch(err => setError(err.message));
  }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={
            <>
              <Homepage />
              <Features />
              <Tasks projects={projects} />
            </>
          } />
          <Route path="/projects/:slug" element={<ProjectDetail projects={projects} />} />
        </Routes>
        <Footer />
        {error && <p>Error: {error}</p>}
      </div>
    </Router>
  );
}

export default App;