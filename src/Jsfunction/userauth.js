import app from "../Firebase/config";
import {getAuth,onAuthStateChanged} from "firebase/auth"

const getUser = () =>{
    return new Promise((resolve, reject) => {
        const auth = getAuth(app);
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user.uid);
          } else {
            // User is not logged in
            resolve(null);
          }
    
          // Unsubscribe to the listener to avoid memory leaks
          unsubscribe();
        });
      });
}

export default getUser;