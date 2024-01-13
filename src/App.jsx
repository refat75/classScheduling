import './App.css'
import {Routes,Route} from "react-router-dom"
import  Home  from "./pages/Home.jsx";
import Authentication from "./pages/Authentication.jsx"
import Error from "./pages/Error.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import PrivateRoute from './Layout/PrivateRoute.jsx';
import Availability from './pages/Availability.jsx';
import Profile from './pages/Profile.jsx';


function App() {

  return (
   <Routes>
      {/* {Public Page} */}
      <Route path="/" element = {<Home/>}></Route>
      <Route path="/authentication" element={<Authentication/>}></Route>
      <Route path="*" element = {<Error/>}></Route>
      <Route path="/availability" element={<Availability/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>

      {/* private pages */}
      <Route element = {<PrivateRoute/>}>
           <Route path="/dashboard" element = {<Dashboard/>}></Route>
          
      </Route>
   </Routes>
  )
}

export default App
