import React from 'react';
import logo from '../Assets/logo.png';

const Header = () => {
    return(
        <nav className='navbar header'>
            <div className='navbar-brand'>
                <img src={logo} className='d-inline-block align-top' alt='Logo' />
            </div>
            <div className='header-brand-text'>
                Šiaulių Auksinio Rato Rotaract Klubo
            </div>
            <div className='header-brand-text'>
                Loterija
            </div>
        </nav>
    )
}

export default Header;