import { availableRoom,ongoingCourse,allUsersData } from "../Jsfunction/Firebase/fetchData";


const data1 = { subjectCode: 'CSE 1101', roomNo: '412', facultyuid: 'EiRyF4aMbSbpsK9RX9iLi9FW8m63', teacher: 'JS' };
const data2 = { subjectCode: 'CSE 2103', facultyuid: 'AIejt1h0ACRLkIn21tTcaTxb2t82', roomNo: '412', teacher: 'AZ' };

export const generate = async() => {
    const initialTableData = [
        Array(6).fill([]), //Row 1
        Array(6).fill([]),
        Array(6).fill([]),
        Array(6).fill([]),
        Array(6).fill([]),
    ];
    // console.log("I am called!")
    const room = await availableRoom();
    const course = await ongoingCourse();
    const user = await allUsersData();

    // console.log(room);
    // console.log(course);
    let theoryRoom = ["none"], labRoom = ["none"];

    Object.keys(room).forEach((id) => {
        if(room[id].roomtype === "Theory"){
            theoryRoom = [...theoryRoom, room[id].roomid];
        } else {
            labRoom = [...labRoom, room[id].roomid];
        }
    })


    let theory_3_Credit = [], theory_2_Credit = [];
    let lab_2_Credit = [], lab_1_Credit = [];
    let labCourse = [];
    let labCounter = {};

    Object.keys(course).forEach((id) => {
        if(course[id].coursetype === "Theory"){
          if(course[id].coursecredit === "3.0")  theory_3_Credit = [...theory_3_Credit,id];
          else theory_2_Credit = [...theory_2_Credit, id];
        }
        else{
            labCounter[id] = 0;
            labCourse = [...labCourse, id];
            if(course[id].coursecredit === "1.0") lab_1_Credit = [...lab_1_Credit,id];
            else lab_2_Credit = [...lab_2_Credit, id];
        }
    })


    for(let i = 0; i <= 4; i++){
        if(i % 2 == 0){
            let subject = new Set();
            let div = Math.floor(theory_3_Credit.length / 4);
            let rem = theory_3_Credit.length % 4;
            let limit = [div,div,div,div];

            for(let j = 0; j < rem; j++) limit[j]++;
    

            for(let j = 0; j <= 3; j++){
                let session = new Set(), teacher = new Set();
                let countPerCell = 0;
                for(let k = 0; k < theory_3_Credit.length; k++){
                    let key = theory_3_Credit[k];
                    let curSession = course[key].session;
                    let curTeacher = course[key].facultyuid;
                    let curSubject = course[key].coursecode;
                    
                    if(!session.has(curSession) && !teacher.has(curTeacher) && !subject.has(curSubject)){
                        let match = curSubject.match(/\d+/);
                        let id = match[0][0];

                        session.add(curSession); 
                        teacher.add(curTeacher);
                        subject.add(curSubject);

                        const data = {
                            subjectCode: curSubject,
                            roomNo: theoryRoom[id],
                            facultyuid: curTeacher,
                            teacher: user[curTeacher].shortname
                        }
                        countPerCell++;
                        initialTableData[i][j] = [...initialTableData[i][j], data];
                        if(countPerCell >= limit[j]) break;
                    }
                }
            }
        } else {
            let subject = new Set();
            let div = Math.floor(theory_2_Credit.length / 4);
            let rem = theory_2_Credit.length % 4;
            let limit = [div,div,div,div];

            for(let j = 0; j < rem; j++) limit[j]++;

            for(let j = 3; j >= 0; j--){
                let session = new Set(), teacher = new Set();
                let countPerCell = 0;
                for(let k = 0; k < theory_2_Credit.length; k++){
                    let key = theory_2_Credit[k];
                    let curSession = course[key].session;
                    let curTeacher = course[key].facultyuid;
                    let curSubject = course[key].coursecode;
                    
                    if(!session.has(curSession) && !teacher.has(curTeacher) && !subject.has(curSubject)){
                        let match = curSubject.match(/\d+/);
                        let id = match[0][0];

                        session.add(curSession); 
                        teacher.add(curTeacher);
                        subject.add(curSubject);

                        const data = {
                            subjectCode: curSubject,
                            roomNo: theoryRoom[id],
                            facultyuid: curTeacher,
                            teacher: user[curTeacher].shortname
                        }
                        countPerCell++;
                        initialTableData[i][j] = [...initialTableData[i][j], data];
                        if(countPerCell >= limit[j]) break;
                    }
                }
            }
        }
    }


    // console.log(lab_1_Credit.length);
    // for(let i = 0; i < lab_1_Credit.length; i++){
    //     console.log(course[lab_1_Credit[i]]);
    // }

    // console.log(lab_2_Credit.length);
    // for(let i = 0; i < lab_2_Credit.length; i++){
    //     console.log(course[lab_2_Credit[i]]);
    // }
    // console.log(labRoom);

    const numRows = 5;
    const numCols = 6;

    const gridSet = [];
    const rowSet = [];

    for(let i = 0; i < numRows; i++){
        gridSet[i] = [];
        rowSet[i] = new Set();
        for(let j = 0; j < numCols; j++){
            gridSet[i][j] = [new Set(), new Set()];
                            //0 for teacher and 1 for session
        }
    }
    let labPlaced = new Set();
    let totalLab = labCourse.length;
    let preventInfinteLoop = 0;
    while(labPlaced.size < totalLab){
        preventInfinteLoop++;
        if(preventInfinteLoop > 10000) {
            console.log(preventInfinteLoop);
            break;
        }

        for(let i = 0; i < numRows; i++){
            for(let j = 4; j < numCols; j++){
                for(let k = 0; k < labCourse.length; k++){
                    let id = labCourse[k];
                    let highestClass = 0;
                    if(course[id].coursecredit === "1.0") highestClass = 1;
                    else highestClass = 2;

                    let curSession = course[id].session;
                    let curTeacher = course[id].facultyuid;
                    let curSubject = course[id].coursecode;

                    if(labCounter[id] == highestClass) labPlaced.add(id);

                    if(labCounter[id] < highestClass && !gridSet[i][j][0].has(curTeacher) && !gridSet[i][j][1].has(curSession) && !rowSet[i].has(curSubject)){
                        labCounter[id]++;
                        gridSet[i][j][0].add(curTeacher);
                        gridSet[i][j][1].add(curSession);
                        rowSet[i].add(curSubject)

                        let roomID = gridSet[i][j][0].size;

                        const data = {
                            subjectCode: curSubject,
                            roomNo: labRoom[roomID],
                            facultyuid: curTeacher,
                            teacher: user[curTeacher].shortname
                        }
                        
                        initialTableData[i][j] = [...initialTableData[i][j],data];
                        break;
                    }

                }
            }
        }
    }



    // initialTableData[0][0] = [data1, data2];
    // initialTableData[0][0] = [...initialTableData[0][0], data3];

    // console.log(initialTableData[0][1][0]);
    return initialTableData;
}