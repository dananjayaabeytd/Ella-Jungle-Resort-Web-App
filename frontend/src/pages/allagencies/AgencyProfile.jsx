import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { DeleteAgency } from './components/DeleteAgency';
import { Link } from 'react-router-dom';

const AgencyDetails = () => {
  const { id } = useParams();
  const [agency, setAgency] = useState(null);

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

  if (!agency) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-full max-w-[40rem] p-6 bg-white shadow-lg rounded-lg'>
        <CardBody>
          <Typography color='gray' size='lg' className='mb-4 font-bold'>
            {agency.agencyName}
          </Typography>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Typography color='gray' className='mb-2'>
                Description: {agency.description}
              </Typography>
              <Typography color='gray'>Address: {agency.address}</Typography>
              <Typography color='gray'>Mobile: {agency.mobile}</Typography>
              <Typography color='gray'>
                Business Registration Number:{' '}
                {agency.businessRegistrationNumber}
              </Typography>
            </div>
            <div>
              <Typography color='gray'>
                Representer Mail: {agency.representerMail}
              </Typography>
              <Typography color='gray'>
                Business Mail: {agency.businessMail}
              </Typography>
              <Typography color='gray'>Fax: {agency.fax}</Typography>
              <Typography color='gray'>
                Tax ID Number: {agency.taxIdNumber}
              </Typography>
              <Typography color='gray'>
                Website Link: {agency.websiteLink}
              </Typography>
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <Link to={`/update/${agency._id}`}>
              <Button color='blue'>Update Profile</Button>
            </Link>

            <DeleteAgency id={agency._id} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AgencyDetails;
