import React ,{ useState}from 'react'
import {IChexkboxGroup} from "./interface"

export const checkboxContext = React.createContext<Omit<IChexkboxGroup,'children'>|null>(null)
const ByGroupCheckbox = (props:IChexkboxGroup)=>{
    let defaultValue:any[] = props.defaultValue||[]
    const  [values] = useState(props.value||defaultValue);
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
    let contextData:IChexkboxGroup = {
        size:props.size||"small",
        name:props.name||'checkbox',
        disabled:props.disabled||false,
        onChange : change
    }
    contextData =Array.isArray(props.value)?{...contextData,value:props.value}:{...contextData,defaultValue}
   
    return <checkboxContext.Provider value={contextData}>
            <div className="by-checkbox-group">
            { props.children}
        </div>
        </checkboxContext.Provider>
}

export default ByGroupCheckbox