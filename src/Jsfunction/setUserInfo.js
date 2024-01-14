import {
    getFirestore, 
    doc, 
    setDoc
} from "firebase/firestore";

import app from "../Firebase/config";

const db = getFirestore(app);

const setUserInfo = async (uid,username,shortname,role) => {
    const  userRef = doc(db,'users', uid);
    console.log(uid,username,shortname,role);
    try {
        await setDoc(userRef, {
            name: username,
            shortname: shortname,
            role: role
        });
    } catch (error) {
        console.log("updateUserInfo.js: Error Updating Data");
    }
};

export default setUserInfo;