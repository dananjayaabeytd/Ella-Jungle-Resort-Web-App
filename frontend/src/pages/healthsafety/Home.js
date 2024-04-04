import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../../components/header.js';
import { Link } from 'react-router-dom';

import spaImage from '../../images/s.jpg';
import fitnessImage from '../../images/fitness.jpg';
import aboutImage from '../../images/about.jpg';
import backgroundImage from '../../images/homebg.jpg'; // Import your background image here

const BackgroundContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    height: 100vh;
`;

const HomeContainer = styled.div`
    text-align: center;
`;

const Title = styled.h1`
    margin-top: 50px;
    font-size: 3rem;
    color: #DAFDD8;
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
    width: 350px;
    margin: 20px;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-8px);
    }
`;

const CardImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 30px;
`;

const CardContent = styled.div`
    text-align: center;
`;

const CardTitle = styled.h2`
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
`;

const CardDescription = styled.p`
    margin: 0;
    font-size: 18px;
    color: #555;
`;

class Home extends Component {
    render() {
        return (
            <HomeContainer>
                <BackgroundContainer>
                <Header />
                <Title>Welcome to Our Wellness Center</Title>
                <CardContainer>
                    {cardData.map((card, index) => (
                        <Link to={card.link} key={index} style={{ textDecoration: 'none' }}>
                            <Card>
                                <CardImage src={card.imageUrl} alt={card.title} />
                                <CardContent>
                                    <CardTitle>{card.title}</CardTitle>
                                    <CardDescription>{card.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </CardContainer>
                </BackgroundContainer>
            </HomeContainer>
        );
    }
}

const cardData = [
    {
        title: 'Spa Packages',
        description: 'Explore our wide range of luxurious spa packages designed to rejuvenate your body and mind.',
        imageUrl: spaImage,
        link: '/spa',
    },
    {
        title: 'Fitness',
        description: 'Discover our state-of-the-art fitness programs tailored to meet your fitness goals and lifestyle.',
        imageUrl: fitnessImage,
        link: '/fitness',
    },
    {
        title: 'About',
        description: 'Learn more about our company, mission, and commitment to providing exceptional wellness services.',
        imageUrl: aboutImage,
        link: '/about',
    },
];

export default Home;
