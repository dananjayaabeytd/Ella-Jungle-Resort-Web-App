import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const BackgroundContainer = styled.div`
    background-image: url('../../assets/health/uuu.jpg');
    background-size: cover;
    background-position: center;
    height: 100%;
`;

const AppointmentContainer = styled.div`
    text-align: center;
    padding: 15px;
`;

const Form = styled.form`
    background-color: #EDFCE3;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    font-size: 1.2rem;
    margin-bottom: 5px;
    color: #FFFFFF;
    font-weight:bold;
    text-shadow:0 0 10px #0B0C0B;
`;

const Select = styled.select`
    width: 80%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #666666;
    border-radius: 5px;
    outline: none;
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px #0B0C0B;
    }
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #228B22;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #808080;
    }
`;

const AppointmentListCard = styled.div`
    position: fixed;
    top: 150px;
    right: 10%;
    background-color: #00FF00;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 0 10px #0B0C0B;
    z-index: 999; /* Ensure it's above other elements */
`;

const Logo = styled.div`
    background-color: #228B22;
    color: #fff;
    padding: 10px 10px;
    border-radius: 5px;
    font-size: 1.2rem;
    box-shadow: 0 0 10px #0B0C0B;
    transition: background-color 0.3s ease;
    cursor: pointer;
    &:hover {
        background-color: #808080;
    }
`;

const LogoText = styled.span`
    font-weight: bold;
`;

const handleClickLogo = () => {
    // Add functionality to navigate to the appointment list
    window.location.href = '/appointmentView';
    //alert('Navigate to Appointment List');
};


const Appointment = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        contactNumber: '',
        NIC: '', // Added NIC field
        appointmentType: '', // Updated to appointmentType
        appointmentDate: null,
    });

    const [spaPackages, setSpaPackages] = useState([]);

    useEffect(() => {
        fetchSpaPackages();
    }, []);

    const fetchSpaPackages = async () => {
        try {
            const response = await axios.get('/api/spa-packages');
            setSpaPackages(response.data);
        } catch (error) {
            console.error('Error fetching spa packages:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            appointmentDate: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5555/appointments', formData);
            console.log(response.data); // Log the response data
            setFormData({
                firstName: '',
                lastName: '',
                address: '',
                contactNumber: '',
                NIC: '', // Reset NIC field
                appointmentType: '', // Reset appointmentType
                appointmentDate: null,
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Appointment booked successfully!',
            });
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again later.',
            });
        }
    };

    return (
        <BackgroundContainer>
            <AppointmentListCard>
                <Logo onClick={handleClickLogo}>
                    <LogoText>Appointment List</LogoText>
                </Logo>
            </AppointmentListCard>
            <AppointmentContainer>
                <h2 style={{ fontSize: '3rem', color: '#DAFDD8', marginTop: '50px', textShadow: '0 0 10px #0B0C0B' }}>BOOK AN APPOINTMENT</h2>
                <Form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(99, 255, 71, 0.2)' }}>
                    <FormGroup>
                        <Label htmlFor="firstName">First Name:</Label>
                        <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastName">Last Name:</Label>
                        <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="address">Address:</Label>
                        <input type="text" id="address" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="contactNumber">Contact Number:</Label>
                        <input type="text" id="contactNumber" name="contactNumber" placeholder="Enter your contact number" value={formData.contactNumber} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="NIC">NIC:</Label> {/* Added NIC input field */}
                        <input type="text" id="NIC" name="NIC" placeholder="Enter your NIC" value={formData.NIC} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="appointmentDate">Appointment Date:</Label>
                        <DatePicker
                            id="appointmentDate"
                            selected={formData.appointmentDate}
                            onChange={handleDateChange}
                            minDate={new Date()} // Restrict to future dates only
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Select appointment date and time"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="appointmentType">Appointment Type:</Label>
                        <Select id="appointmentType" name="appointmentType" value={formData.appointmentType} onChange={handleChange} required>
                            <option value="">Select Appointment Type</option>
                            {spaPackages.map((spaPackage) => (
                                <option key={spaPackage._id} value={spaPackage.packageName}>
                                    {spaPackage.packageName}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                    <SubmitButton type="submit">Book Appointment</SubmitButton>
                </Form>
            </AppointmentContainer>
        </BackgroundContainer>
    );
};

export default Appointment;
