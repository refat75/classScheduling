import {useState} from 'react'

const SignupForm = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div>
            <h1>Signup Page</h1>
            <form>
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
                <button type="submit">Sign Up</button>
            </form>
            <p>Have an account?</p>
            <button onClick={props.toggleForm}>Login</button>
        </div>
    )
}

export default SignupForm
