import { ongoingCourse } from "../Firebase/fetchData";
//Store all the user informataion locally
let cacheOngoingCourse = null;
let courseArrray = [];

export const getAllCourse = async () =>{
    if(!cacheOngoingCourse){
        courseArrray = ongoingCourse;
        cacheOngoingCourse = true;
    }
    return courseArrray;
}


