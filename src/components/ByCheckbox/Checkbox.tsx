import React ,{ useState,useEffect, useContext}from 'react'
import {checkboxContext} from "./Group"
import {Ibycheckbox} from "./interface"
import "./index.css"

const ByCheckBox:React.FC<Ibycheckbox> = (props) => {
    let {
        size="small",
        value,
        indeterminate=false,
        onChange = function(){}
    } = props
    const checkboxGroup = useContext(checkboxContext)
    // 如果是分组的
    let checked = props.checked||props.defaultChecked||false;
    let name ='';
    let disabled = props.disabled||false
    if(checkboxGroup){
        checked = checkboxGroup.value.includes(value);
        disabled = checkboxGroup.disabled||false
        name = checkboxGroup.name||'checkbox';
        size = checkboxGroup.size||'small'
    }
    const [checkedVal,setCheckedVal] = useState(checked)
    const change = (e:any)=>{
        e.persist()
       
        if(checkboxGroup){
            setCheckedVal(e.target.checked)
            console.log(value)
            checkboxGroup.onChange&&checkboxGroup.onChange(value,e.target.checked)
        }else{
            if(props.checked===undefined){
                setCheckedVal(e.target.checked)
            }
            onChange&&onChange(e.target.checked)
        }
       
    }
    useEffect(()=>{
        if(props.checked!==undefined){
            setCheckedVal(props.checked)
        }
      
    },[props.checked])
    useEffect(()=>{
        if(checkboxGroup){
            let checked = checkboxGroup.value.includes(value);
            setCheckedVal(checked)
        }
    },[checkboxGroup,value])
    let inderClassName =  indeterminate?' by-checkbox-lable-indeterminate ':"";
    let disabledClassName = disabled?' by-checkbox-lable-disabled ':'';
    let checkedClassName = checkedVal?' by-checkbox-lable-checked ':'';
    return <label className={'by-checkbox-lable ' +inderClassName + disabledClassName +checkedClassName}>
            <span className={"by-checkbox by-checkbox-"+size}>
                <input type="checkbox" className="by-checkbox-input" value={value} disabled={disabled} name={name} checked={checkedVal} onChange = {(e)=>change(e)} />
                <span className="by-checkbox-inner"></span>
            </span>
            {props.children?<span>{props.children}</span>:""}
    </label>
}
export default ByCheckBox