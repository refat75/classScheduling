import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import app from "../Firebase/config"

let error = null;

const login = async (email, password) => {
    error = null;
    const auth = getAuth(app);
    try{
        const res = await signInWithEmailAndPassword(auth,email,password);
        error = null;
       

    } catch(err){
        error = err.message;
        console.log(error);
    }
}

const userLogin = () => {
    return {error, login};
}

export default userLogin;