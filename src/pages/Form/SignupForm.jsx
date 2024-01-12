import {useState} from 'react'
import userSignUp from '../../Auth/userSignUp'
import { useNavigate, useLocation } from 'react-router-dom'

const SignupForm = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard"

    const {error, signUp} = userSignUp();

    const handleSignOut = async(e) =>{
        e.preventDefault();
        console.log(email,password)
        await signUp(email,password);
        if(!error){
            navigate(from, {replace: true})
            setEmail("")
            setPassword("")
            return;
        } else{
            setErrorMessage(error);
        }

    }

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleSignOut}>
                <input 
                    type="email" 
                    placeholder="Email"
                    value = {email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value= {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p>{errorMessage}</p>}
                <button type="submit">Sign Up</button>
            </form>
            <p>Have an account?</p>
            <button onClick={props.toggleForm}>Login</button>
        </div>
    )
}

export default SignupForm
