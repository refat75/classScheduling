import { useEffect,useState } from 'react'
import Usernav from '../../Navbar/Usernav'

const Availability = () => {
  const dummy = [];

  for(let i = 0; i < 6; i++){
    const row = [];
    for(let j = 0; j < 7; j++){
      row.push(1);
    }
    dummy.push(row);
  }
  const [available,setAvailable] = useState(dummy);

  const daysOfWeek = ['Saturday','Sunday','Monday','Tuesday','Wednesday'];
  const timeSlots = ['9:00-9:50','9:50-10:40','10:40-11:30','11:30-12:20','12:20-1:55','1:55-3:30'];


  const onCellClick = (dayIndex,timeIndex) =>{
    const newGrid = [...available];
    newGrid[dayIndex][timeIndex] = 1 - newGrid[dayIndex][timeIndex];
    setAvailable(newGrid);
  }
  // console.log(available[0][1]);
  
  return (
    <>
    <Usernav/>
      <div>
            
          <div style={{ marginLeft: '10%', marginRight: '10%' }}>
              <table >
                <thead>
                  <tr>
                    <th>Day</th>
                    {timeSlots.map((time,timeIndex) =>(
                      // console.log(time,timeIndex);
                      <th key = {timeIndex}>{time}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysOfWeek.map((day,dayIndex) =>(
                    <tr key={dayIndex}>
                      <td>{day}</td>
                      {timeSlots.map((time,timeIndex) =>(
                        <td key={timeIndex}>
                          <button  onClick={()=>onCellClick(dayIndex,timeIndex)}
                            style={{
                              backgroundColor: available[dayIndex][timeIndex] ? '#4CBB17' : '#FF3131',
                              color: 'white', // Set text color to white for better visibility
                              border: 'none',
                              height: '40px',
                              width: '100px',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              outline: 'none',
                              fontSize: '13px',       // Set font size
                              fontWeight: 'bold',     // Set font weight
                              // textTransform: 'uppercase', // Convert text to uppercase
                              letterSpacing: '1px',
                            }}
                          >
                            {available[dayIndex][timeIndex] ? 'Available': 'Unavailable'}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
      </div>
    </>
  )
}

export default Availability
