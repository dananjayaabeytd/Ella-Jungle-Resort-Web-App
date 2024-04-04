import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={sidebarStyle}>
            <div style={optionStyle}><Link to="/option1" style={linkStyle}>Option 1</Link></div>
            <div style={optionStyle}><Link to="/option2" style={linkStyle}>Option 2</Link></div>
            <div style={optionStyle}><Link to="/option3" style={linkStyle}>Option 3</Link></div>
            <div style={optionStyle}><Link to="/option4" style={linkStyle}>Option 4</Link></div>
            <div style={optionStyle}><Link to="/option5" style={linkStyle}>Option 5</Link></div>
            <div style={optionStyle}><Link to="/option6" style={linkStyle}>Option 6</Link></div>
            <div style={optionStyle}><Link to="/option7" style={linkStyle}>Option 7</Link></div>
            <div style={optionStyle}><Link to="/option8" style={linkStyle}>Option 8</Link></div>
        </div>
    );
};

const sidebarStyle = {
    backgroundColor: '#f4f4f4',
    width: '200px',
    padding: '20px',
    height: '100vh',
};

const optionStyle = {
    marginBottom: '10px',
};

const linkStyle = {
    textDecoration: 'none',
    color: '#333',
};

export default Sidebar;
