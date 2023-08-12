import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../Assets/Styles/adminNavbar.css";
import "../../Assets/Styles/Images/logo.png";
import { useNavigate } from 'react-router-dom';

function Navbar({ clientsClick,bookingsClick,topicsClick,articlesClick }) {
    const navRef = useRef();
    const navigate = useNavigate();
    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    const logout = () => {
        navigate('/');
    };

    return (
        <header>
            <img onClick={logout} src="logo.png"></img>
            <nav ref={navRef}>
                <a onClick={clientsClick} >Clientes</a>
                <a onClick={bookingsClick} >Reservas</a>
                <a onClick={topicsClick} >Temáticas</a>
                <a onClick={articlesClick}>Artículos</a>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;