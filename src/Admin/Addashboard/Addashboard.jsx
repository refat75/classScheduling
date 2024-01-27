import { useState,useEffect } from "react"
import getUser from "../../Jsfunction/userauth";

import { fetchRoutine } from "../../Jsfunction/Firebase/fetchData";

const daysOfWeek = ['Saturday','Sunday','Monday','Tuesday','Wednesday'];
const timeSlots = ['9:00AM-9:50AM','9:50AM-10:40AM','10:40AM-11:30AM','11:30AM-12:20PM','12:20PM-1:55PM','1:55PM-3:30PM'];
let dayIndex = -1;
let currentUserid = null;
const Addashboard = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [todaysClass, setTodaysClass] = useState(Array(6).fill(null))
  
  
  useEffect(() => {
    const getCurrentDay = () => {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date();
      const dayName = daysOfWeek[today.getDay()];
      let id = today.getDay();
     
      if(id == 6) dayIndex = 0;
      else if(id >= 0 && id <= 3) dayIndex = id+1;

      // console.log(dayIndex);
      setCurrentDay(dayName);
    };

    const fetchData = async() =>{
      try {
        currentUserid = await getUser(); 
        const routineData = await fetchRoutine();
        // console.log(routineData);
        Object.keys(routineData).forEach((key) =>{
          const curDay = parseInt(key[0]);
          const curSlot = parseInt(key[1]);
          if(curDay == dayIndex){
            const data = routineData[key];
            data.map((item,index) =>{
              if(item.facultyuid == currentUserid){
                // console.log(item, index,key)
                const dataToSet = {
                  subjectCode: item.subjectCode,
                  roomNo: item.roomNo,
                  timeSlot: timeSlots[curSlot],

                }
                // console.log(dataToSet);
                setTodaysClass((prevArray) =>{
                  const newArray = [...prevArray];
                  newArray[curSlot] = dataToSet;
                  return newArray;
                })
              }
          })
          }
        })
      } catch (error) {
        alert(error);
      }
    }

    getCurrentDay();
    fetchData();
  }, []);
  return (
    <div>
      <h1>{currentDay}</h1>
      <div>
        <h1>Today's Class</h1>
        {todaysClass.map((item,index) =>(
          item !== null && <div key = {index}>
            <h2>{item.subjectCode}</h2>
            <p>{item.timeSlot}</p>
            <p>{item.roomNo}</p>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Addashboard
