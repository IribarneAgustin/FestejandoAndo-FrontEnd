import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../Assets/Styles/adminNavbar.css";
import logo from "../../Assets/Styles/Images/logo.png"; // Make sure to import the logo properly
import { useNavigate } from 'react-router-dom';

function AdminNavbar({ clientsClick, bookingsClick, topicsClick, articlesClick }) {
    const navRef = useRef();
    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_admin-nav"); // Updated class name
    };

    const logout = () => {
        navigate('/');
    };

    return (
        <admin-header>
            <img onClick={logout} src={logo} alt="Logo"></img>
            <admin-nav ref={navRef}>
                <a onClick={() => { clientsClick(); showNavbar(); }}>Clientes</a>
                <a onClick={() => { bookingsClick(); showNavbar(); }}>Reservas</a>
                <a onClick={() => { topicsClick(); showNavbar(); }}>Temáticas</a>
                <a onClick={() => { articlesClick(); showNavbar(); }}>Artículos</a>
                <button
                    className="admin-nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </admin-nav>
            <button
                className="admin-nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </admin-header>
    );
}

export default AdminNavbar;
