export interface Ibyradio {
    value?:string|number
    checked?:boolean
    size?:string
    name?:string
    disabled?:boolean
    defaultChecked?:boolean
    onChange?:Function
}

export interface IbyRadioGroup {
    name:string
    children?:any
    value?:any
    disabled?:boolean
    defaultValue?:any
    onChange?:Function
    [key:string]:any
}