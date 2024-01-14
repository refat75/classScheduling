import {getAuth, signOut} from "firebase/auth"
import app from "../Firebase/config";

let error = null;

const logOut = async() => {
    error = null;
    const auth = getAuth(app);

    try{
        await signOut(auth)

    } catch(err){
        error = err.message;
    }
}

const userLogOut = () => {
    return {error, logOut}
}

export default userLogOut;