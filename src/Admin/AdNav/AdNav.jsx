import { NavLink } from "react-router-dom";
import './AdNav.css'

const AdNav = () => {
  return (
    <nav className="Ad-navbar">
       <NavLink to="/dashboard" className='Ad-nav-menu'>Dashboard</NavLink>
       <br />
       <NavLink to = "/profile" className='Ad-nav-menu'>Profile</NavLink>
       <br />
       <NavLink to="/course" className='Ad-nav-menu'>Course</NavLink>
       <br />
       <NavLink to="/classroom" className='Ad-nav-menu'>Class Room</NavLink>
    </nav>
  )
}

export default AdNav
