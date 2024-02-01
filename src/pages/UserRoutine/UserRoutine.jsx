import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import { fetchRoutine } from "../../Jsfunction/Firebase/fetchData";
const initialTableData = [
  Array(6).fill([]), //Row 1
  Array(6).fill([]),
  Array(6).fill([]),
  Array(6).fill([]),
  Array(6).fill([]),
];

const UserRoutine = () => {
  const [tableData, setTableData] = useState(initialTableData);


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


  useEffect(() =>{
    const fecthData = async() =>{
      try {
        const routineData = await fetchRoutine();
        unflattenData(routineData);
      } catch (error) {
        toast.error("Error when fecthing Data")
      }
    }
    fecthData();
  },[])  
  return (
    <div>
      <div>
        <table>
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
                                <div key={index}>
                                  <div key={index}>
                                    <div>
                                      {`${classInfo.subjectCode}: ${classInfo.teacher}(${classInfo.roomNo})`}
                                    </div>
                                  </div>
                                </div>
                            ))}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserRoutine
