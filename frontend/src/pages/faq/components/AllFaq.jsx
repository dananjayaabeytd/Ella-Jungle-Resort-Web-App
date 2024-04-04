import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa'; // Import thumbs-up and times icons

const AllFaq = () => {
  const [faqs, setFaqs] = useState([]);
  const [replyInput, setReplyInput] = useState('');

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


  const handleReply = async (faqId) => {
    try {
      await axios.put(`/api/faq/addreply/${faqId}`, { reply: replyInput });
      // Refresh FAQs after reply added
      fetchFaqs();
      setReplyInput(''); // Clear reply input field
    } catch (error) {
      console.error('Error replying to FAQ:', error);
    }
  };

  const handleDeleteReply = async (faqId, replyIndex) => {
    try {
      await axios.put(`/api/faq/deletereply/${faqId}`, { index: replyIndex });
      // Refresh FAQs after reply deleted
      fetchFaqs();
    } catch (error) {
      console.error('Error deleting reply:', error);
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
          <li key={faq._id} className="mb-8 p-10 shadow-md relative">
            <p>{faq.giverName}</p><br></br>
            <h3 className="mb-4 font-bold text-2xl">{faq.faqtitle}</h3>
            <p>{faq.faqdescription}</p>
            <div className="mt-4">
              {/* Form to add reply */}
              <form onSubmit={() => handleReply(faq._id)} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Your reply..."
                  className="w-full border rounded-md px-3 py-2"
                />
                <Button type="submit" color="teal-500">Reply</Button>
              </form>
              {/* Display replies */}
              {faq.replies.length > 0 && (
                <div className="mt-4">
                  {faq.replies.map((reply, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                      <div>
                        <span className="font-bold text-gray-800">Admin:</span> {reply}
                      </div>
                      <Button onClick={() => handleDeleteReply(faq._id, index)} color="red" size="sm">
                        <FaTimes />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <br></br>
            </div>
            <div className="mt-2 flex items-center" style={{ width: '180px' }}>
              <Button onClick={() => handleDelete(faq._id)} color="red" className="ml-2">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFaq;
