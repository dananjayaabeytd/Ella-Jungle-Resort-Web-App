import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

function Icon({ id, open }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className={`${
        id === open ? 'rotate-180' : ''
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
      />
    </svg>
  );
}

export function FAQsection() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFAQsWithMostLikes();
  }, []);

  const fetchFAQsWithMostLikes = async () => {
    try {
      const response = await axios.get('/api/faq');
      const sortedFaqs = response.data.sort((a, b) => b.likes - a.likes);
      setFaqs(sortedFaqs.slice(0, 3));
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const [open, setOpen] = React.useState(0);

  const handleOpen = value => setOpen(open === value ? 0 : value);

  return (
    <div className='my-20 max-w-[800px] mx-auto'>
      <h1 className='pb-10 mb-6 text-4xl font-bold text-center'>
        Frequently Asked Questions
      </h1>
      {faqs.map((faq, index) => (
        <Accordion key={index} open={open === index + 1} icon={<Icon id={index + 1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(index + 1)}>
            {faq.faqtitle}
          </AccordionHeader>
          <AccordionBody>
            {faq.faqdescription}
          </AccordionBody>
        </Accordion>
      ))}
      <div className="text-center mt-6">
        <Link to="/faq" className="text-green-600 font-bold hover:text-green-800">View More FAQs</Link>
      </div>
    </div>
  );
}
