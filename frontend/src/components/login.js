import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logger from '../services/logger';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Log the login attempt
      logger.log('LOGIN_ATTEMPT', { email });

      // Call backend login endpoint
      const response = await fetch('http://localhost:5259/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Dispatch custom event to notify App component
        window.dispatchEvent(new Event('userLoggedIn'));
        logger.log('LOGIN_SUCCESS', { email, role: data.user.role });
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please try again.');
        logger.log('LOGIN_FAILED', { email, error: data.message });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      logger.log('LOGIN_ERROR', { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="login-container">
        <div className="login-card">
          <h1>Login to TrackerManager</h1>
          
          {location.state?.message && (
            <div className="success-message">{location.state.message}</div>
          )}
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
