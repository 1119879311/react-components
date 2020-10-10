import React,{Fragment,useState, useContext} from "react"
import {ItreenItme,ITreeList,ITree} from "./interface"
import "./index.css"
const defalutContext = {}
const TreenContext = React.createContext<Omit<ITree,"data">>(defalutContext)
const ByTreeItem:React.FC<ItreenItme> = (props)=>{
    let treeContextData = useContext(TreenContext)

    let {  name, id, live,childrens=[]} = props;
    const togggle = ()=>{
        if(childrens&&childrens.length>0){
            treeContextData.onToggle(id,props)
        }else{
            treeContextData.onClick(id,props)
        } 
    }
    var liveLen =(live&&live.split("-").length)||1;
    let className = id===treeContextData.selectKeys?"active":'';
    let clickClassAct = treeContextData.openKeys.includes(id)?"by-select-active":""
    return (
        <Fragment> 
            <div className={`by-treen-itme ${className} ${clickClassAct}`} onClick={togggle} style={{paddingLeft:liveLen*16+'px'}}>
               {props.render? props.render(props):name }
              {childrens&&childrens.length>0?<span  className={ treeContextData.openKeys.includes(id)?"ionic-triangle ionic-triangle-up":"ionic-triangle ionic-triangle-down"}></span>:''}  
            </div>
        </Fragment>
       
    )
}

const ByTreeList:React.FC<ITreeList> = (props)=>{
    let treeContextData = useContext(TreenContext)
    let { data=[],live } = props
    live = live?live:''
    const getLive = (index:number):string=>{
        return live?live+'-'+index:index+'';
    }
  
   
     return  <Fragment>
                {
                    data.map((itme,index)=>
                        <div className={"by-treen-block  by-treen-live-"+getLive(index)} key={index}>
                            <ByTreeItem {...itme} live={getLive(index)}/>

                            { itme.childrens&&itme.childrens.length>0  
                                ?<div className={"by-treen-children"} style={{display:treeContextData.openKeys.includes(itme.id)?'block':'none'}}>
                                     <ByTreeList  data={itme.childrens} live={getLive(index)}/>
                                </div>
                                :''}
                        </div>    
                    )
                }
            </Fragment>
     
}
const ByTree:React.FC<ITree>=(props:ITree)=>{
    let data = props.data||[]
    const [selectKeys,setSelectKeys] = useState(props.selectKeys)
    const [openKeys,setOpenKeys] = useState(props.setOpenKeys||[])

    const onClick = (key:string,props:ItreenItme)=>{
        props.onClick&&props.onClick(key,props)
        setSelectKeys(key)
    }
    const onToggle =(key:string,props:ItreenItme)=>{
       
        let index = openKeys.indexOf(key)
        if(index>-1){
            openKeys.splice(index,1)
            setOpenKeys([...openKeys])
        }else{
            let resKeys = [...openKeys,key]
            setOpenKeys(resKeys)
        }
        props.onToggle&&props.onToggle(key,props)
    }
    return  <TreenContext.Provider value={{selectKeys,openKeys,onClick,onToggle}}>
                <div className="by-treen-main">
                    <ByTreeList data={data}/>
                </div>
            </TreenContext.Provider> 
 }
 
 export default ByTree
