import {useState} from 'react'

const SignupForm = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="text">SignUp Page</div>
                    <div className="underline"></div>
                </div>
                <form className='inputs'>
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
