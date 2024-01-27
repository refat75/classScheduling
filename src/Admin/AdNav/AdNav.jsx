import { useEffect,useState } from "react";

import { NavLink } from "react-router-dom";
import './AdNav.css'

import userLogOut from "../../Auth/userLogout";
import getUser from "../../Jsfunction/userauth";
import { getUserData } from "../../Jsfunction/Firebase/fetchData";

const AdNav = () => {

  const [name,setName] = useState("Loading...");
  const [shortName,setshortName] = useState("Loading ShortName...");
  
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const userUid = await getUser();

        const data = await getUserData("users",userUid);
        setName(data.name);
        setshortName(data.shortname);
      } catch (error) {
        console.log(error.message);
      }
     
    };
    
    fetchData();
  },[]);

  //Logout Part
  const {error, logOut} = userLogOut();
  const handleLogOut = async() =>{
    await logOut();
    if(!error){
      location.reload();
      // navigate("/")
    }
  }
  return (
    <nav className="Ad-navbar">
       <div>
       <NavLink to="/dashboard" className='Ad-nav-menu'>Dashboard</NavLink>
       <NavLink to="/routine" className='Ad-nav-menu'>Routine</NavLink>
       {/* <NavLink to="/availability" className='Ad-nav-menu'>Availability</NavLink> */}
       <NavLink to = "/profile" className='Ad-nav-menu'>Profile</NavLink>
       <NavLink to="/course" className='Ad-nav-menu'>Course</NavLink>
       <NavLink to="/classroom" className='Ad-nav-menu'>Class Room</NavLink>
       </div>
       <p className="shortname">{name}({shortName})</p>
       <button className='logout' onClick={handleLogOut}>Logout</button>
    </nav>
  )
}

export default AdNav
