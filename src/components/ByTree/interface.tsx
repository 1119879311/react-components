import {LocationDescriptorObject } from "history"
import { ReactNode } from "react";

export interface ItreenItme {
    name:string|ReactNode,
    id:string|number
    title?:string|ReactNode,
    pathname?:string|LocationDescriptorObject,
    hide?:boolean,
    live?:string,
    childrens?:ItreenItme[]
    onToggle?:Function,
    render?:(options:Omit<ItreenItme,'render'>)=>ReactNode|string,
    [key:string]:any
}
export interface ITreeList {
    data:ItreenItme[] ,
    [key:string]:any
}

export interface ITree extends ITreeList {
    selectKeys?:string
    openKeys?:string[]
    onToggle?:()=>void
    onClick?:()=>void
}