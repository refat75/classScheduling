import userLogOut from "../Auth/userLogout"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate();
  const {error, logOut} = userLogOut();

  const handleLogOut = async() =>{
    await logOut();
    if(!error){
      navigate("/")
    }
  }

  return (
    <div>
      <h1>Welcome to The Dashboard</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default Dashboard
