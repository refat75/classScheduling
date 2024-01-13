import React from 'react'
import { NavLink,Link } from 'react-router-dom'

const Usernav = () => {
  return (
    <nav>
    <h1>This Is Navbar</h1>
    <NavLink to="/dashboard">Dashboard</NavLink>
    <NavLink to="/availability">Availability</NavLink>
    <NavLink to="/profile">Profile</NavLink> 
    <button>Logout</button>
    </nav>
  )
}

export default Usernav
