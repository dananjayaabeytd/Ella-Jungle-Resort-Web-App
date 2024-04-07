import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function UpdateAgency() {
  const { id } = useParams();
  const [agency, setAgency] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgencyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/agencies/get/${id}`
        );
        setAgency(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencyDetails();
  }, [id]);

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

  useEffect(() => {
    if (agency) {
      setAgencyName(agency.agencyName);
      setAddress(agency.address);
      setImg(agency.img);
      setMobile(agency.mobile);
      setBusinessRegistrationNumber(agency.businessRegistrationNumber);
      setRepresenterMail(agency.representerMail);
      setBusinessMail(agency.businessMail);
      setFax(agency.fax);
      setTaxIdNumber(agency.taxIdNumber);
      setDescription(agency.description);
      setWebsiteLink(agency.websiteLink);
    }
  }, [agency]);

  const handleSubmit = e => {
    e.preventDefault();

    const updatedAgency = {
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
      .put(`http://localhost:5000/api/agencies/update/${id}`, updatedAgency)
      .then(() => {
        toast.success('Form submitted successfully!');
        navigate(`/${id}`);
      })
      .catch(err => {
        console.error(err);
        toast.error('Error submitting form!');
      });
  };

  if (!agency) {
    return <div>Loading...</div>;
  }
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
          onSubmit={handleSubmit}
        >
          Update Agency Details
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

export default UpdateAgency;
