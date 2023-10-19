import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './added-components/NavBar.js';
import Rating from 'react-rating-stars-component';
import ReviewList from './added-components/ReviewList.js';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [userId, setUserId] = useState(0);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [rerender, setRerender] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    // Get the specific product
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then((response) => setProduct(response.data.product))
      .catch((error) => console.error("Error fetching product details:", error));

    // Get user ID
    axios.get('http://localhost:8000/api/userinfo/', { headers })
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.error('Error logging in:', error));
  }, [id, rerender]);

  const handleDelete = (productId) => {
    axios.delete(`http://localhost:8000/api/products/delete/${productId}/`, { headers })
      .then(() => navigate("/"))
      .catch((error) => console.error('Error deleting product:', error));
  };

  const reviewsAvailable = product.reviews && product.reviews.length > 0;

  const handleReview = () => {
    const proId = product.id;
    const review = { "rating": rating, "comment": comment };
    axios.post(`http://localhost:8000/api/${proId}/reviews`, review, { headers })
      .then(() => {
        axios.get(`http://localhost:8000/api/products/${id}/`)
          .then((response) => setProduct(response.data.product))
          .catch((error) => console.error("Error fetching product details:", error));
      })
      .catch((error) => console.error('Error adding review:', error));
  };

  const handleDeleteReview = () => {
    const proId = product.id;
    axios.delete(`http://localhost:8000/api/${proId}/reviews/delete`, {headers})
      .then(() => {setRerender(true)})
      .catch((error) => console.error('Error deleting review:', error));
  };


  return (
    <div>
      <Navbar />
      <button onClick={() => navigate(-1)} className="btn btn-primary mt-2 mx-2 d-inline-block">Back</button>
      <div className="container d-flex justify-content-center align-items-center mt-2 mb-5">
        <div className="text-left p-4 border border-dark rounded-3 mx-5">
          <h2>{product.name}</h2>
          <p className='my-2'>{product.description}</p>
          <p className='my-2'>Price: ${product.price}</p>
          <p className='my-2'>Brand: {product.brand}</p>
          <p className='my-2'>Category: {product.category}</p>
          <p className='my-2'>Stock: {product.stock}</p>
          <div className="d-flex align-items-center mb-3">
            <span className='d-inline mr-2'>Ratings: {product.ratings}</span>
          </div>

          {reviewsAvailable ? (
            <ReviewList reviews={product.reviews} userId={userId} onDeleteReview={handleDeleteReview}/>
          ) : (
            <p>No reviews available</p>
          )}
          <div className="btn-group float-end" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              add review</button>

            {userId === product.user ?
              (<Link to={`/product/update/${product.id}`} className="btn btn-success">update</Link>) : ("")}
            {userId === product.user ?
              (<button onClick={() => handleDelete(product.id)} className="btn btn-danger">delete</button>) : ("")}
              
          </div>
        </div>
      </div>

      <div className="modal fade mt-5" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New review</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-1">
                  <label className="col-form-label p-0">Rating</label>
                  <Rating count={5} value={rating} onChange={(newRating) => setRating(newRating)} size={24} activeColor="#ffd700" />
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Comment</label>
                  <textarea rows={4} id="comment" placeholder="Enter your comment" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleReview} data-bs-dismiss="modal">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
