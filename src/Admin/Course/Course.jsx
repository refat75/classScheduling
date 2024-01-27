import {v4 as uuidv4} from "uuid"
import { useEffect, useState } from "react"
import { setData } from "../../Jsfunction/Firebase/addData"
import { deleteData } from "../../Jsfunction/Firebase/deleteData"
import { allUsersData,ongoingCourse,refreshCacheData } from "../../Jsfunction/Firebase/fetchData" 
import { toast } from "react-toastify"

import './Course.css'

const Course = () => {
  const [facultyuid, setFacultyuid] = useState("");
  const [facultyname,setFacultyname] = useState("");
  const [coursecode,setCourseCode] = useState("");
  const [coursename,setCoursename] = useState("");
  const [session,setSession] = useState("");
  const [coursecredit,setCoursecredit] = useState("");
  const [coursetype,setCoursetype] = useState("");

  //Current User List
  const [user,setUser] = useState([]);
  //Current Course List
  const [allcourse, setAllcourse] = useState({});
  
  useEffect(() =>{
    const fetchData = async() =>{
      try {
        const curUser = await allUsersData();
        setUser(curUser);
        console.log(curUser);
      } catch (error) {
        console.log("Course.jsx:", error);
      }
    };

    fetchData();
  },[]);

  


  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!facultyuid || !coursecode || !coursename || !session){
      toast.error("Please fillup all the fields.")
      return;
    }
    const dataToSet = {
      coursecode: coursecode,
      coursename: coursename,
      coursetype: coursetype,
      coursecredit: coursecredit,
      session: session,
      facultyname: facultyname,
      facultyuid: facultyuid,
      dbid: uuidv4()
    };

    // console.log(dataToSet);
    try {
      await setData("courses",dataToSet.dbid,dataToSet);
      setAllcourse((prevCourses) =>({
        [dataToSet.dbid]: dataToSet,
        ...prevCourses,
        
      }))
      setFacultyname("");
      setFacultyuid("");
      setCourseCode("");
      setCoursename("");
      setSession("");
      setCoursecredit("");
      setCoursetype("");
    } catch (error) {
      alert(error);
    }
    
    
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
      const updatedCourses = {...allcourse};
      delete updatedCourses[id];
      setAllcourse(updatedCourses);
      await deleteData("courses",id);
      refreshCacheData();
    } catch (error) {
      alert("Getting Error while deleting Data",error);
    }
  };

  return (
    <div>

      {/* Add Course */}
      <div className="course-container">
            <form onSubmit={handleSubmit} className="course-add">
            <h2 className="course-header">Add New Course</h2>
            <div className="course-add-row">
              <div className="add-course-col1">
                <div>
                  <label htmlFor="courseCode">Course Code :</label>
                  <input 
                      className="course-input"
                      placeholder="Course Code"
                      type="text"
                      id = "courseCode"
                      value={coursecode}
                      onChange={(e) => setCourseCode(e.target.value)} 
                  />
                </div>
                
                <div>
                  <label htmlFor="courseName">Course Name :</label>
                  <input 
                      className="course-input"
                      placeholder="Course Name"
                      type="text" 
                      id="courseName"
                      value={coursename}
                      onChange={(e) => setCoursename(e.target.value)}
                  />
                </div>

               <div>
                <label htmlFor="selecttype">Course Type :</label> 
                  <select  
                      id="selecttype"
                      className = "course-input"
                      value={coursetype}
                      onChange={(e) => {setCoursetype(e.target.value)}}
                  >
                    <option value="">Select</option>
                    <option value="Theory">Theory</option>
                    <option value="Lab">Lab</option>
                  </select>
               </div>
              </div>

              <div className="add-course-col2">
                <div>
                  <label htmlFor="coursecredit">Course Credit :</label>
                  <input 
                    className="course-input"
                    type="text" 
                    placeholder="Course Credit"
                    id = "coursecredit"
                    value={coursecredit}
                    onChange={(e) => setCoursecredit(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="session">Session :</label>
                  <input 
                      className="course-input"
                      placeholder="Session"
                      type="text" 
                      id = "session"
                      value = {session}
                      onChange={(e) => setSession(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="selectUser">Add Teacher : </label>
                  <select
                  className="course-input"
                  id="selectUser"
                  value={facultyuid}
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
                </div>
              </div>
            </div>
            <button className="course-add-btn">Save</button>
            </form>
  
            {/* Show Current Course */}
            <div className="show-course">
                <table>
                    <thead>
                        <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Course Type</th>
                        <th>Course Credit</th>
                        <th>Session</th>
                        <th>Course Teacher</th>
                        <th>Action  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(allcourse).map((id) =>(
                        
                        <tr key = {id}>
                            <td>{allcourse[id].coursecode}</td>
                            <td>{allcourse[id].coursename}</td>
                            <td>{allcourse[id].coursetype}</td>
                            <td>{allcourse[id].coursecredit}</td>
                            <td>{allcourse[id].session}</td>
                            <td>{allcourse[id].facultyname}</td>
                            <td>
                            <button onClick={()=> handleDelete(id)} className="course-btn-delete">Delete</button>
                            </td>
                        </tr>

                        ))}
                    </tbody>
                </table>
          </div>
        </div>
      </div>
  )
}

export default Course
