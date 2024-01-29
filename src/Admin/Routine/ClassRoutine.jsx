import { useState,useEffect } from "react";
import { RiAddLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Select from 'react-select'
import { toast } from "react-toastify";
import './ClassRoutine.css'

import { ongoingCourse,allUsersData,fetchRoutine,availableRoom } from "../../Jsfunction/Firebase/fetchData";
import { setData } from "../../Jsfunction/Firebase/addData";

const initialTableData = [
    Array(6).fill([]), //Row 1
    Array(6).fill([]),
    Array(6).fill([]),
    Array(6).fill([]),
    Array(6).fill([]),
];
const ClassRoutine = () => {
  const [tableData, setTableData] = useState(initialTableData);
  const [enableEdit, setEnableEdit] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [curRow,setCurRow] = useState(0);
  const [curColumn,setCurColumn] = useState(0);
  const [currentroom,setCurrentRooms] = useState({})
  const [roomInfo, setRoomInfo] = useState("")

  const [allcourse, setAllcourse] = useState({});
  const [allUser, setAllUser] = useState({});

  const daysOfWeek = ['Saturday','Sunday','Monday','Tuesday','Wednesday'];
  const timeSlots = ['9:00AM-9:50AM','9:50AM-10:40AM','10:40AM-11:30AM','11:30AM-12:20PM','12:20PM-1:55PM','1:55PM-3:30PM'];

  const unflattenData = (flatenData) =>{
    Object.keys(flatenData).forEach((key) => {
      const dayIndex = parseInt(key[0]);
      const timeSlotIndex = parseInt(key[1]);

      initialTableData[dayIndex][timeSlotIndex] = flatenData[key];
    });
    setTableData(initialTableData);
  }

  useEffect(()=>{
    const fetchData = async()=> {
      try {
          const currentCourse = await ongoingCourse();
          const curUser = await allUsersData();
          const routineData = await fetchRoutine();
          const roomdata = await availableRoom();
          setAllUser(curUser);
          setAllcourse(currentCourse);
          setCurrentRooms(roomdata)
          unflattenData(routineData);
      } catch (error) {
        console.log("Course.jsx:", error);
      }
    }
    fetchData();
  },[]); 

  const options = Object.entries(allcourse).map(([key, value]) =>({
    value: value.dbid,
    label: value.coursecode+": "+value.coursename,
  }));

  const roomData = Object.entries(currentroom).map(([key,value]) =>({
    value: value.roomid,
    label: value.roomid+": "+value.roomtype,   
  }))

  const updateCell = () =>{
    if(!courseId) {
      toast.error("Please Select a Course");
      return;
    }
    if(!roomInfo){
      toast.error("Please Select Room");
      return;
    }
    const data = allcourse[courseId];
    const userData = allUser[data.facultyuid];
   
    const classInfo = {
      subjectCode: data.coursecode,
      teacher: userData.shortname,
      facultyuid: data.facultyuid,
      roomNo: roomInfo,
    };
   
    setTableData((prevTableData) =>{
      const newTableData = [...prevTableData];
      newTableData[curRow][curColumn] = [...newTableData[curRow][curColumn],classInfo];
      return newTableData;
    });
    // console.log("Button clicked",daysOfWeek[curRow],timeSlots[curColumn], courseId)
    setCourseId("");
  };

  const deleteClassInfo = (rowIndex, colIndex, index) => {
    setTableData((prevTableData) => {
      const newTableData = [...prevTableData];
      const updatedCell = [...newTableData[rowIndex][colIndex]];
      updatedCell.splice(index, 1); // Remove the classInfo at the specified index
      const newRow = [...newTableData[rowIndex]];
      newRow[colIndex] = updatedCell;
      newTableData[rowIndex] = newRow;
      return newTableData;
    });
  };

  const handleSave = async () => {
 
    const flatenData = {};

    daysOfWeek.forEach((day,dayIndex) =>{
      timeSlots.forEach((timeSlot, timeSlotIndex) =>{
        const key = `${dayIndex}${timeSlotIndex}`;
        flatenData[key] = tableData[dayIndex][timeSlotIndex];
      })
    })

   
    await setData("routineData","0101",flatenData);
    
  }

  return (
    <div className="routine-container">
      <div className="routine-container-row1">
        <div>
          {showSelect? (
            <div className="routine-container-row11">
              <p>Update Subject for {daysOfWeek[curRow]}, {timeSlots[curColumn]}</p>
              <Select
                options={options}
                isSearchable
                placeholder="Type Course Code,Course Name...."
                onChange={(selectedData) => setCourseId(selectedData.value)}
              />
              <Select
                options={roomData}
                isSearchable
                placeholder = "Type Room ID.."
                onChange={(selectedData) => setRoomInfo(selectedData.value)}
              />
              <button onClick={updateCell}>Update</button>
            </div>
          ): null}
        </div>
      </div>
      <button onClick={() => {
          setShowSelect(false);
          setEnableEdit(!enableEdit);
        }}
        > <FaEdit /></button>
      <table className="routine-table">
        <thead>
            <tr>
                <th >Day</th>
                {timeSlots.map((time,timeIndex) =>(
                    <th key = {timeIndex}>{time}</th>
                ))}
            </tr>
        </thead>
        <tbody >
            {daysOfWeek.map((day,rowIndex) =>(
                <tr key = {rowIndex}>
                    <td>{day}</td>
                    {tableData[rowIndex].map((cell,colIndex) =>(
                        <td key = {colIndex}>
                            {cell.map((classInfo,index) =>(
                                <div className="class-box-container" key={index}>
                                  <div className="class-box" key={index}>
                                    <div>
                                      {`${classInfo.subjectCode}: ${classInfo.teacher}(${classInfo.roomNo})`}
                                    </div>
                                    <div>
                                    {enableEdit? (
                                      <button 
                                      onClick={() => deleteClassInfo(rowIndex,colIndex,index)}
                                      >
                                        <TiDelete className='class-box-icon'/>
                                      </button>
                                      
                                    ): null}
                                    </div>
                                  </div>
                                </div>
                            ))}
                           {enableEdit ? (
                                <button className='class-btn' onClick={() => {
                                setShowSelect(true)
                                setCurRow(rowIndex);
                                setCurColumn(colIndex);
                              }}><RiAddLine /></button>
                           ): null }
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button className="class-save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default ClassRoutine
