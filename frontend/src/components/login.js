import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logger from '../services/logger';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Log the login attempt
    logger.log('LOGIN_ATTEMPT', { email });

    // Here you would typically make an API call
    // For now, we'll just redirect to home
    logger.log('LOGIN_SUCCESS', { email });
    navigate('/');
  };

  return (
    <section className="login">
      <div className="login-container">
        <div className="login-card">
          <h1>Login to TrackerManager</h1>
          
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
              />
            </div>

            <button type="submit" className="login-button">
              Sign In
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
