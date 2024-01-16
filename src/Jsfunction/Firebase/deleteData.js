import {getFirestore,deleteDoc,doc} from "firebase/firestore"
import app from "../../Firebase/config"

const db = getFirestore(app)

export const deleteData = async (collectionPath, uid) =>{
    try {
        await deleteDoc(doc(db,collectionPath,uid))
    } catch (error) {
        console.log("deleteData.js: ", error)
    }
}