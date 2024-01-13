import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import './Usernav.css'

const Usernav = () => {
  return (
    <nav className='navbar'>
        <div className="nav-menu">
            <NavLink to="/dashboard"  className='navlink'>Dashboard</NavLink>
            <NavLink to="/availability" className='navlink'>Availability</NavLink>
            <NavLink to="/profile" className='navlink'>Profile</NavLink> 
        </div>
        <button className='logout'>Logout</button>
    </nav>
  )
}

export default Usernav
