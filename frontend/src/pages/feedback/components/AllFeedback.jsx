import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteFeedback from "./DeleteFeedback";
import { Button } from '@material-tailwind/react';

const starStyles = {
  marginRight: "3px",
  color: "#ffc107",
  fontSize: "1.5rem", // Adjust star size
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

const AllFeedback = () => {
  const [allFeedback, setFeedback] = useState([]);

  useEffect(() => {
    function getFeedback() {
      axios.get("http://localhost:5000/api/feedbacks/")
        .then((res) => {
          setFeedback(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getFeedback();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedbacks/deletefeedback/${feedbackId}`);
      setFeedback(allFeedback.filter(feedback => feedback._id !== feedbackId));
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting Feedback.", error.message);
      alert("Error deleting feedback. Please try again.");
    }
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">All Feedback</h1>
        <div>
          {/* My Feedback Button */}
          <Link to="/MyFeedback" className="no-underline mr-2">
            <Button className="btn btn-primary bg-green-500">My Feedback</Button>
          </Link>
          {/* Add Feedback Button */}
          <Link to="/AddFeedback" className="no-underline">
            <Button className="btn btn-primary bg-green-500">Enter Feedback</Button>
          </Link>
        </div>
      </div>
      <ul className="list-none p-0">
        {allFeedback && allFeedback.map((feedback) => (
          <li key={feedback._id} className="mb-8 p-10 shadow-md relative">
            <p className="font-bold">{feedback.giverName}</p><br></br>
            <h3 className="mb-4 font-bold text-2xl">{feedback.fbtitle}</h3>
            <p className="font-bold">{feedback.fbdescription}</p>
            <div className="mt-4">
              {renderStarRating(feedback.rating)}
            </div>
            <DeleteFeedback feedbackId={feedback._id} onDeleteFeedback={() => handleDeleteFeedback(feedback._id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFeedback;
