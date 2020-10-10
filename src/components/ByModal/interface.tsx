import { ReactNode } from "react";
interface ImodalBase {
    title?:string|ReactNode
    content?:string|ReactNode
    width?:string|number
    onOkText?:string
    onCanleText?:string
    onOk?:Function
    onCanle?:Function
    maskClosable?:boolean 
}

export interface IByModalType extends ImodalBase {
    type?:string,
    isColse?:boolean
    [key:string]:any
}


export interface IByModal extends ImodalBase{ 
    visible?:boolean
    destory?:boolean
    children?:any
    footerVisible?:boolean
    footer?:ReactNode|null
    [key:string]:any
}