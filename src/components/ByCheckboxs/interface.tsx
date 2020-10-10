export interface Ibycheckbox{
    value?:string|number
    checked?:boolean
    size?:string
    disabled?:boolean
    indeterminate?:boolean
    defaultChecked?:boolean
    onChange?:Function
    children?:any
}

export interface IChexkboxGroup {
    name:string
    children?:any
    value?:string[]|number[]
    disabled?:boolean
    defaultValue?:string[]|number[]
    onChange?:Function
    [key:string]:any
}



