import setUserInfo from "../Jsfunction/setUserInfo";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import app from "../Firebase/config";
let error = null;

const signUp = async (email, password) => {
    error = null;
    
    const auth = getAuth(app);

    try {
        const res = await createUserWithEmailAndPassword(
           auth,email,password
        );

        if(!res){
            throw new Error("Something went wrong");
        }
    } catch (err) {
        error = err.message;
    }

    try {
        const user = auth.currentUser;
        const data = {
            name: "Set Name",
            shortName: "shortName",
            role: "faculty",
            status: "available",
            email: email
        }
        await setUserInfo(user.uid,"Set Name","Short Name","faculty",data)
    } catch (error) {
        // throw error;
        console.log("userSignup.js:error Updating Information");
    }
};

const userSignUp = () =>{
    return {error, signUp};
}

export default userSignUp;
