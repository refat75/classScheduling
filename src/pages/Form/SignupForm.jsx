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

    const handleSignUp = async(e) =>{
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
        <>
            <div className="container">
                <div className="header">
                    <div className="text">SignUp Page</div>
                    <div className="underline"></div>
                </div>
                <form className='inputs' onSubmit={handleSignUp}>
                    <input 
                        className='input'
                        type="email" 
                        placeholder="Email"
                        value = {email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <input 
                        className='input'
                        type="password" 
                        placeholder="Password"
                        value= {password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="submit-container">
                        <button type="submit" className='submit'>Sign Up</button>
                        <p className='no-account'>Have an account?</p>
                        <button onClick={props.toggleForm} className='submit'>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignupForm
