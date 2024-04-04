import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert';
import Header from '../../components/header';
import backgroundImage from '../../images/viewbg.jpg';
import pdfIcon from '../../images/pdf.jpg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const BackgroundContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    height: 100vh;
`;

const PageContainer = styled.div`
    text-align: center;
`;

const BoxContainer = styled.div`
    max-width: 90%;
    margin: 20px auto;
    padding: 20px;
    background-color: rgba(99, 255, 71, 0.2);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
`;

const PdfIcon = styled.img`
    position: absolute;
    top: 15%;
    right: 15%;
    width: 60px;
    height: 60px;
    cursor: pointer;
`;

const AppointmentsContainer = styled.div`
    text-align: center;
    padding: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHead = styled.thead`
    background-color: #DAFCD4;
`;

const TableHeader = styled.th`
    padding: 10px;
    border: 1px solid #696969;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #DAFCD4;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    background-color: #DAFCD4;
    border: 1px solid #696969;
`;

const ActionButton = styled.button`
    background-color: ${(props) => props.bgColor};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
    margin-right: 5px;
`;

const Modal = styled.div`
    display: ${(props) => (props.show ? 'block' : 'none')};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
    background-color: #AFF7CA;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #004200;
    width: 60%;
    max-width: 400px;
    border-radius: 10px;
`;

const CloseButton = styled.span`
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const EditInput = styled.input`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #004200;
    border-radius: 5px;
`;

const UpdateButton = styled.button`
    background-color: #03947e;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;

const CancelButton = styled.button`
    background-color: #737272;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e53935;
    }
`;

