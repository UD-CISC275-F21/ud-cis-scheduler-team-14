export const defaultOb = {
    "id":"not found",
    "name":"",
    "description":"",
    "credit":0,
    "prerequisite":[],
    "required":false,
    "elective":false
};
export type courseType = {
    id:string
    name:string
    description:string
    credit:number
    prerequisite:Array<string> 
    required:boolean
    elective:boolean
  }
export type semesterName = string
export type semesterCoursesType = courseType[]
export type semesterType = [semesterName,semesterCoursesType]
export type AllUserCoursesType = {
    semesterName: string;
    semesterCourses: courseType[];
}[]

// export interface semesterCourses{
//     id: string;
//     name: string;
//     description: string;
//     credit: number;
//     prerequisite: string[];
//     required: boolean;
//     elective: boolean;
// }[]