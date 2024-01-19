import './App.css'
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom"
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Navbar
import Usernav from './Navbar/Usernav.jsx';
import AdNav from './Admin/AdNav/AdNav.jsx';

//LoginForm
import LoginForm from './pages/Form/LoginForm.jsx';

//Pages
import  Home  from "./pages/Home.jsx";
import Authentication from "./pages/Authentication.jsx"
import Error from "./pages/Error.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import PrivateRoute from './Layout/PrivateRoute.jsx';
import Availability from './pages/Availability.jsx';
import Profile from './pages/Profile/Profile.jsx';

//Admin Pages from ./Admin
import Room from './Admin/Room/Room.jsx';
import Course from './Admin/Course/Course.jsx';
import Addashboard from './Admin/Addashboard/Addashboard.jsx';
import { Component, useEffect,useState } from 'react';

import { getUserData } from './Jsfunction/Firebase/fetchData.js';

function App() {
  const [isloading, setIsloading] = useState(false);
  const [user, setUser] = useState(null);
  const [isadmin, setIsadmin] = useState(null);

  useEffect(() =>{
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) =>{
      
      if(authUser){
       
        // console.log(authUser.uid);
        try {
          const data = await getUserData("users",authUser.uid);
          console.log(data);
          if(data.role === "admin") setIsadmin(true);
          console.log(isadmin);
          setUser(authUser);
          setIsloading(true)
        } catch (error) {
          console.log("App.js: error when getting User Data")
        }

      } else {
        console.log("user not logged in");
      }
    });

    return () => unsubscribe();
  },[])

  return (
    <Router>
      {user? (
        isadmin? (
          //Admin Routing
          <>
            <AdNav/>
            <Routes>
              <Route path="/dashboard" element={<Addashboard/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/course" element={<Course/>}/>
            </Routes>
          </>
        ):(
          <>
          <Usernav/>
          <h1>User</h1>
          </>
        )
      ):(
        <Routes>
          <Route path="/login" element={<Authentication/>}/>
          <Route path="*" element = {<Navigate to ="/login"/>} />
        </Routes>
      )}
    </Router>
  //  <Routes>
  //     {/* {Public Page} */}
  //     <Route path="/" element = {<Home/>}></Route>
  //     <Route path="/authentication" element={<Authentication/>}></Route>
  //     <Route path="*" element = {<Error/>}></Route>
  //     <Route path="/availability" element={<Availability/>}></Route>
  //     <Route path="/profile" element={<Profile/>}></Route>

  //     {/* Admin Part */}
  //     <Route path ="/classroom" element = {<Room />}></Route>
  //     <Route path="/admindashboard" element = {<Addashboard />} ></Route>
  //     <Route path="/course" element = {<Course />}></Route>


  //     {/* private pages */}
  //     <Route element = {<PrivateRoute/>}>
  //          <Route path="/dashboard" element = {<Dashboard/>}></Route>
          
  //     </Route>
  //  </Routes>
  )
}

export default App
