import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const starStyles = {
  marginRight: "3px",
  color: "#ffc107",
  fontSize: "1.5rem",
};

const renderStarRating = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} style={starStyles}>★</span>);
    } else {
      stars.push(<span key={i} style={starStyles}>☆</span>);
    }
  }
  return stars;
};



const Uniqueagencyfeedback = () => {
  const [allFeedback, setFeedback] = useState([]);
  const userInfo = useSelector(state => state.auth.userInfo);
  const { id } = useParams();

  useEffect(() => {
    const giverId = userInfo ? userInfo._id : null;
    if (giverId) {
      fetchFeedbacks(giverId);
    } else {
      setFeedback([]);
    }
  }, [userInfo]);

  const fetchFeedbacks = async (giverId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/agencyfeedbacks/feedbacksByAgencyId/${id}`);
      setFeedback(response.data);
    } catch (error) {
      console.error("An error occurred while fetching feedbacks.", error.message);
    }
  };


  // Function to format the createdAt date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-2xl">Agency Feedback</h1>
      </div>
      {allFeedback.length > 0 ? (
        <ul className="list-none p-0">
          {allFeedback.map((feedback) => (
            <li key={feedback._id} className="mb-8 p-10 shadow-md relative">
              <p className="font-bold">{feedback.giverName}</p>
              <p className="text-sm text-gray-500">{formatDate(feedback.createdAt)}</p><br />
              <h3 className="mb-4 font-bold text-2xl">{feedback.fbtitle}</h3>
              <p className="font-bold">{feedback.fbdescription}</p>
              <div className="mt-4">
                {renderStarRating(feedback.rating)}
              </div>
              <br/>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-xl">No Feedback to display.</p><br/><br/>
        </div>
      )}
    </div>
  );
};

export default Uniqueagencyfeedback;
