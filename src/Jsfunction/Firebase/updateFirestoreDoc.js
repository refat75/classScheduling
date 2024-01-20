import {getFirestore,doc,updateDoc} from "firebase/firestore"
import app from "../../Firebase/config"

const db = getFirestore(app);

const updateFirestoreDocument = async (path,documentId,dataToUpdate) =>{
    const docRef = doc(db,path,documentId);

    try{
        await updateDoc(docRef,dataToUpdate);
        console.log("UpdateFireStoreDoc.js: Data Updated Successfully");
    } catch(error){
        console.log("UpdateFireStoreDoc.js: Update Unsuccessfull")
    }
};

export default updateFirestoreDocument;