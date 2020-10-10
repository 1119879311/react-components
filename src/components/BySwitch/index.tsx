import React, { useState, useEffect } from "react"
import "./index.css"
export interface IBySwitch {
    checked?:boolean
    disabled?:boolean
    size?:"small"|"default"
    onChange?:Function

}

const BySwitch:React.FC<IBySwitch> = (props:IBySwitch)=>{
    let size = props.size||'default'
    let disabled = props.disabled||false

    const [checked,setChecked] = useState(props.checked)
    const onchange = ()=>{
        setChecked(!checked)
        props.onChange&&props.onChange(!checked)
    }
    useEffect(()=>{
        setChecked(props.checked)
    },[props.checked])
    return (
        <button className={`by-switch-warp by-switch-${size} ${checked?'checked':''}`} disabled={disabled} type="button" onClick={onchange}>
            <div className="by-switch-main"></div>
        </button>
    )
}

export default  BySwitch