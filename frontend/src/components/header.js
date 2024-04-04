import React from 'react';
import userImage from '../images/s.jpg'; // Import user image

const Header = () => {
    return (
        <header style={headerStyle}>
            <div style={companyNameStyle}>Ella Jungle Resort</div>
            <div style={userInfoStyle}>
                <span style={userNameStyle}>John Doe</span>
                <img src={userImage} alt="User" style={userImageStyle} />
            </div>
        </header>
    );
};

const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:'-3.4%'
};

const companyNameStyle = {
    fontSize: '1.2rem',
};

const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
};

const userImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginLeft: '10px',
};

const userNameStyle = {
    color: '#0f0',
    fontSize: '1rem',
    marginRight: '10px',
};

export default Header;
