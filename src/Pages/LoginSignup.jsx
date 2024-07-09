import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../Api/index';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    name:'',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Xóa thông báo lỗi khi người dùng nhập lại
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateInput = () => {
    if (state === "Sign Up" && !formData.name) {
      // toast.error("Name is required for signup.");
      setErrors({
        ...errors,
        name: 'Name is required for signup.'
      });
      return false;
    }
    if (!formData.email) {
      setFormData({ ...formData, password: '' });
      setErrors({
        ...errors,
        email: 'Email is required'
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormData({ ...formData, password: '' });
      // toast.error("Email address is invalid.");
      setErrors({
        ...errors,
        email: 'Email address is invalid.'
      });
      return false;
    }
    if (!formData.password) {
      // toast.error("Password is required.");
      setErrors({
        ...errors,
        password: 'Password is required.'
      });
      return false;
    }
    if (formData.password.length < 8) {
      setFormData({ ...formData, password: '' });
      // toast.error("Password must be at least 6 characters long.");
      setErrors({
        ...errors,
        password: 'Password must be at least 6 characters long.'
      });
      return false;
    }
    return true;
  };

  const login = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        document.cookie = `userId=${responseData.userId}; expires=Thu, 01 Jan 2026 00:00:00 UTC; path=/;`;
        window.location.replace('/');
        toast.success("Login successful!");
      } else {
        toast.error(responseData.error);
        setFormData({ ...formData, password: '' });

      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setFormData({ ...formData, password: '' });

    }
  };

  const signup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        document.cookie = `userId=${responseData.userId}; expires=Thu, 01 Jan 2026 00:00:00 UTC; path=/;`;
        window.location.replace('/');
        toast.success("Signup successful!");
      } else {
        toast.error(responseData.error);
        setFormData({ ...formData, password: '' });

      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      setFormData({ ...formData, password: '' });

    }
  };

  const handleSubmit = () => {
    if (validateInput()) {
      if (state === "Login") {
        login();
      } else {
        signup();
      }
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <div>
              {errors.name && <span className='error-notify'>{errors.name}</span>}
              <input
                type='text'
                onChange={handleInputChange}
                placeholder='Your Name'
                name="name"
                value={formData.name}
              />
            </div>
          )}
          <div>
            {errors.email && <span className='error-notify'>{errors.email}</span>}
            <input
              type='text'
              placeholder='Email Address'
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

          </div>
          <div>
            {errors.password && <span className='error-notify'>{errors.password}</span>}

            <input
              type='password'
              placeholder='Password'
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Continue</button>
        <ToastContainer className='state-notice' />
        {state === "Login" ? (
          <p className='loginsingup-login'>
            Create an account? <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className='loginsingup-login'>
            Already have an account? <span onClick={() => setState("Login")}>Login here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type='checkbox' name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
