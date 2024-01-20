import { useEffect,useState } from 'react'
import getUser from '../../Jsfunction/userauth';
import { getUserData } from '../../Jsfunction/Firebase/fetchData';

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
  const timeSlots = ['9:00AM-9:50AM','9:50AM-10:40AM','10:40AM-11:30AM','11:30AM-12:20PM','12:20PM-1:55PM','1:55PM-3:30PM'];

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const userUid = await getUser();

        const data = await getUserData("users",userUid);

        const newDummy = [];

        for(let i = 0; i < 6; i++){
          const row = [];
          const temp = data.available[i].values;
          for(let j = 0; j < 7; j++){ 
            // console.log(i,j,temp[j]);
            row.push(temp[j]);
          }
          // console.log(i,data.available[i].values);
          // console.log(i,row)
          newDummy.push(row);
        }

        console.log(newDummy);
        setAvailable(newDummy);
        console.log(data.email)
        
      } catch (error) {
        console.log(error.message);
      }
     
    };
    
    fetchData();
  },[]);

  const onCellClick = (dayIndex,timeIndex) =>{
    const newGrid = [...available];
    newGrid[dayIndex][timeIndex] = 1 - newGrid[dayIndex][timeIndex];
    setAvailable(newGrid);
  }

  const onSaveClick = () =>{
    console.log("saveClick: ", available);
    const 

  }
  // console.log(available[0][1]);
  
  return (
    <>
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
              <button onClick={onSaveClick}>Save</button>
          </div>
      </div>
    </>
  )
}

export default Availability
