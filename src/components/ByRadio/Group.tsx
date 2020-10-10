import React ,{ useState,useEffect,}from 'react'
import {IbyRadioGroup} from "./interface"
export const RadioGroupContext = React.createContext<Omit<IbyRadioGroup,'children'>|null>(null)

const ByRadioGroup:React.FC<IbyRadioGroup> = (props)=>{
    let value = props.value||props.defaultValue||"";
    let [values,setValues] = useState(value);
    let change = (value:any,check:boolean)=>{
        props.onChange&&props.onChange(value,check)
        if(props.value===undefined){
            setValues(value)
        }
    }
    let contextProps = {
        value:value,
        name:props.name,
        size:props.size||"small",
        disabled:props.disabled||false,
        onChange:change
    }
    useEffect(()=>{
        setValues(value)
    },[value])
    return <RadioGroupContext.Provider value={{...contextProps,value:values}}>
            <div className="by-radio-group"> {props.children} </div>
    </RadioGroupContext.Provider>
            
}

export default ByRadioGroup