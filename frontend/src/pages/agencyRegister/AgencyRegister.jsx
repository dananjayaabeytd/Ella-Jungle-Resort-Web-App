import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function AgencyRegister() {
  const [agencyName, setAgencyName] = useState('');
  const [address, setAddress] = useState('');
  const [img, setImg] = useState('');
  const [mobile, setMobile] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState('');
  const [representerMail, setRepresenterMail] = useState('');
  const [businessMail, setBusinessMail] = useState('');
  const [fax, setFax] = useState('');
  const [taxIdNumber, setTaxIdNumber] = useState('');
  const [description, setDescription] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const newAgency = {
      agencyName,
      address,
      img,
      mobile,
      businessRegistrationNumber,
      representerMail,
      businessMail,
      fax,
      taxIdNumber,
      description,
      websiteLink,
    };

    axios
      .post('http://localhost:5000/api/agencies/add', newAgency)
      .then(() => {
        toast.success('Form submitted successfully!');
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <div className='flex items-center justify-center h-screen '>
      <form
        onSubmit={handleSubmit}
        className='max-w-md px-8 py-6 bg-white rounded shadow-md'
      >
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Agency Name'
              value={agencyName}
              onChange={e => setAgencyName(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Representer Mail'
              value={representerMail}
              onChange={e => setRepresenterMail(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Business Mail'
              value={businessMail}
              onChange={e => setBusinessMail(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Fax'
              value={fax}
              onChange={e => setFax(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              placeholder='Business Mobile'
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='TAX ID'
              value={taxIdNumber}
              onChange={e => setTaxIdNumber(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Agency website'
              value={websiteLink}
              onChange={e => setWebsiteLink(e.target.value)}
            />
          </div>
          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Business Reg.No'
              value={businessRegistrationNumber}
              onChange={e => setBusinessRegistrationNumber(e.target.value)}
            />
          </div>

          <div>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='image'
              value={img}
              onChange={e => setImg(e.target.value)}
            />
          </div>
        </div>
        <button
          className='w-full px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Register Agency
        </button>
        <p className='mt-2 text-sm text-center'>
          Already have an account?{' '}
          <Link
            to='/sign-in'
            className='font-medium text-green-500 hover:text-green-800'
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AgencyRegister;
