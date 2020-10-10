import React,{useContext} from 'react'
import {Ibyradio} from "./interface"
import {RadioGroupContext} from "./Group"
import "./index.css"

const ByRadio:React.FC<Ibyradio> = (props)=>{
    let radioContext = useContext(RadioGroupContext)
    let {
        checked,
        defaultChecked,
        size="small",
        value="",
        disabled=false,
        onChange = function(){}
    } = props
    // 如果是分组
    let name;
    let checkedProps={};
    if(radioContext){
        if(value===''||value===undefined) console.error('ByRadio Value type cannot be empty or undefined')
        checked = radioContext.value===value&&value!=='';
        name = radioContext.name
        size = radioContext.size
        disabled = radioContext.disabled;
        checkedProps = {checked}
    }else{
        checked = checked!==undefined?checked:(defaultChecked!==undefined?defaultChecked:false);
        checkedProps = checked?{checked}:{}
    }
    const click = (e:any)=>{
        e.persist()
        e.stopPropagation()
        if(e.target.type==="radio"){
            if(radioContext){
                if(checked!==true){
                    radioContext.onChange&&radioContext.onChange(value,e.target.checked)
                }
            }else{
                onChange&&onChange(e.target.checked)
            }
        }
        return false
    }
 
    let disabledClassName = disabled?' by-radio-lable-disabled ':'';
    let checkedClassName = checked?' by-radio-lable-checked ':'';
    return <label className={'by-radio-lable '  + disabledClassName +checkedClassName} onClick={(e)=>click(e)}>
            <span className={"by-radio by-radio-"+size}>
                <input type="radio" className="by-radio-input" {...checkedProps} value={value}  name={name} readOnly  disabled={disabled}   />
                <span className="by-radio-inner"></span>
            </span>
            {props.children?<span>{props.children}</span>:""}
           
    </label>
}

export default ByRadio