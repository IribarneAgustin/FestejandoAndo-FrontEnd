import React from 'react';
import '../../Assets/Styles/WebSite/TopicCards.css';
import { BsPlusCircleFill } from 'react-icons/bs';
import logo from '../../Assets/Styles/Images/logo.png';

function Presupuestos() {
  return (
    <div className='presupuestos-container'>
      <div className='presupuestos-title'>Presupuestos</div>
      <div className='space-text'>INFORMACIÓN</div>
      <div className='text-container'>
        <ul className='presupuestos'>
          <li className='li-presupuestos'>
            <span className='plus-icon'>
              <BsPlusCircleFill />
            </span>
            <p>
              Los presupuestos son adaptados a las preferencias de cada festejo. Por ello
              es de suma importancia saber cantidad de invitados, edades y el lugar donde
              se realiza.
            </p>
          </li>
          <li className='li-presupuestos'>
            <span className='plus-icon'>
              <BsPlusCircleFill />
            </span>
            <p>
              Se requiere un anticipo de 35% para reservar una fecha. Los presupuestos
              tienen vigencia total de 30 días corridos desde el momento de la entrega,
              pasado este tiempo se deberán hacer los ajustes necesarios.
            </p>
          </li>
          <li className='li-presupuestos'>
            <span className='plus-icon'>
              <BsPlusCircleFill />
            </span>
            <p>
              ¡A todos los combos pueden agregarse los talleres y estos a su vez ser
              caracterizados con el tema del cumple! Solo se pide un plazo mínimo de 15
              días, para su creación.
            </p>
          </li>
          <li className='li-presupuestos'>
            <span className='plus-icon'>
              <BsPlusCircleFill />
            </span>
            <p>
              El material didáctico empleado en los juegos debe cuidarse, en caso de
              roturas daños o extravíos deberá abonarse la diferencia el mismo día.
            </p>
          </li>
        </ul>
      </div>
      <div className='reservation-container'>
        <div className='reservation-text'>
          <div className='space-text'>¡Reserva tu evento con nosotros!</div>
          <p className='follow-text'>
            Síguenos en redes:
            <strong style={{ marginLeft: '10px' }}> festejandoando01@gmail.com</strong>
          </p>
        </div>
        <img src={logo} alt='Logo'></img>
      </div>
    </div>
  );
}

export default Presupuestos;
