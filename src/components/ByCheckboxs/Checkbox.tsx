import React, { useContext } from "react"
import {Ibycheckbox} from "./interface"
import {checkboxContext} from "./Group"
import "./index.css"
const ByCheckbox = (props:Ibycheckbox)=>{

    let { size="small", disabled=false, value, indeterminate=false  } = props
    const checkboxGroup = useContext(checkboxContext)
    let newProps = {}
    let name ='';
    //分组 ：
    if(checkboxGroup){
        if(Array.isArray(checkboxGroup.value)){
            newProps = {checked:checkboxGroup.value.includes(value)}
        }else{
            newProps = Array.isArray(checkboxGroup.defaultValue)?{defaultChecked:checkboxGroup.defaultValue.includes(value)}:{defaultChecked:false}
        }
        disabled = checkboxGroup.disabled||false
        name = checkboxGroup.name||'checkbox';
        size = checkboxGroup.size||'small'

    }else{ //不分组。受控与非受控
         newProps = props.checked!==undefined?{checked:props.checked}:{defaultChecked:props.defaultChecked}
    }
    

    const Change = (e:any)=>{
        e.persist()
        if(checkboxGroup){ //分组
            checkboxGroup.onChange&&checkboxGroup.onChange(value,e.target.checked)
        }else{
            props.onChange&&props.onChange(e.target.checked)
        }


    }
    let inderClassName =  indeterminate?' by-checkbox-lable-indeterminate ':"";
    let disabledClassName = disabled?' by-checkbox-lable-disabled ':'';
    return <label className={'by-checkbox-lable ' +inderClassName + disabledClassName }>
            <span className={"by-checkbox by-checkbox-"+size}>
                <input type="checkbox" className="by-checkbox-input" value={value} disabled={disabled} name={name} {...newProps} onChange={Change}  {...newProps} />
                <span className="by-checkbox-inner"></span>
            </span>
            {props.children?<span>{props.children}</span>:""}
    </label>
    // return <input  type="checkbox" value ={value} name={name}  disabled ={disabled} {...newProps} onChange={Change}  />
}

export default ByCheckbox