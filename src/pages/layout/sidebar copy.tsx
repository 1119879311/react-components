import React,{Fragment,useState} from "react"
import { useLocation,useHistory  } from 'react-router-dom'
import {LocationDescriptorObject } from "history"
import "./index.css"
interface ItreenItme {
    name:string,
    title?:string,
    pathname?:string|LocationDescriptorObject,
    hide?:boolean,
    live?:string,
    childrens?:ItreenItme[]
    onToggle?:Function,
    [key:string]:any
}
const SidebarData:ItreenItme[] = [
    {name:"home1",pathname:"/login"},
    {name:"home2",pathname:"/?id=2",
        childrens:[
            {name:"home1",pathname:"/test?id=1"},
            {name:"home2",pathname:"/?id=1"},
            {name:"home1",pathname:"/home1?id=2"},
            {name:"home3",pathname:"/home3?id=3"},

            {name:"home2",pathname:"/?id=2",
                childrens:[
                    {name:"home1",pathname:"/?id=1"},
                    {name:"home2",pathname:"/?id=2"}
                ]
            }
        ]
    },
    {name:"login",pathname:"/?from=/",
        childrens:[
            {name:"home1",pathname:"/?id=1",
                childrens:[
                    {name:"home1",pathname:"/?id=1"},
                    {name:"home1",pathname:"/?id=1"},
                    {name:"home1",pathname:"/?id=1"},
                    {name:"home1",pathname:"/?id=1"},
        
                    {name:"home2",pathname:"/?id=2",
                        childrens:[
                            {name:"home1",pathname:"/?id=1"},
                            {name:"home2",pathname:"/?id=2",
                                childrens:[
                                    {name:"home1",pathname:"/?id=1"},
                                    {name:"home1",pathname:"/?id=1"},
                                    {name:"home1",pathname:"/?id=1"},
                                    {name:"home1",pathname:"/?id=1"},
                        
                                    {name:"home2",pathname:"/?id=2",
                                        childrens:[
                                            {name:"home1",pathname:"/?id=1"},
                                            {name:"home2",pathname:"/?id=2"}
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {name:"home2",pathname:"/?id=2"}
        ]
    },


]

interface ISidebar {
    data:ItreenItme[] ,
    [key:string]:any
}

const SiderbarItme:React.FC<ItreenItme> = (props)=>{
    let {
        name,
        pathname='',
        hide = false,
        live,
        childrens=[],
    } = props;

    let getPathName = useLocation().pathname+useLocation().search;
    let history = useHistory();
   
    const togggle = ()=>{
        if(childrens&&childrens.length>0){
            props.onToggle&&props.onToggle(!hide)
        }else{
            pathname&&getPathName!==pathname&&history.push(pathname)
        }
       
       
    }
    var liveLen =(live&&live.split("-").length)||1;
    let className = hide||getPathName===pathname?"by-treen-itme active":'by-treen-itme';
    className = childrens&&childrens.length>0?className+' by-treen-parent ':className;
    return (
        <Fragment> 
            <div className={className} onClick={togggle} style={{paddingLeft:liveLen*16+'px'}}>
                {name}
              {childrens&&childrens.length>0?<span  className={ hide?"ionic-triangle ionic-triangle-up":"ionic-triangle ionic-triangle-down"}></span>:''}  
            </div>
        </Fragment>
       
    )
}
function resetItmeHide(data:ItreenItme[]):ItreenItme[]{
    return data.map(itme=>{
        itme.hide = false
        itme.childrens&&itme.childrens.length>0&&resetItmeHide(itme.childrens)
        return itme
    });
}
const BySider:React.FC<ISidebar> = (props)=>{
    let { data,live } = props
    live = live?live:''
    let [datas,setDatas] = useState(data)
  
    const onToggle = (hides:boolean,index:number)=>{
        // initLoading = ()=>{};
       var datanew = datas.map((itme,idx)=>{
            if(idx===index){
                itme.hide = hides
            }else{
                itme.hide = false
                itme.childrens = itme.childrens&&resetItmeHide(itme.childrens)
            }
           return itme
       })
       setDatas(datanew)
    }

    
    const getLive = (index:number):string=>{
        return live?live+'-'+index:index+'';
    }

     return  <Fragment>
                {
                    datas.map((itme,index)=>
                        <div className={"by-treen-block  by-treen-live-"+getLive(index)} key={index}>
                            <SiderbarItme onToggle={(e:boolean)=>onToggle(e,index)} {...itme} live={getLive(index)}/>
                            { itme.childrens&&itme.childrens.length>0  
                                ?<div className={"by-treen-children"} style={{display:itme.hide?'block':'none'}}>
                                     <BySider  data={itme.childrens} live={getLive(index)}/>
                                </div>
                                :''}
                        </div>    
                    )
                }
            </Fragment>
     
}


const Sidebar:React.FC<{}>=(props)=>{
    return  <div className="by-treen-main">
                <BySider data={SidebarData}/>
          </div>
 }
 
 export default Sidebar
