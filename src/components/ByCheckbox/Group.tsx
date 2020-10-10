import React ,{ useState,useEffect,}from 'react'
import {IChexkboxGroup} from "./interface"

export const checkboxContext = React.createContext<Omit<IChexkboxGroup,'children'>|null>(null)
const ByCheckboxGroup:React.FC<IChexkboxGroup> = (props)=>{
    let defaultValue:any[] = [];
    const  [values,setValues] = useState(props.value||props.defaultValue||defaultValue);
    const change = (name:string|number,check:boolean)=>{
      
        if(check){ //如果选中，添加
            if(!values.includes(name)){
                values.push(name)
            }
        }else{
            let index = values.indexOf(name);
            if(index>-1){
                values.splice(index,1)
            }
           
        }
        props.onChange&& props.onChange(values)
    }
    const contextData:IChexkboxGroup = {
        size:props.size||"small",
        name:props.name||'checkbox',
        value:values,
        disabled:props.disabled||false,
        onChange : change
    }
    useEffect(()=>{
        if(props.value!==undefined){
            setValues(props.value)
        } 
    },[props.value])
    
return  <checkboxContext.Provider value={contextData}>
             <div className="by-checkbox-group">
                { props.children}
            </div>
        </checkboxContext.Provider>
       
   
}
export default ByCheckboxGroup

