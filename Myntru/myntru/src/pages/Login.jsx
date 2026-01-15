import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import couponImg from "../coupon.png";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const abortRef = useRef(null);

  const handleLogin = async () => {
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
      // backend unreachable → fallback
      const validName = 'admin';
      const validPassword = '12345';

      if (name === validName && password === validPassword) {
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backgrd">
      <div className="card mx-auto col-11 col-sm-8 col-md-6 col-lg-4">
        <div className="card-body">

          <div className="row mt-4 text-center">
            <img
              src={couponImg}
              alt="coupon"
              className="coupon-img"
              style={{ maxHeight: '150px', objectFit: 'contain' }}
            />
          </div>

          <div className="row mt-4">
            <div className="col-lg-3">
              <label>Name</label>
            </div>
            <div className="col-lg-6">
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-lg-3">
              <label>Password</label>
            </div>
            <div className="col-lg-6">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="row mt-2">
              <div className="col text-danger text-center">
                {error}
              </div>
            </div>
          )}

          <div className="row mt-3">
            <div className="col-lg-6 mx-auto text-center">
              <button
                className="btn btn-primary w-100"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>

          <div className="row mt-2 text-center">
            <button
              className="btn btn-link"
              onClick={() => navigate('/register')}
            >
              New Registration
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
