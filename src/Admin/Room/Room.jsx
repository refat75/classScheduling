import { useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"
import { setData } from "../../Jsfunction/Firebase/addData";
import { availableRoom } from "../../Jsfunction/Firebase/fetchData";
import { deleteData } from "../../Jsfunction/Firebase/deleteData";


const Room = () => {
  const [roomid, setRoomid] = useState("");
  const [roomtype,setRoomtype] = useState("");
  const [currentroom, setCurrentRooms] = useState({});

  useEffect(() =>{
    const getRoomData = async () => {
      try {
        const roomdata = await availableRoom();
        setCurrentRooms(roomdata);

      } catch (error) {
          console.log(error);
      }
    };

    getRoomData();
  },[])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!roomid || !roomtype) {
      alert("Please fillup all the field")
      return
    }
    const dataToSet = {
      roomid: roomid,
      roomtype: roomtype,
      dbid: uuidv4()
    }

    // console.log(dataToSet);
    try {
      await setData("room",dataToSet.dbid,dataToSet);
      setCurrentRooms((prevRoom) =>({
        ...prevRoom,
        [dataToSet.dbid]: dataToSet,
      }));   
      setRoomid("");
      setRoomtype("");   
    } catch (error) {
      console.log(error)
    }
    
  }

  const handleDelete = async(id) => {
    try {
      const updatedRooms = {...currentroom};
      delete updatedRooms[id];
      setCurrentRooms(updatedRooms);
      await deleteData("room",id);
    } catch (error) {
      console.log("Error while deleting data");
    }
  }

  return (
    <div>
      <h1>Add Class Room</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomid">Room ID/Name: </label>
        <input 
          type="text"
          id="roomid"
          value={roomid}
          onChange={(e)=> setRoomid(e.target.value)} 
        />

        <label htmlFor="selecttype">Room Type</label>
        <select 
          id="selecttype"
          value={roomtype}
          onChange={(e) => setRoomtype(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Theory">Theory</option>
          <option value="Lab">Lab</option>
        </select>

        <button>Save</button>
      </form>

      <div>
        <h1>Current Room</h1>
        
        
        {Object.values(currentroom).map((room) =>(
          <div key={room.dbid}>
            <h1>{room.roomid}</h1>
            <p>{room.roomtype}</p>
            <button onClick={() => handleDelete(room.dbid)}>Delete</button>
          </div>
        ))}
       
      </div>
    </div>
  )
}

export default Room
