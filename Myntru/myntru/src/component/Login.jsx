import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import couponImg from "../coupon.png";

const Login = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // try backend first
    try {
      const res = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          setError('');
          navigate('/home');
          return;
        }
      }
      // if backend responded with 401 or other, show message below and fall through to fallback check
      if (res.status === 401) {
        setError('Invalid username or password');
        return;
      }
    } catch (e) {
      // backend unreachable — fall back to local check below
    }

    // fallback: preserve existing client-side check so feature doesn't break
    const validName = 'admin';
    const validPassword = '12345';

    if (name === validName && password === validPassword) {
      setError('');
      navigate('/home');
    } else {
      setError('Invalid username or password ');
    }
  };

  return (
    <div className='backgrd'>
      <div className="card mx-auto col-11 col-sm-8 col-md-6 col-lg-4">
        <div className="card-body" border="danger">

          <div className='row mt-4 text-center'>
            <img src={couponImg} alt="coupon" className="coupon-img" />
          </div>

          <div className='row mt-4'>
            <div className='col-lg-3'>
              <label>Name</label>
            </div>
            <div className='col-lg-6'>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className='row mt-2'>
            <div className='col-lg-3'>
              <label>Password</label>
            </div>
            <div className='col-lg-6'>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
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

          <div className='row mt-3'>
            <div className='col-lg-3'>
              <button className="btn btn-link">Forgot Password?</button>
            </div>
            <div className='col-lg-6'>
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>

          <div className='row mt-2 text-center'>
            <button className='btn btn-link'>New Registration</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
