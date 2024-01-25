import { useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"
import { setData } from "../../Jsfunction/Firebase/addData";
import { availableRoom } from "../../Jsfunction/Firebase/fetchData";
import { deleteData } from "../../Jsfunction/Firebase/deleteData";
import './Room.css'


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
    <div className="class-container">
      <form onSubmit={handleSubmit} className="room-add">
      <h1 className="room-heading">Add Class Room</h1>
        <div className="room-add-input">
         <div>
          <label htmlFor="roomid" className="room-text">Room ID: </label>
            <input 
              className="room-input-box"
              placeholder="Room Id"
              type="text"
              id="roomid"
              value={roomid}
              onChange={(e)=> setRoomid(e.target.value)} 
            />
         </div>

          <div>
            <label htmlFor="selecttype" className="room-text">Room Type: </label>
            <select 
              className="room-input-box"
              id="selecttype"
              value={roomtype}
              onChange={(e) => setRoomtype(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Theory">Theory</option>
              <option value="Lab">Lab</option>
            </select>
          </div>
          <button className="room-add-btn">Save</button>
        </div>
      </form>

      <div className="current-room">
        <h1 className="room-heading">Current Room</h1>
        {Object.values(currentroom).map((room) =>(
          <div key={room.dbid} className="room-box">
            <div className="room-box-row1">
              <p className="room-id">{room.roomid}</p>
              <button onClick={() => handleDelete(room.dbid)} className="room-dlt-btn">Delete</button>
            </div>
            <p className="room-type">{room.roomtype}</p>
          </div>
        ))}
       
      </div>
    </div>
  )
}

export default Room
