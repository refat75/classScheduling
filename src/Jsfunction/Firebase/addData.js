import {
    getFirestore,
    collection,
    addDoc,
    doc,
    setDoc
} from "firebase/firestore"
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

export const setData = async (collectionpath, uid, dataToSet) => {
    console.log(collectionpath,uid, dataToSet);
    const docRef = doc(db,collectionpath,uid);
    try {
        await setDoc(docRef,dataToSet);
        console.log("Data Updated Successfully");
    } catch (error) {
        console.log(error)
    }
}