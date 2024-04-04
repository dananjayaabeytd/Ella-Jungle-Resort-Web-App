import React, { useState } from 'react';
import Header from '../../components/header';
import styled from 'styled-components';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import backgroundImage from '../../images/uuu.jpg'; // Import your background image here

const BackgroundContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    height: 100%; /* Ensure it covers the entire viewport height */
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

const Input = styled.input`
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

const AppointmentTypeLabel = styled(Label)`
    font-weight: bold;
`;

const CheckboxGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const CheckboxLabel = styled.label`
    margin-right: 20px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    text-shadow:0 0 10px #0B0C0B;
`;

const PriceLabel = styled.span`
    font-weight: bold;
    margin-left: 10px;
    color: #52FF2E;
`;

const TotalPriceLabel = styled.span`
    font-weight: bold;
    font-size: 20px;
    color: #193924;
    margin-top: 10px;
    margin-bottom: 10px;
    display: block;
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

const PlaceholderInput = styled(Input)`
    &::placeholder {
        color: #aaa;
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
    window.location.href = '/AppointmentView';
    //alert('Navigate to Appointment List');
};

const Appointment = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        contactNumber: '',
        NIC: '', // Added NIC field
        appointmentTypes: [],
        appointmentDate: null,
        totalPrice: 0,
    });

    const [totalPrice, setTotalPrice] = useState(0);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'appointmentTypes') {
            const type = value;
            let newPrice = totalPrice;
            if (checked) {
                newPrice += getAppointmentPrice(type);
            } else {
                newPrice -= getAppointmentPrice(type);
            }
            setTotalPrice(newPrice);
            setFormData({
                ...formData,
                [name]: checked
                    ? [...formData.appointmentTypes, value]
                    : formData.appointmentTypes.filter((type) => type !== value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            appointmentDate: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate first name
        if (formData.firstName.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter your first name!',
            });
            return; // Exit early if validation fails
        }

        // Perform similar validation for other fields...
        
        // If all validations pass, proceed with form submission
        let calculatedTotalPrice = 0;
        formData.appointmentTypes.forEach((type) => {
            calculatedTotalPrice += getAppointmentPrice(type);
        });
        const dataToSend = {
            ...formData,
            totalPrice: calculatedTotalPrice,
        };
        try {
            const response = await axios.post('http://localhost:5555/appointments', dataToSend);
            console.log(response.data); // Log the response data
            // Clear form data after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                address: '',
                contactNumber: '',
                NIC: '', // Reset NIC field
                appointmentTypes: [],
                appointmentDate: null,
                totalPrice: 0,
            });
            setTotalPrice(0); // Reset total price to 0
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

    const getAppointmentPrice = (type) => {
        switch (type) {
            case 'Consultation':
                return 50;
            case 'Relaxation':
                return 60;
            case 'Treatment':
                return 70;
            default:
                return 0;
        }
    };

    return (
        <>
        <BackgroundContainer>
            <Header />
            <AppointmentContainer >
            <h2 style={{fontSize:'3rem',color:'#DAFDD8',margintop: '50px',textshadow:'0 0 10px #0B0C0B'}}>BOOK AN APPOINTMENT</h2>
                <Form onSubmit={handleSubmit} style={{backgroundColor:'rgba(99, 255, 71, 0.2)'}}>
                    <FormGroup >
                        <Label htmlFor="firstName">First Name:</Label>
                        <PlaceholderInput type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastName">Last Name:</Label>
                        <PlaceholderInput type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="address">Address:</Label>
                        <PlaceholderInput type="text" id="address" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="contactNumber">Contact Number:</Label>
                        <PlaceholderInput type="text" id="contactNumber" name="contactNumber" placeholder="Enter your contact number" value={formData.contactNumber} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="NIC">NIC:</Label> {/* Added NIC input field */}
                        <PlaceholderInput type="text" id="NIC" name="NIC" placeholder="Enter your NIC" value={formData.NIC} onChange={handleChange} />
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <AppointmentTypeLabel>Appointment Type:</AppointmentTypeLabel>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <Input type="checkbox" name="appointmentTypes" value="Consultation" onChange={handleChange} />
                                Consultation <PriceLabel>$50</PriceLabel>
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <Input type="checkbox" name="appointmentTypes" value="Relaxation" onChange={handleChange} />
                                Relaxation <PriceLabel>$60</PriceLabel>
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <Input type="checkbox" name="appointmentTypes" value="Treatment" onChange={handleChange} />
                                Treatment <PriceLabel>$70</PriceLabel>
                            </CheckboxLabel>
                        </CheckboxGroup>
                    </FormGroup>
                    <TotalPriceLabel>Total Price: ${totalPrice}</TotalPriceLabel>
                    <SubmitButton type="submit">Book Appointment</SubmitButton>
                </Form>
            </AppointmentContainer>
            {/* Appointment List Card */}
            <AppointmentListCard>
                <Logo onClick={handleClickLogo}>
                    <LogoText>Appointment List</LogoText>
                </Logo>
            </AppointmentListCard>
         </BackgroundContainer>
        </>
    );
}

export default Appointment;
