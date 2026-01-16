import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import couponImg from "../coupon.png"; // Using this as brand logo for now if no other available
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const abortRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    // abort any previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, password }),
        signal: controller.signal
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.token) {
          localStorage.setItem('token', data.token);
          navigate('/home');
          return;
        }
      }

      if (res.status === 401) {
        setError('Invalid username or password');
        return;
      }

      setError('Login failed. Please try again.');

    } catch (err) {
      if (err.name === 'AbortError') return;

      // backend unreachable → fallback (kept for demo)
      const validName = 'admin';
      const validPassword = '12345';

      if (name === validName && password === validPassword) {
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } finally {
      if (abortRef.current === controller) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      {/* Branding Side */}
      <div className="login-branding">
        <div className="brand-wrapper">
          <img src={couponImg} alt="WearVille Logo" className="brand-logo-img" />
          <h1 className="brand-title">WearVille</h1>
          <p className="brand-subtitle">
            Discover the latest fashion trends and elevate your style with our exclusive collection.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="login-form-container">
        <div className="login-card">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Please login to your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <span className="input-icon">
                <PersonOutlineIcon />
              </span>
              <input
                className="custom-input"
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <LockOutlinedIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="custom-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>

            {error && (
              <div className="error-msg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-login"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="register-link">
              New here?
              <Link to="/register">Create an Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
