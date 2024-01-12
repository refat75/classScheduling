import {projectAuth} from "../Firebase/config"

let error = null;

const signUp = async (email, password) => {
    error = null;
    console.log(email,password);
    try {
        const res = await projectAuth.createUserWithEmailAndPassword(
            email,password
        );

        if(!res){
            throw new Error("Something went wrong");
        }
    } catch (err) {
        error = err.message;
    }
};

const userSignUp = () =>{
    return {error, signUp};
}

export default userSignUp;
