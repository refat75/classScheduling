import userLogOut from "../Auth/userLogout"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { projectAuth } from "../Firebase/config";


const Dashboard = () => {
  //getting the current user information
  const [user, setuser] = useState("");
  projectAuth.onAuthStateChanged((user) =>{
    if(user){
      console.log("user logged in");
      const emailid = user.email;

      setuser(emailid);
    } else {
      console.log("No user Signed in");
    }

  })

  const navigate = useNavigate();
  const {error, logOut} = userLogOut();
  const handleLogOut = async() =>{
    await logOut();
    if(!error){
      navigate("/")
    }
  }

  return (
    <div>
      <h1>Welcome {user}</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default Dashboard
