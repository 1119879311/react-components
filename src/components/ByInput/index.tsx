import React from "react"

export interface IByInput {
    defaultValue?:string
    value?:string
    onChage?:Function
    onBlur?:Function
    [key:string]:any
}

const ByInupt = (props:IByInput)=>{
    let {defaultValue=""} = props
    const oninput = (e:any)=>{
        e.persist()
        console.log(e.target.value)
        props.onChage&&props.onChage(e.target.value)
    }
  
    let inpProps = props.value!==undefined?{value:props.value}:{defaultValue:defaultValue}
    return (
        <input type="text" {...inpProps}  onChange={oninput} />
    )
}
export default ByInupt

