import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './added-components/NavBar';

function ProductCreate() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', 
    brand: '', category: '', stock: '',
  });

  useEffect(() => {
    // Fetch the categories
    axios.get("http://localhost:8000/api/categories/")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post('http://localhost:8000/api/products/new', formData, { headers })
      .then((response) => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating product:', error);
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
      <Navbar/>
    <div>
      <button className="btn btn-primary mt-2 mx-2 d-inline-block" onClick={() => navigate(-1)}>Back</button>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Create a New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <input type="text" className="form-control" placeholder='name' name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group mb-2">
              <textarea className="form-control" placeholder='description' name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="form-group mb-2">
              <input type="number" className="form-control" placeholder='price' name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" placeholder='brand' name="brand" value={formData.brand} onChange={handleChange} />
            </div>
            <div className="form-group mb-2">
              <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                <option>Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-2">
              <input type="number" className="form-control" placeholder='stock' name="stock" value={formData.stock} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ProductCreate;
