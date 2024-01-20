import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where
} from 'firebase/firestore';
import app from "../../Firebase/config";

const db = getFirestore(app);

//Get Specifiq User Information
let cacheUserData = null;
export const getUserData = async (path,id) =>{
    if(!cacheUserData){
       
        const docRef = doc(db, path, id);

        try {
            const docSnap = await getDoc(docRef);
            cacheUserData = docSnap.data();
            // console.log(cacheUserData.available[0].values);
        } catch (error) {
            console.error('Error checking document existence:', error.message);
        }
    }
    return cacheUserData;
}



//Get all the available User Information.
const userArray = [];
let cacheAllUser = null;
export const allUsersData = async () =>{
    if(!cacheAllUser){
        const docRef = collection(db,"users");

        const q = query(docRef,where("status", "==", "available"));
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) =>{
                // console.log(doc.id, "=>", doc.data().email);
                userArray[doc.id] = doc.data();
            });

            // console.log(userArray);
            cacheAllUser = true;
         } catch(error){
            console.log("fetchData.js/allUserData: ", error);
         }
    }
    return userArray;
}

//Get all the ongoing Course Information
const courseArray = [];
let cacheOngoingCourse = null;

export const ongoingCourse = async () => {
    if(!cacheOngoingCourse){
        const docRef = collection(db,"courses");

        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((doc) => {
            courseArray[doc.id] = doc.data();
        });

        cacheOngoingCourse = true;
    }

    return courseArray;
}