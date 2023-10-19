import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./added-components/NavBar";

function ProductUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", 
    brand: "", category: "", stock: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the categories
    axios.get("http://localhost:8000/api/categories/")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch the product details
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then((response) => {
        setFormData(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .put(`http://localhost:8000/api/products/update/${id}/`, formData, {
        headers,
      })
      .then((response) => {
        navigate(`/product/${id}`);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
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
    <div className="mb-5">
      <button className="btn btn-primary mt-2 mx-2 d-inline-block" onClick={() => navigate(-1)}>Back</button>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Update Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="name" placeholder="name" value={formData.name} onChange={handleChange}/>
            </div>
            <div className="form-group mb-2">
              <textarea className="form-control" name="description" placeholder="description" value={formData.description} onChange={handleChange}/>
            </div>
            <div className="form-group mb-2">
              <input type="number" className="form-control" name="price" placeholder="price" value={formData.price} onChange={handleChange}/>
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="brand" placeholder="brand" value={formData.brand} onChange={handleChange}/>
            </div>
            <div className="form-group mb-2">
              <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-2">
              <input type="number" className="form-control" name="stock" placeholder="stock" value={formData.stock} onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ProductUpdate;
