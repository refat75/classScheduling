import './App.css'
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//Import React Spinner
import { BounceLoader } from 'react-spinners';
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
import Availability from './pages/Availability/Availability.jsx';
import Profile from './pages/Profile/Profile.jsx';

//Admin Pages from ./Admin
import ClassRoutine from './Admin/Routine/ClassRoutine.jsx';
import Room from './Admin/Room/Room.jsx';
import Course from './Admin/Course/Course.jsx';
import Addashboard from './Admin/Addashboard/Addashboard.jsx';
import { Component, useEffect,useState } from 'react';

import { getUserData } from './Jsfunction/Firebase/fetchData.js';

function App() {
  const [isloading, setIsloading] = useState(true);
  const [user, setUser] = useState(null);
  const [isadmin, setIsadmin] = useState(null);

  useEffect(() =>{
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) =>{
      
      if(authUser){
       
        
        try {
          const data = await getUserData("users",authUser.uid);
          // console.log(data);
          if(data.role === "admin") setIsadmin(true);
          setUser(authUser);
          setIsloading(false)
        } catch (error) {
          setIsloading(false)
          console.log("App.js: error when getting User Data")
        }

      } else {
        setIsloading(false);
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
              <Route path="/login" element = {<Navigate to ="/dashboard"/>} />
              <Route path="/" element = {<Navigate to ="/dashboard"/>} />
              <Route path="/dashboard" element={<Addashboard/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/course" element={<Course/>}/>
              <Route path="/classroom" element={<Room/>} />
              <Route path="/availability" element={<Availability/>}/>
              <Route path="/routine" element={<ClassRoutine/>}/>
            </Routes>
          </>
        ):(
          <>
            {/* User Routing */}
            <Usernav/>
            <Routes>
              <Route path="/login" element = {<Navigate to ="/dashboard"/>} />
              <Route path="/" element={<Dashboard/>} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/availability" element={<Availability/>}/>
            </Routes>
          </>
        )
      ):(
        isloading? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <BounceLoader color="#36D7B7" size={60} />
          </div>
        ) :(
        <Routes>
          <Route path="*" element = {<Navigate to ="/login"/>} />
          <Route path="/login" element={<Authentication/>}/>
        </Routes>
      ))}
    </Router>
  )
}

export default App
