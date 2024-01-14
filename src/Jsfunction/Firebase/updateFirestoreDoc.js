import {getFirestore,doc,updateDoc} from "firebase/firestore"
import app from "../../Firebase/config"

const db = getFirestore(app);

const updateFirestoreDocument = async (path,documentId,dataToUpdate) =>{
    const docRef = doc(db,path,documentId);
    console.log(path,documentId,dataToUpdate);
    try{
        await updateDoc(docRef,dataToUpdate);
        console.log("UpdateFireStore: Data Updated Successfully");
    } catch(error){
        console.log("UpdateFireStore: Update Unsuccessfull")
    }
};

export default updateFirestoreDocument;