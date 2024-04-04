import React from 'react';
import styled from 'styled-components';
import fitnessImage from '../../images/fit.webp';
import Header from '../../components/header';

const FitnessContainer = styled.div`
    text-align: center;
    padding: 0px;
`;

const Title = styled.h1`
    font-size: 3rem;
    color: #3A4E37;
    margin-top: 50px;
    text-shadow:0 0 2.5px #5E9155;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

const FitnessImage = styled.img`
    width: 80%;
    max-width: 80%;
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const PackageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
`;

const PackageCard = styled.div`
    width: 300px;
    margin: 20px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 10px #0B0C0B;;
    background-color: #DAFDD8;
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-8px);
    }
`;

const PackageTitle = styled.h2`
    font-size: 1.5rem;
    color: #333;
`;

const PackageDescription = styled.p`
    font-size: 1rem;
    color: #555;
    margin-top: 10px;
`;

const Price = styled.p`
    font-size: 1.2rem;
    color: #333;
    font-weight: bold;
    margin-top: 20px;
`;

const Fitness = () => {
    return (
        
      <FitnessContainer>
        <Header style = {{ margintop:'100%'}}/>
            <Title>Discover Our Fitness Programs</Title>
            <ImageContainer>
                <FitnessImage src={fitnessImage} alt="Fitness" />
            </ImageContainer>
            <PackageContainer>
                <PackageCard>
                    <PackageTitle>Basic Membership</PackageTitle>
                    <PackageDescription>Access to gym facilities</PackageDescription>
                    <Price>LKR 1500/month</Price>
                </PackageCard>
                <PackageCard>
                    <PackageTitle>Premium Membership</PackageTitle>
                    <PackageDescription>Access to gym facilities + Personal trainer</PackageDescription>
                    <Price>LKR 2500/month</Price>
                </PackageCard>
                <PackageCard>
                    <PackageTitle>Gold Membership</PackageTitle>
                    <PackageDescription>Access to gym facilities + Personal trainer + Group classes</PackageDescription>
                    <Price>LKR 10000/month</Price>
                </PackageCard>
                <PackageCard>
                    <PackageTitle>Platinum Membership</PackageTitle>
                    <PackageDescription>Access to gym facilities + Personal trainer + Group classes + Spa access</PackageDescription>
                    <Price>LKR 15000/month</Price>
                </PackageCard>
                <PackageCard>
                    <PackageTitle>Student Membership</PackageTitle>
                    <PackageDescription>Special membership for students with access to gym facilities</PackageDescription>
                    <Price>LKR 3000/month</Price>
                </PackageCard>
                <PackageCard>
                    <PackageTitle>Family Membership</PackageTitle>
                    <PackageDescription>Discounted membership for families with access to gym facilities</PackageDescription>
                    <Price>LKR 7500/month</Price>
                </PackageCard>
                <PackageCard>
                    <PackageTitle>Silver Membership</PackageTitle>
                    <PackageDescription>Access to gym facilities + Personal trainer + Nutrition consultation</PackageDescription>
                    <Price>LKR 3500/month</Price>
                </PackageCard>
                <PackageCard>
                    <PackageTitle>Couples Membership</PackageTitle>
                    <PackageDescription>Discounted membership for couples with access to gym facilities</PackageDescription>
                    <Price>LKR 8000/month</Price>
                </PackageCard>
            </PackageContainer>
        </FitnessContainer>
    );
};

export default Fitness;
