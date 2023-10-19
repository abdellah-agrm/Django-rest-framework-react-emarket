// ReviewList.js
import React from 'react';
import Rating from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ReviewList({ reviews, userId, onDeleteReview }) {
  const handleDeleteClick = (reviewId) => {
    onDeleteReview(reviewId);
  };

  return (
    <div>
      {reviews.map((pr) => (
        <div key={pr.id} className="card mb-3">
          <div className="card-body px-3 my-0">
            <div className="d-flex align-items-center">
              <img src="/icon.png" alt="User Icon" className="rounded-circle me-3" style={{ height: "40px", width: "40px" }} />
              <div>
                <h6 className="card-title m-0">{pr.user_name}</h6>
                <Rating className="card-text m-0" value={parseInt(pr.rating)} edit={false} readOnly />
              </div>
            </div>
            <p className="card-text p-0 m-0">{pr.comment}</p>

            {userId === pr.user && (
              <a onClick={() => handleDeleteClick(pr.id)} className='float-end' style={{cursor:"pointer"}}>
                <FontAwesomeIcon icon={faTrash} style={{ color: '#d9534f', fontSize:"18px"}}/>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
