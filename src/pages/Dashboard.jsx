
import { useState } from "react";
import Usernav from "../Navbar/Usernav";

//firebase import
import {getAuth, onAuthStateChanged} from "firebase/auth"
import app from "../Firebase/config";

const Dashboard = () => {
  //getting the current user information
  const auth = getAuth(app);

  const [user, setuser] = useState("User");
  // onAuthStateChanged(auth,(user) =>{
  //   if(user){
  //     console.log("user logged in");
  //     const emailid = user.email;

  //     setuser(emailid);
  //   } else {
  //     console.log("No user Signed in");
  //   }

  // })

  

  return (
    <>  
      <div>
        <h1>Welcome {user}</h1>
      </div>
    </>
  )
}

export default Dashboard
