export interface semesterCourses{
    id: string;
    name: string;
    description: string;
    credit: number;
    prerequisite: string[];
    required: boolean;
    elective: boolean;
}[]
export interface course{
    id:string
    name:string
    description?:string
    credit:number
    prerequisite:Array<string> //  ?? string[]
    required:boolean
    elective:boolean
  }