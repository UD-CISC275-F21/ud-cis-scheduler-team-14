
import COURSEPOOLJSON from "../assets/coursePool.json";
import { AllUserCoursesType, courseType, defaultOb} from "../interfaces/coursePool";

const CoursePool = COURSEPOOLJSON;
export const LOCAL_STRORAGE_COURSES = "current-courses";
export const defaultSemester = [
    {semesterName: "First Fall", semesterCourses:[CoursePool[0]]},
    {semesterName:"First Spring", semesterCourses:[CoursePool[2],CoursePool[3]]}
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

export const save=(AllUserCourses:AllUserCoursesType):void=>{
    localStorage.setItem(LOCAL_STRORAGE_COURSES,JSON.stringify(AllUserCourses));
};

export const editDbCourse=(tmpCourse:courseType, editId:string, coursePool:courseType[],setCoursePool: React.Dispatch<React.SetStateAction<courseType[]>> ):void=>{
    const tmpCoursePool:courseType[] = JSON.parse(JSON.stringify(coursePool));
    let curIndex = 0;
    tmpCoursePool.forEach((course,index)=>{
        if (course.id == editId) curIndex = index;
    });
    tmpCoursePool[curIndex] = tmpCourse;
    setCoursePool(tmpCoursePool);
};

export const checkPrerequisite=(requiredCourseId:string, semesterIndex:number,AllUserCourses:AllUserCoursesType):boolean=>{
    let tmpPreviousCourses:AllUserCoursesType= JSON.parse(JSON.stringify(AllUserCourses));
    let isSatisfy = false;
    tmpPreviousCourses=AllUserCourses.filter((item, index)=> index<semesterIndex);
    tmpPreviousCourses.map(course=>course.semesterCourses.map((item)=>{
        if(item.id === requiredCourseId)
            isSatisfy = true;
        return isSatisfy;
    }));
    return isSatisfy;
};

export const checkDuplicate=(courseId:string, semesterIndex:number,AllUserCourses:AllUserCoursesType):boolean=>{ //not working
    let isDuplicate = false;
    let tmpCurrentSemesterCourses:courseType[] = [];
    AllUserCourses.forEach((semester, index)=>{
        if(index === semesterIndex){
            tmpCurrentSemesterCourses = semester.semesterCourses;
        }
    });
    tmpCurrentSemesterCourses.forEach(course=>{
        if(course.id === courseId){
            isDuplicate = true;
        }
    });
    return isDuplicate;
};