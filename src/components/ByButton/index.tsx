import React, { ReactNode } from "react"
import "./index.css"

interface IByButton{
    size?:"lager"|"small",
    type?:"primary"|"danger"|"warning"|"success",
    icon?:string|ReactNode
    disabled?:boolean
    round?:boolean
    block?:boolean
    onClick?:Function,
    children?:any,
    [key:string]:any
}

const ByButton = (props:IByButton)=>{
    let {type,size,disabled=false,block=false,round= false,onClick=function(){}} = props
    console.log(disabled)
    let classStr = type?` ${' by-btn-'+type} `:'';
    classStr = classStr + (size? ` by-btn-${size} `:'');
    classStr = classStr + (block? ` by-btn-block `:'');
    classStr = classStr + (round? ` by-btn-round `:'');

    classStr = classStr + (disabled? ` by-btn-disabled `:'');
    return (
        <button  type="button" className={`by-btn ${classStr} `} disabled={disabled}  onClick={(e)=>onClick(e)} >
            {props.icon? props.icon:''}
            {props.children?<span>{props.children}</span>:''}
        </button>
    )
}

export default ByButton