const SearchBar = styled.input`
    padding: 10px;
    width:30%;
    border: 1px solid #004200;
    border-radius: 40px;
    margin-bottom: 10px;
`;

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedAppointment, setEditedAppointment] = useState({
        NIC:'',
        firstName: '',
        lastName: '',
        address: '',
        contactNumber: '',
        appointmentDate: '',
        appointmentTypes: [],
        totalPrice: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5555/appointments');
                setAppointments(response.data.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        setFilteredAppointments(appointments.filter(appointment =>
            appointment.NIC.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [searchQuery, appointments]);

    const handleEditClick = (appointment) => {
        setSelectedAppointment(appointment);
        setEditedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (appointmentId) => {
        try {
            await axios.delete(`http://localhost:5555/appointments/${appointmentId}`);
            setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAppointment({
            ...editedAppointment,
            [name]: value
        });
    };

    const handleUpdateAppointment = () => {
        if (!validateInputs()) {
            return;
        }

        const updatedAppointments = appointments.map((appointment) => {
            if (appointment._id === editedAppointment._id) {
                return editedAppointment;
            }
            return appointment;
        });
        setAppointments(updatedAppointments);

        axios.put('http://localhost:5555/appointments/' + editedAppointment._id, editedAppointment)
        .then(response => {
            setIsModalOpen(false);
            swal('Success', 'Appointment updated successfully', 'success');
        })
        .catch(error => {
            console.error(error.message);
            swal('Error', 'Failed to update appointment', 'error');
        });
    };

    const validateInputs = () => {
        if (
            editedAppointment.NIC === '' ||
            editedAppointment.firstName === '' ||
            editedAppointment.lastName === '' ||
            editedAppointment.address === ''|| editedAppointment.contactNumber === '' ||
            editedAppointment.appointmentDate === '' ||
            editedAppointment.appointmentTypes.length === 0 ||
            editedAppointment.totalPrice === ''
        ) {
            swal('Error', 'All fields are required', 'error');
            return false;
        }
        const contactNumberRegex = /^[0-9]+$/;
        if (!contactNumberRegex.test(editedAppointment.contactNumber)) {
            swal('Error', 'Contact number should contain only numbers', 'error');
            return false;
        }
    
        return true;
    };
    
    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const tableColumn = ["NIC", "Name", "Address", "Contact Number", "Appointment Date", "Appointment Types", "Total Price"];
        const tableRows = [];
    
        filteredAppointments.forEach(appointment => {
            const appointmentData = [
                appointment.NIC,
                `${appointment.firstName} ${appointment.lastName}`,
                appointment.address,
                appointment.contactNumber,
                new Date(appointment.appointmentDate).toLocaleString(),
                appointment.appointmentTypes.join(', '),
                `$${appointment.totalPrice}`
            ];
            tableRows.push(appointmentData);
        });
    
        doc.autoTable({ head: [tableColumn], body: tableRows });
        doc.save('appointments.pdf');
    };
    

    return (
        <BackgroundContainer>
            <PageContainer>
                <Header />
                <BoxContainer>
                    <PdfIcon src={pdfIcon} alt="PDF Icon" onClick={handleDownloadPdf} />
                    <h2 style={{fontSize:'24px',}}>APPOINTMENTS</h2>
                    <SearchBar
                        type="text"
                        placeholder="Search by NIC"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <AppointmentsContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>NIC</TableHeader>
                                    <TableHeader>Name</TableHeader>
                                    <TableHeader>Address</TableHeader>
                                    <TableHeader>Contact Number</TableHeader>
                                    <TableHeader>Appointment Date</TableHeader>
                                    <TableHeader>Appointment Types</TableHeader>
                                    <TableHeader>Total Price</TableHeader>
                                    <TableHeader>Actions</TableHeader>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {filteredAppointments.map((appointment, index) => (
                                    <TableRow key={appointment._id}>
                                        <TableCell>{appointment.NIC}</TableCell>
                                        <TableCell>{appointment.firstName} {appointment.lastName}</TableCell>
                                        <TableCell>{appointment.address}</TableCell>
                                        <TableCell>{appointment.contactNumber}</TableCell>
                                        <TableCell>{new Date(appointment.appointmentDate).toLocaleString()}</TableCell>
                                        <TableCell>{appointment.appointmentTypes.join(', ')}</TableCell>
                                        <TableCell>${appointment.totalPrice}</TableCell>
                                        <TableCell>
                                            <ActionButton bgColor="#256F46" onClick={() => handleEditClick(appointment)}>Edit</ActionButton>
                                            <ActionButton bgColor="#737272" onClick={() => handleDeleteClick(appointment._id)}>Delete</ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </tbody>
                        </Table>
                    </AppointmentsContainer>
                </BoxContainer>
                {selectedAppointment && (
                    <Modal show={isModalOpen}>
                        <ModalContent>
                            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                            <EditForm>
                                <EditInput
                                    type="text"
                                    name="firstName"
                                    value={editedAppointment.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                />
                                <EditInput
                                    type="text"
                                    name="lastName"
                                    value={editedAppointment.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                />
                                <EditInput
                                    type="text"
                                    name="address"
                                    value={editedAppointment.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                />
                                <EditInput
                                    type="text"
                                    name="contactNumber"
                                    value={editedAppointment.contactNumber}
                                    onChange={handleInputChange}
                                    placeholder="Contact Number"
                                />
                                <EditInput
                                    type="text"
                                    name="appointmentDate"
                                    value={editedAppointment.appointmentDate}
                                    onChange={handleInputChange}
                                    placeholder="Appointment Date"
                                />
                                <EditInput
                                    type="text"
                                    name="appointmentTypes"
                                    value={editedAppointment.appointmentTypes.join(', ')}
                                    onChange={handleInputChange}
                                    placeholder="Appointment Types"
                                />
                                <EditInput
                                    type="text"
                                    name="totalPrice"
                                    value={editedAppointment.totalPrice}
                                    onChange={handleInputChange}
                                    placeholder="Total Price"
                                />
                                <div>
                                    <UpdateButton style={{ marginRight: '10px' }} type="button" onClick={handleUpdateAppointment}>Update</UpdateButton>
                                    <CancelButton type="button" onClick={handleCloseModal}>Cancel</CancelButton>
                                </div>
                            </EditForm>
                        </ModalContent>
                    </Modal>
                )}
            </PageContainer>
        </BackgroundContainer>
    );
};

export default Appointments;
