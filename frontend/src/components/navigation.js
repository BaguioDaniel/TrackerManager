import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ user: propUser }) {
  const [user, setUser] = useState(propUser);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(propUser);
  }, [propUser]);

  // Also check localStorage on mount and listen for changes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for login/logout events
    const handleUserLoggedIn = () => {
      const userFromStorage = localStorage.getItem('user');
      if (userFromStorage) {
        setUser(JSON.parse(userFromStorage));
      }
    };

    const handleUserLoggedOut = () => {
      setUser(null);
    };

    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    window.addEventListener('userLoggedOut', handleUserLoggedOut);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Dispatch custom event to notify App component
    window.dispatchEvent(new Event('userLoggedOut'));
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span className="logo">TrackerManager</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Projects</Link></li>
        <li><a href="#tasks">Tasks</a></li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            <li className="user-info">
              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || user.email}
              {user.role === 'Manager' && <span className="manager-badge-nav">Manager</span>}
            </li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;