import { useState,useEffect } from "react";
import { RiAddLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Select from 'react-select'
import { toast } from "react-toastify";

import { ongoingCourse,allUsersData,fetchRoutine,refreshCacheData } from "../../Jsfunction/Firebase/fetchData";
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
  const [curRow,setCurRow] = useState(-1);
  const [curColumn,setCurColumn] = useState(-1);



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
          setAllUser(curUser);
          setAllcourse(currentCourse);

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

  const updateCell = () =>{
    if(!courseId) {
      toast.error("Please Select a Course");
      return;
    }
    const data = allcourse[courseId];
    const userData = allUser[data.facultyuid];
    const classInfo = {
      subjectCode: data.coursecode,
      teacher: userData.shortname,
      roomNo: '412',
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
  const tableHeadStyle = {
    border: '1px solid black',
    padding: '5px',
    width: '40px',
    height: '40px'
    // textAlign: 'center',
  };
  const tableCellStyle = {
    border: '1px solid black',
    padding: '1px',
    width: '200px',
    height: '100px'
    // textAlign: 'center',
  };
  return (
    <div>
      <h1>This is Class Routine Page</h1>
      
      <div>
        <div>
          {showSelect? (
            <div>
              <p>Update Subject for {daysOfWeek[curRow]}, {timeSlots[curColumn]}</p>
              <Select
                options={options}
                isSearchable
                placeholder="Type Course Code,Course Name...."
                onChange={(selectedData) => setCourseId(selectedData.value)}
              />
              <button onClick={updateCell}>Update</button>
            </div>
          ): null}
        </div>
        
        <button onClick={() => {
          setShowSelect(false);
          setEnableEdit(!enableEdit);
        }}
        > <FaEdit /></button>
      </div>
      <table>
        <thead>
            <tr>
                <th style={tableHeadStyle}>Day</th>
                {timeSlots.map((time,timeIndex) =>(
                    <th key = {timeIndex} style={tableHeadStyle}>{time}</th>
                ))}
            </tr>
        </thead>
        <tbody >
            {daysOfWeek.map((day,rowIndex) =>(
                <tr key = {rowIndex} style={tableCellStyle}>
                    <td style={tableCellStyle}>{day}</td>
                    {tableData[rowIndex].map((cell,colIndex) =>(
                        <td key = {colIndex} style={tableCellStyle}>
                            {cell.map((classInfo,index) =>(
                                <div key={index}>
                                    {`${classInfo.subjectCode}: ${classInfo.teacher}(${classInfo.roomNo})`}
                                    {enableEdit? (
                                      <button 
                                      onClick={() => deleteClassInfo(rowIndex,colIndex,index)}
                                      style={{
                                        border: 'none',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent', 
                                      }}
                                      >
                                        <TiDelete style={{color: 'red',fontSize: '24px'}}/>
                                      </button>
                                      
                                    ): null}
                                </div>
                            ))}
                           {enableEdit ? (
                             <button onClick={() => {
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
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default ClassRoutine
