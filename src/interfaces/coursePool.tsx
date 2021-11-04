export interface CoursePool{
    id:number
    name:string
    description?:string
    credit:number
    prerequisite:Array<string> //  ?? need fix
    required:boolean
    elective:boolean

}