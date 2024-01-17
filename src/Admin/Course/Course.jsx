import {v4 as uuidv4} from "uuid"
import { useEffect, useState } from "react"
import AdNav from "../AdNav/AdNav"
import { addData } from "../../Jsfunction/Firebase/addData"
import { deleteData } from "../../Jsfunction/Firebase/deleteData"
import { allUsersData,ongoingCourse } from "../../Jsfunction/Firebase/fetchData" 
import './Course.css'

const Course = () => {
  const [facultyuid, setFacultyuid] = useState("");
  const [facultyname,setFacultyname] = useState("");
  const [coursecode,setCourseCode] = useState("");
  const [coursename,setCoursename] = useState("");
  const [session,setSession] = useState("");

  //Current User List
  const [user,setUser] = useState([]);
  //Current Course List
  const [allcourse, setAllcourse] = useState([]);
  // console.log("ok", user);
  useEffect(() =>{
    const fetchData = async() =>{
      try {
        const curUser = await allUsersData();
        setUser(curUser);
      } catch (error) {
        console.log("Course.jsx:", error);
      }
    };

    fetchData();
  },[]);

  const addNewItem = (dataToSet) =>{
    setAllcourse((prevCourses) =>{
      // const newCourse = prevCourses;
      // console.log("prev: ",newCourse);
      // newCourse.push(dataToSet);
      // console.log("Current Course: ",newCourse);
      return [...prevCourses,dataToSet]
    })
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!facultyuid || !coursecode || !coursename || !session){
      alert("Please fillup all the field");
      return;
    }
    const dataToSet = {
      coursecode: coursecode,
      coursename: coursename,
      session: session,
      facultyname: facultyname,
      facultyuid: facultyuid,
      dbid: uuidv4()
    };

    // console.log(dataToSet);
    addData("courses",dataToSet)
    
  }

  //Render Table Part Begin From here
 
  useEffect(()=>{
    const fetchData = async()=> {
      try {
          const currentCourse = await ongoingCourse();
          // console.log(currentCourse)
          setAllcourse(currentCourse);
      } catch (error) {
        console.log("Course.jsx:", error);
      }
    }
    fetchData();
  },[]); 

  const handleDelete = async(id) => {
    try {
      await deleteData("courses",id);
    } catch (error) {
      alert("Getting Error while deleting Data",error);
    }
    // setAllcourse((prevCourses) =>{
    //   const newCourses = prevCourses.filter(course => String(course.id) != id);
    //   return newCourses;
    // });
  };

  return (
    <div>
      <AdNav />

      {/* Add Course */}
      <div className="course-container">
            <form onSubmit={handleSubmit} className="course-add">
            <h2 className="course-header">Add New Course</h2>
            <label htmlFor="courseCode">Course Code </label>
            <input 
                type="text"
                id = "courseCode"
                value={coursecode}
                onChange={(e) => setCourseCode(e.target.value)} 
            />
            
            <label htmlFor="courseName">Course Name </label>
            <input 
                type="text" 
                id="courseName"
                value={coursename}
                onChange={(e) => setCoursename(e.target.value)}
            />
            
            <label htmlFor="session">Session </label>
            <input 
                type="text" 
                id = "session"
                value = {session}
                onChange={(e) => setSession(e.target.value)}
            />

            <label htmlFor="selectUser">Add Teacher: </label>
            <select
            id="selectUser"
            onChange={(e) => {
                setFacultyuid(e.target.value);
                setFacultyname(user[e.target.value].name);
            }} 
            >
                <option value="">Select</option>
                {Object.keys(user).map((uid) =>(
                    <option key={uid} value={uid}>
                    {user[uid].name}
                    </option>
                ))}
            </select>
            <button className="course-add-btn">Save</button>
            </form>
        </div>
        
        {/* Show Current Course */}
        <div className="show-course">
            <table>
                <thead>
                    <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Session</th>
                    <th>Course Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(allcourse).map((id) =>(
                    
                    <tr key = {id}>
                        <td>{allcourse[id].coursecode}</td>
                        <td>{allcourse[id].coursename}</td>
                        <td>{allcourse[id].session}</td>
                        <td>{allcourse[id].facultyname}</td>
                        <td>
                        <button onClick={()=> handleDelete(id)}>Delete</button>
                        </td>
                    </tr>

                    ))}
                </tbody>
            </table>
        </div>
      </div>
  )
}

export default Course
