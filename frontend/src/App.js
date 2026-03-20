import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/navigation';
import Homepage from './components/homepage';
import ManagerHomepage from './components/manager-homepage';
import LandingPage from './components/landing-page';
import Features from './components/features';
import Footer from './components/footer';
import Tasks from './components/tasks';
import TasksPage from './components/tasks-page';
import Projects from './components/projects';
import ProjectDetail from './components/project-detail';
import Login from './components/login';
import Signup from './components/signup';
import GetStarted from './components/get-started';
import { createContentfulClient, fetchContentfulProjects } from './utils/contentfulUtils';
import { LOG_EVENTS } from './utils/constants';

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for storage changes (from other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // For same-tab changes, listen for custom event
    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
    };
  }, []);

  const handleStorageChange = (e) => {
    if (e.key === 'user') {
      if (e.newValue) {
        setUser(JSON.parse(e.newValue));
      } else {
        setUser(null);
      }
    }
  };

  const handleUserLogin = (e) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const handleUserLogout = () => {
    setUser(null);
  };

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

  // Determine which homepage to show based on user role
  const getHomepageComponent = () => {
    if (!user) {
      // If not logged in, show landing page
      return <LandingPage />;
    }

    if (user.role === 'Manager') {
      return <ManagerHomepage />;
    }

    return <Homepage />;
  };

  return (
    <Router>
      <div>
        {user && <Navigation user={user} />}
        <Routes>
          <Route path="/" element={
            <>
              {getHomepageComponent()}
            </>
          } />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/get-started" element={user ? <GetStarted /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={user ? <TasksPage /> : <Navigate to="/login" />} />
          <Route path="/projects" element={user ? <Projects projects={projects} /> : <Navigate to="/login" />} />
          <Route path="/projects/:slug" element={<ProjectDetail projects={projects} />} />
        </Routes>
        {user && <Footer />}
        {error && <p>Error: {error}</p>}
      </div>
    </Router>
  );
}

export default App;