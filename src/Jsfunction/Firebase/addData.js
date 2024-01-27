import {
    getFirestore,
    collection,
    addDoc,
    doc,
    setDoc
} from "firebase/firestore"
import app from "../../Firebase/config"
import { refreshCacheData } from "./fetchData";
import { toast } from "react-toastify";

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
    const docRef = doc(db,collectionpath,uid);
    try {
        await setDoc(docRef,dataToSet);
        toast.success("Data Updated Successfully");
        refreshCacheData();
    } catch (error) {
        toast.error("Data Doesn't Updated");
        console.log(error);
    }
}