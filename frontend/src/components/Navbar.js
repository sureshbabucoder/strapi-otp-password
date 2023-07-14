import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom';

const Navbar = ({onLogout}) => {
    const handleLogOut = () => {
        onLogout(false)
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark m-3">
        <div className='container'>
            <Link to='/' className='navbar-brand'>
                <img src={'https://securityintelligence.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2018/10/si-advanced-authentication-feature.jpg.webp'} alt='' className='nav-img'/>
            </Link>
            <div className='collapse navbar-collapse'>
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link to='/' className='nav-link text-white'>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/create-product' className='nav-link text-white'>Create Product</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/create-product' className='nav-link text-white' onClick={handleLogOut}>LogOut</Link>
                </li>
            </ul>
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar