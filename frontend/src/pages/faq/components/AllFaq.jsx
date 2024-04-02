import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { Link } from "react-router-dom";
import { FaThumbsUp } from 'react-icons/fa'; // Import thumbs-up icon

const AllFaq = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get('/api/faq');
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleLike = async (faqId) => {
    try {
      await axios.put(`/api/faq/like/${faqId}`);
      // Update the local state to reflect the change
      setFaqs(prevFaqs => prevFaqs.map(faq => {
        if (faq._id === faqId) {
          return { ...faq, likes: faq.likes + 1 };
        }
        return faq;
      }));
    } catch (error) {
      console.error('Error liking FAQ:', error);
    }
  };

  const handleDelete = async (faqId) => {
    try {
      await axios.delete(`/api/faq/deletefaq/${faqId}`);
      setFaqs(faqs.filter(faq => faq._id !== faqId));
      alert('FAQ deleted successfully!');
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Failed to delete FAQ. Please try again.');
    }
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">All FAQs</h1>
        <Link to="/addfaq" className="no-underline">
          <Button className="btn btn-primary bg-green-500">Add FAQ</Button>
        </Link>
      </div>
      <ul className="list-none p-0">
        {faqs.map(faq => (
          <li key={faq._id} className="mb-8 p-10 shadow-md relative"> {/* Decrease margin */}
            <h3 className="mb-4 font-bold text-2xl">{faq.faqtitle}</h3> {/* Increase title size */}
            <p>{faq.faqdescription}</p>
            <div className="mt-4">
              <span className="font-bold">Likes: {faq.likes}</span>
            </div>
            <div className="mt-2 flex items-center" style={{ width: '180px' }}>
              <Button onClick={() => handleLike(faq._id)} color="teal-500">
                <FaThumbsUp /> {/* Render thumbs-up icon */}
              </Button>
              <Button onClick={() => handleDelete(faq._id)} color="red" className="ml-2">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFaq;
