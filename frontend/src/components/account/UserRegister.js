import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8000/api/register/', formData)
      .then((response) => {
        navigate('/login'); // Redirect to the login page after successful registration
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className='m-2 w-100'>
        <span style={{position:"absolute", top:'10px', right:'10px'}}>
        <a className='btn btn-success mx-2' href='/register'>sign up</a>
        <a className='btn btn-success' href='/login'>sign in</a>
        </span>
      </div>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center w-50 p-5 border border-dark rounded-3">
      <img src="/django_logo.png" alt="Django Logo" className="mb-3" style={{width:'150px'}}/>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <input type="text" className="form-control" name="username" placeholder="Username"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} value={formData.username}/>
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" name="email" placeholder="Email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email}/>
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="password" placeholder="Password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password}/>
          </div>
          <button type="submit" className="btn btn-success">Register</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
