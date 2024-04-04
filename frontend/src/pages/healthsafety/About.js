import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/header';

import aboutImage1 from '../../images/about01.jpg';
import aboutImage2 from '../../images/about02.jpg';
import aboutImage3 from '../../images/about03.jpg';
import aboutImage4 from '../../images/about04.jpg';
import aboutImage5 from '../../images/about05.jpg';

const AboutContainer = styled.div`
    text-align: center;
`;

const Title = styled.h1`
    font-size: 3rem;
    color: #3A4E37;
    margin-top: 50px;
    text-shadow: 0 0 5px #5E9155;
`;

const ImageContainer = styled.div`
    position: relative;
    margin-left: 10%;
    width: 80%;
    height: 600px; /* Adjust height as needed */
    overflow: hidden;
`;

const AboutImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
`;

const ContentContainer = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 0 20px;
`;

const Paragraph = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    color: #555;
`;

const About = () => {
    const images = [aboutImage1, aboutImage2, aboutImage3, aboutImage4, aboutImage5];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <AboutContainer>
            <Header />
            <Title>About Us</Title>
            <ImageContainer>
                {images.map((image, index) => (
                    <AboutImage
                        key={index}
                        src={image}
                        alt={`About Us ${index}`}
                        isActive={index === currentImageIndex}
                    />
                ))}
            </ImageContainer>
            <ContentContainer>
                <Paragraph>
                    Welcome to our sanctuary of serenity, where tranquility meets transformation. At Ella Jungle Resort, our vision is to redefine relaxation, offering a haven where guests can escape the chaos of everyday life and immerse themselves in unparalleled rejuvenation. Our mission is to curate an unforgettable experience, blending ancient healing traditions with modern techniques to restore harmony to the mind, body, and spirit. With a team of skilled therapists dedicated to your well-being, we invite you to embark on a journey of self-discovery and renewal. Nestled in a peaceful oasis, our luxurious facilities and personalized treatments promise to elevate your senses and leave you feeling refreshed, revitalized, and radiant. Whether you seek solace from stress, relief from tension, or simply a moment of indulgence, Ella Jungle Resort is your oasis of wellness, where every visit is an opportunity to reconnect with your inner peace and emerge as your best self. Come, experience the art of relaxation redefined.
                </Paragraph>
                <Paragraph>
                    Come, experience the art of relaxation redefined. Let us guide you on a transformative journey towards inner harmony and outer radiance. Whether you're seeking a soothing massage, rejuvenating facial, or holistic wellness retreat, our expert therapists are here to tailor each experience to your unique needs and desires. Step into our tranquil haven and surrender to the sublime sensations that await you. Your path to wellness begins here, at [Spa Name]. Embark on this voyage of self-care with us, and discover the true meaning of rejuvenation. Welcome to a world where every moment is an opportunity to nurture your body, soothe your soul, and elevate your spirit.
                </Paragraph>
            </ContentContainer>
        </AboutContainer>
    );
};

export default About;
