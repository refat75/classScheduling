import {getFirestore,collection,addDoc} from "firebase/firestore"
import app from "../../Firebase/config"

const db = getFirestore(app)

export const addData = async (collectionpath, dataToSet) =>{
    try {   
        const docRef = await addDoc(collection(db,collectionpath),dataToSet)
        // console.log("data set Successfully", docRef);
        
        
    } catch (error) {
        console.log("addData.js:",error.message);
    }
};