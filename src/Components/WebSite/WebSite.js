import React from 'react';
import Index from '../WebSite/Index';
import Navbar from '../WebSite/Navbar';

function WebSite() {
  return (
    <>
      <div className='website-container'>
        <div>{<Navbar />}</div>
        <div className='content'>{<Index />}</div>
        <footer className='footer'>
          <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default WebSite;
