import { NavLink } from "react-router-dom";

const AdNav = () => {
  return (
    <div>
       <NavLink to="/admindashboard">Dashboard</NavLink>
       <br />
       <NavLink to = "/profile">Profile</NavLink>
       <br />
       <NavLink to="/course">Course</NavLink>
       <br />
       <NavLink to="/classroom">Class Room</NavLink>
    </div>
  )
}

export default AdNav
