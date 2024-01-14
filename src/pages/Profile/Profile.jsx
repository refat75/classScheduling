import { useState,useEffect } from 'react'
import Usernav from '../../Navbar/Usernav'
import getUser from '../../Jsfunction/userauth'
import checkDocumentExists from '../../Jsfunction/checkdocexist'
import updateFirestoreDocument from '../../Jsfunction/Firebase/updateFirestoreDoc'
import './Profile.css'

const Profile = () => {

  const [name,setName] = useState("Loading Name...");
  const [shortName,setshortName] = useState("Loading ShortName...");
  const [uid,setUid] = useState("");
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const userUid = await getUser();
        setUid(userUid);
        const data = await checkDocumentExists("users",userUid);

        setName(data.name);
        setshortName(data.shortname);
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
    updateFirestoreDocument("users",uid,dataToUpdate);
  };
  
  return (
    <>
      <Usernav />
      <div className='profile-container'>
        <div className='profile-information'>
            <h1 className='profile-information-header'>Profile Information</h1>
            <p>Name: {name}</p>
            <p>Short Name: {shortName}</p>
        </div>
        <div className='profile-update'>
            <h1 className='profile-update-header'>Update Your Information</h1>
            <form onSubmit={handleUpdate} className='update-information'>
                <label htmlFor="fullname">Edit Name:</label>
                <input 
                    type="text" 
                    id="fullname"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
                <label htmlFor="shortname">Edit Shortname:</label>
                <input 
                    type="text" 
                    id="shortname" 
                    value= {shortName}
                    onChange={(e)=>setshortName(e.target.value)}
                />
                <button className='profile-update-save'>Save</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Profile
