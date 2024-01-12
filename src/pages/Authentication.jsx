import LoginForm from "./Form/LoginForm"
import SignupForm from "./Form/SignupForm"
import { useState } from "react"
const Authentication = () => {
  const [toggle, setToggle] = useState(true)

  const handleToggle = () =>{
    setToggle(!toggle)
  }

  return (
    <div>
      {toggle? 
        <LoginForm toggleForm = {handleToggle}/> : 
        <SignupForm toggleForm = {handleToggle}/>
      }
    </div>
  )
}

export default Authentication
