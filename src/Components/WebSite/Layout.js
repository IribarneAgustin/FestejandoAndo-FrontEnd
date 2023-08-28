import '../../Assets/Styles/WebSite/Layout.css';
import '../../Assets/Styles/WebSite/WebSite.css';
import { FaInstagram, FaRegEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import SubNavBar from './SubNavBar';

const Layout = ({ children, showSubNav }) => {
  return (
    <>
    {showSubNav && <SubNavBar /> } 
    {children}
      <footer className='footer'>
        <ul className='contact-icons'>
          <li>
            <a
              className='icon-link'
              href='https://www.instagram.com/festejando.ando_/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram className='icon-link' />
            </a>
          </li>
          <li>
            <FaRegEnvelope className='icon-link' />
            <a className='mail-text' href='mailto:festejandoando_@gmail.com'>
              festejandoando_@gmail.com
            </a>
          </li>
          <li>
            <FaMapMarkerAlt className='icon-link' />
            <p className='geo-text'>Mar del Plata, AR</p>
          </li>
        </ul>
        <div className='copyright-text'>
          <p className='left-text'>FestejandoAndo</p>
          <p className='right-text'>
            &copy; {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
