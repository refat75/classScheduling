import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { NavLink} from 'react-router-dom'
import './Usernav.css'

import userLogOut from "../Auth/userLogout"
import getUser from "../Jsfunction/userauth"
import checkDocumentExists from "../Jsfunction/checkdocexist"
const Usernav = () => {

  const [name,setName] = useState("Loading...");
  const [shortName,setshortName] = useState("Loading ShortName...");
  
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const userUid = await getUser();

        const data = await checkDocumentExists("users",userUid);
        setName(data.name);
        setshortName(data.shortname);
      } catch (error) {
        console.log(error.message);
      }
     
    };
    
    fetchData();
  },[]);
  //Logout Part
  const navigate = useNavigate();
  const {error, logOut} = userLogOut();
  const handleLogOut = async() =>{
    await logOut();
    if(!error){
      navigate("/")
    }
  }
  return (
    <nav className='navbar'>
        <div className="nav-menu">
            <NavLink to="/dashboard"  className='navlink'>Dashboard</NavLink>
            <NavLink to="/availability" className='navlink'>Availability</NavLink>
            <NavLink to="/profile" className='navlink'>Profile</NavLink> 
        </div>
        <p className="shortname">{name} ({shortName})</p>
        <button className='logout' onClick={handleLogOut}>Logout</button>
        
    </nav>
  )
}

export default Usernav
