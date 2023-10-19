import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './added-components/NavBar';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [keyword, setKeyword] = useState('');
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };


  useEffect(() => {
    // Get all products :
    axios.get('http://localhost:8000/api/products/', { headers })
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

      // Get user id :
      axios.get('http://localhost:8000/api/userinfo/', { headers })
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  }, []);

  // Search bar : 
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(keyword.toLowerCase());
  });


  // Delete the product : 
  const handleDelete = (productId) => {
    axios.delete(`http://localhost:8000/api/products/delete/${productId}/`, { headers })
      .then((response) => {
        // Remove the deleted product from the products state
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div>
      <Navbar/>
      <div className='mt-2'>
        <Link className='btn btn-primary mx-3'style={{position:"absolute",left:0 }} to={"product/create"}>new product</Link>
        <h2 className='text-center'>Product List</h2>
      </div>
      <span className='d-inline-block'><hr/></span>
      <div className="row mx-2">
      {/* search bar : */}
      <div className='mx-auto mb-3'>
        <input className="form-control" type="search" placeholder="Search" aria-label="Search" 
        value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
      </div>

        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-3">{product.name}</h4>
                <p className="card-text mb-1">Price : ${product.price}</p>
                <p className="card-text mb-1">Brand : {product.brand}</p>
                <p className="card-text mb-1">Category : {product.category}</p>
                <p className="card-text mb-1">Ratings : {product.ratings}</p>

                <div className="btn-group float-end" role="group" aria-label="Basic example">
                  <Link to={`/product/${product.id}`} className="btn btn-primary">show</Link>
                  {userId === product.user ?
                    (<Link to={`/product/update/${product.id}`} className="btn btn-success">update</Link>): ""}
                  {userId === product.user ?
                    (<button onClick={() => handleDelete(product.id)} className="btn btn-danger">delete</button>): ""}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
