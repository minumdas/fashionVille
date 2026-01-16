import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Register.css';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
        console.log('Registration data:', formData);
        navigate('/');
    };

    return (
        <div className="register-page">
            {/* Left Side - Image/Branding */}
            <div className="register-left">
                <div className="brand-content">
                    <h1>WearVille</h1>
                    <p>Join the fashion revolution</p>
                    <div className="features">
                        <div className="feature-item">
                            <span className="feature-icon">✨</span>
                            <span>Exclusive member discounts</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🚚</span>
                            <span>Free shipping on first order</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">💎</span>
                            <span>Early access to new arrivals</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="register-right">
                <div className="register-form-container">
                    <div className="form-header">
                        <div className="header-left">
                            <div className="icon-circle">
                            <PersonAddIcon style={{ fontSize: 30 }} />
                            </div>
                        </div>

                        <div className="header-right">
                            <h2>Create Account</h2>
                            <p>Fill in your details to get started</p>
                        </div>
                        </div>


                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="input-icon">
                                <PersonAddIcon />
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <EmailIcon />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <PhoneIcon />
                            </div>
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <LockIcon />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <LockIcon />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>

                        <div className="terms">
                            <label>
                                <input type="checkbox" required />
                                <span>I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a></span>
                            </label>
                        </div>

                        <button type="submit" className="register-btn">
                            Create Account
                        </button>

                        <div className="divider">
                            <span>or sign up with</span>
                        </div>

                        <div className="social-buttons">
                            <button type="button" className="social-btn icon-only">
                                <img src="https://www.google.com/favicon.ico" alt="Google" />
                            </button>

                            <button type="button" className="social-btn icon-only">
                                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" />
                            </button>
                            </div>


                        <p className="login-link">
                            Already have an account? <Link to="/">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
