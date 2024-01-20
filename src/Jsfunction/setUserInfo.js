import {
    getFirestore, 
    doc, 
    setDoc
} from "firebase/firestore";

import app from "../Firebase/config";

const db = getFirestore(app);

const setUserInfo = async (uid,curData) => {
    const  userRef = doc(db,'users', uid);
   
    const flattenedAvailable = curData.available.map(row => ({ values: row }));

    try {
        await setDoc(userRef, {
            name: curData.name,
            shortname: curData.shortName,
            role: curData.role,
            status: curData.status,
            email: curData.email,
            available: flattenedAvailable
        });
    } catch (error) {
        console.log("updateUserInfo.js: Error Updating Data",error);

    }
};

export default setUserInfo;