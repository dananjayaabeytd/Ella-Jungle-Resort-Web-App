import React from 'react';
import Header from '../../components/header';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Import images
import spaImage1 from '../../images/relax.jpg';
import spaImage2 from '../../images/arom.jpg';
import spaImage3 from '../../images/skin.jpg';

import backgroundImage from '../../images/spabg.jpg'; // Import your background image here

const BackgroundContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    height: 100vh;
`;

const PageContainer = styled.div`
    text-align: center;
`;

const Title = styled.h1`
    font-size: 3rem;
    color: #DAFDD8;
    margin-top: 50px;
    text-shadow:0 0 10px #0B0C0B;
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 50px auto;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-5px);
    }
`;

const CardImage = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const CardContent = styled.div`
    text-align: center;
`;

const CardTitle = styled.h2`
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #333;
`;

const CardDescription = styled.p`
    margin: 10px 0;
    font-size: 16px;
    color: #555;
`;

const Price = styled.p`
    margin: 5px 0;
    font-size: 18px;
    font-weight: bold;
    color: #00cc66; /* Green color */
`;

const SubmitButton = styled.button`
    margin-top: 10px;
    padding: 15px 50px;
    font-size: 20px;
    color: #fff;
    background-color: #00cc66; /* Green color */
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 10px #0B0C0B;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #696969; /* Darker green color on hover */
    }
`;

const Spa = () => {
    return (
        <PageContainer>
            <BackgroundContainer>
            <Header />
            <Title>Discover our Spa Treatments</Title>
            <CardContainer>
                <Card>
                    <CardImage src={spaImage1} alt="Spa Image 1" />
                    <CardContent>
                        <CardTitle>Relaxing Massage</CardTitle>
                        <CardDescription>Indulge in our soothing massage therapies</CardDescription>
                        <Price>$50</Price>
                    </CardContent>
                </Card>
                <Card>
                    <CardImage src={spaImage2} alt="Spa Image 2" />
                    <CardContent>
                        <CardTitle>Aromatherapy Session</CardTitle>
                        <CardDescription>Experience the benefits of aromatic essential oils</CardDescription>
                        <Price>$60</Price>
                    </CardContent>
                </Card>
                <Card>
                    <CardImage src={spaImage3} alt="Spa Image 3" />
                    <CardContent>
                        <CardTitle>Facial and Skincare</CardTitle>
                        <CardDescription>Revitalize your skin with our specialized facial treatments</CardDescription>
                        <Price>$70</Price>
                    </CardContent>
                </Card>
            </CardContainer>
            <Link to="/Appointment">
                <SubmitButton>Book Now</SubmitButton>
            </Link>
            </BackgroundContainer>
        </PageContainer> 
    );
}

export default Spa;
