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

        const dummy = [];
        for(let i = 0; i < 6; i++){
            const row = [];
            for(let j = 0; j < 7; j++){
            row.push(1);
            }
            dummy.push(row);
        }

        const user = auth.currentUser;
        const data = {
            name: "Set Name",
            shortName: "shortName",
            role: "faculty",
            status: "available",
            email: email,
            available: dummy
        }
        await setUserInfo(user.uid,data)
    } catch (error) {
        // throw error;
        console.log("userSignup.js:error Updating Information");
    }
};

const userSignUp = () =>{
    return {error, signUp};
}

export default userSignUp;
