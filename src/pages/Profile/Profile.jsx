import { useState,useEffect } from 'react'

import getUser from '../../Jsfunction/userauth'
import updateFirestoreDocument from '../../Jsfunction/Firebase/updateFirestoreDoc'
import './Profile.css'

//Import Data From fetchData.js
import {getUserData,ongoingCourse} from "../../Jsfunction/Firebase/fetchData"
const Profile = () => {

  const [name,setName] = useState("Loading Name...");
  const [shortName,setshortName] = useState("Loading ShortName...");
  const [uid,setUid] = useState("");
  const [allCourse, setAllCourse] = useState({});
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const userUid = await getUser();
        setUid(userUid);
        const data = await getUserData("users",userUid);

        setName(data.name);
        setshortName(data.shortname);

        const course = await ongoingCourse();
        
        const relevantData = Object.fromEntries(
          Object.entries(course).filter(([key,value]) => value.facultyuid == userUid)
        );
        
        
        setAllCourse(relevantData);

      } catch (error) {
        console.log(error.message);
      }
     
    };
    
    fetchData();
  },[]);

  const handleUpdate = async(e) =>{
    e.preventDefault();
    
    const dataToUpdate = {
      // Add fields and values to update
      name: name,
      shortname: shortName,
    };
    try {
      updateFirestoreDocument("users",uid,dataToUpdate); 
    } catch (error) {
      alert("Data Update Failed");
    }
    
  };
  
  return (
    <>
      <div className='profile-container'>
        <div className='profile-container-row1'>
          <div className='profile-information'>
              <h1 className='profile-information-header'>Profile Information</h1>
              <div className="profile-information-body">
                <p>Name: {name}</p>
                <p>Short Name: {shortName}</p>
              </div>
          </div>
          <div className='profile-update'>
              <h1 className='profile-update-header'>Update Your Information</h1>
              <form onSubmit={handleUpdate} className='update-information'>
                  <div>
                    <label htmlFor="fullname">Edit Name:</label>
                    <input 
                        type="text" 
                        id="fullname"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="shortname">Edit Shortname:</label>
                    <input 
                        type="text" 
                        id="shortname" 
                        value= {shortName}
                        onChange={(e)=>setshortName(e.target.value)}
                    />
                  </div>
                  <button className='profile-update-save'>Save</button>
              </form>
          </div>
        </div>
        <div className='profile-container-row2'>
          <h2>Current Courses</h2>
          <table className='profile-table'>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Type</th>
                <th>Course Credit</th>
                <th>Session</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(allCourse).map((id) =>(
                <tr key={id}>
                  <td>{allCourse[id].coursecode}</td>
                  <td>{allCourse[id].coursename}</td>
                  <td>{allCourse[id].coursetype}</td>
                  <td>{allCourse[id].coursecredit}</td>
                  <td>{allCourse[id].session}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
     
    </>
  )
}

export default Profile
