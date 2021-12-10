
import COURSEPOOLJSON from "../assets/coursePool.json";
import { AllUserCoursesType, courseType, defaultOb} from "../interfaces/coursePool";

const coursePool = COURSEPOOLJSON;
export const LOCAL_STRORAGE_COURSES = "current-courses";
export const defaultSemester = [
    {semesterName: "First Fall", semesterCourses:[coursePool[0]]},
    {semesterName:"First Spring", semesterCourses:[coursePool[2],coursePool[3]]}
];
export const defaultSemesterPool = [defaultSemester[0].semesterName,defaultSemester[1].semesterName];

export const getLocalStorageCourses = ():AllUserCoursesType | (() => AllUserCoursesType)=>{
    const defaultCourses : string| null= localStorage.getItem(LOCAL_STRORAGE_COURSES);
    if(defaultCourses===null){
        return [...defaultSemester];
    }else{
        return JSON.parse(defaultCourses);
    }
};
export const getLocalStorageSemester=():string[]=>{
    const tmpSemesterPool:string[] = [];
    const defaultCourses : string| null= localStorage.getItem(LOCAL_STRORAGE_COURSES);
    if(defaultCourses===null){
        return defaultSemesterPool;
    } else{
        const tmpDefaultCourses:AllUserCoursesType = JSON.parse(defaultCourses);
        tmpDefaultCourses.forEach(semester=>tmpSemesterPool.push(semester.semesterName));
        return tmpSemesterPool;
    }
};
export const addSemester=(semesterPool:string[],setAllUserCourses: (value: React.SetStateAction<AllUserCoursesType>) => void,
    AllUserCourses: AllUserCoursesType,setSemesterPool: React.Dispatch<React.SetStateAction<string[]>>):void=>{

    const newSemesterName = semesterPool.length+1;
    const tmpSemesterPool = JSON.parse(JSON.stringify(semesterPool));
    tmpSemesterPool.push("New Semester "+newSemesterName);
    setAllUserCourses([ ...AllUserCourses,{semesterName: "New Semester "+newSemesterName, semesterCourses:[]} ]);
    setSemesterPool(tmpSemesterPool);
};
export const addCourse = (course:courseType,semesterIndex:number,AllUserCourses: AllUserCoursesType,
    setAllUserCourses: (value: React.SetStateAction<AllUserCoursesType>) => void):void => {
    const tmpAllUserCourses = JSON.parse(JSON.stringify(AllUserCourses));
    tmpAllUserCourses[semesterIndex].semesterCourses = [...tmpAllUserCourses[semesterIndex].semesterCourses,course];
    setAllUserCourses(tmpAllUserCourses);
    alert("Add Success");
};
export const searchCourse=(id:string,coursePool: courseType[]):courseType=>{
    const TmpCoursePool:courseType[] = JSON.parse(JSON.stringify(coursePool));
    const uppercase = id.toUpperCase();
    let curIndex = 0;
    let exist = false;
    TmpCoursePool.forEach((value,index) => {
        if (value.id===uppercase) {
            curIndex = index;
            exist = true;
        }
    });
    if (exist){
        return TmpCoursePool[curIndex];
    }
    return defaultOb;
};

