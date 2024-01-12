import {useState} from 'react'
import userLogin from '../../Auth/userLogin'
import { useNavigate, useLocation } from 'react-router-dom'
import './LoginSignup.css'


const LoginForm = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null);


    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const {error, login} = userLogin();

    const handleLogin = async(e) => {
        e.preventDefault();
        await login(email, password);
        if(!error){
            navigate(from, {replace: true});
            setEmail("");
            setPassword("");
            return;
        } else {
            console.log(error);
            setErrorMessage(error);
        }
    };  

    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="text">Login Page</div>
                    <div className="underline"></div>
                </div>
                {error && <p className='error-message'>{errorMessage}</p>}
                <form onSubmit = {handleLogin} className='inputs'>
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
                        <button type="submit" className='submit'>Login</button>
                        <p className='no-account'>Have no account?</p>
                        <button onClick={props.toggleForm} className='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginForm
