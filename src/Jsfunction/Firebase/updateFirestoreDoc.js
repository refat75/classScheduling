import {getFirestore,doc,updateDoc} from "firebase/firestore"
import app from "../../Firebase/config"
import { toast } from "react-toastify";
const db = getFirestore(app);

const updateFirestoreDocument = async (path,documentId,dataToUpdate) =>{
    const docRef = doc(db,path,documentId);

    try{
        await updateDoc(docRef,dataToUpdate);
        toast.success("Data Updated Successfully");
    } catch(error){
        toast.error("Data Update Unsuccessfull");
    }
};

export default updateFirestoreDocument;