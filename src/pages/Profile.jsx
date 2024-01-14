import { useState,useEffect } from 'react'
import Usernav from '../Navbar/Usernav'
import getUser from '../Jsfunction/userauth'
import checkDocumentExists from '../Jsfunction/checkdocexist'
import updateFirestoreDocument from '../Jsfunction/Firebase/updateFirestoreDoc'
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
      <div>
        <h1>This is Profile Page</h1>
        <h3>User Details are shown below</h3>
        <p>Name: {name}</p>
        <p>Short Name: {shortName}</p>
      </div>
      <div>
        <h1>Update Your Information</h1>
        <form onSubmit={handleUpdate}>
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
          <button>Save</button>
        </form>
      </div>
    </>
  )
}

export default Profile
