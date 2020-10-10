import React, { ReactNode, useRef, useState, useEffect } from "react"
import "./index.css"
export type IByTabsProps = {
    activeKey:string
    children?:any
    onChange?:Function
    onClose?:Function
    [key:string]:any
}

export type IByTabsItem = {
    keys:string
    title:string|ReactNode
    closeIcon?:ReactNode
    children?:any
    [key:string]:any
}

export const ByTabsItem:React.FC<IByTabsItem> = ()=><></>
const ByTabs:React.FC<IByTabsProps> = (props:IByTabsProps)=>{

    let tabILinRef = useRef<HTMLDivElement>(null)
    let actTabIRef = useRef<HTMLDivElement>(null)
    let listTabIRef = useRef<HTMLDivElement>(null)
    let wapTabRef = useRef<HTMLDivElement>(null)
    let {children}  = props;
    let [activeKey,setActiveKey] = useState(props.activeKey)

   
    const setLinePostion = ()=>{
        let actleft = actTabIRef.current!.offsetLeft
        let lWidht = actTabIRef.current!.offsetWidth
        let warpW = wapTabRef.current!.offsetWidth;

        // 设置激活横条
        tabILinRef.current!.style.cssText=  `left:${actleft}px;width:${lWidht}px`
        // 判断是否(将要)超出可视区域
        if(actleft-(warpW-2*lWidht)>=0){
            let wleft = Math.floor((actleft-warpW)) +3*lWidht;
            listTabIRef.current!.style.cssText = `transform: translate(-${wleft}px, 0px) ;`

        }else{
            listTabIRef.current!.style.cssText = `transform: translate(0px, 0px);`

        }

    }
    
    useEffect(()=>{ 
        setActiveKey(props.activeKey)
        setLinePostion()
    },[props.activeKey])

    useEffect(()=>{
        setLinePostion()
    },[activeKey])

    // 过滤掉
    let itmeChild = children.filter((itme:any)=>{
        return itme?.type===ByTabsItem
    })

    const onClick = (keys:string,index:number)=>{
        setActiveKey(keys)
        props.onChange&&props.onChange(keys) 
    }
    return (
    <div className="by-tabs-warp">
        <div className="by-tabs-nav-warp" ref={wapTabRef}>
            <div className="by-tabs-nav-list" ref={listTabIRef}>
                {itmeChild.map((itme:any,index:number)=>{

                    let itmeProps =  itme.props;
                     return  <div  ref={itmeProps.keys===activeKey?actTabIRef:null} key={index} className={`by-tabs-nav-itme ${itmeProps.keys===activeKey?"active":''}`}>
                           <div onClick={()=>onClick(itmeProps.keys,index)}>{itmeProps.title}</div>
                           {props.onClose?<div className="by-tabs-itme-close" onClick={()=>props.onClose&&props.onClose(itmeProps.keys,index)}>×</div>:''}
                         </div>
                })}
                <div className="by-tabs-nav-line" ref={tabILinRef}></div>
            </div>
        </div>
        <div className="by-tabs-content-warp">
            <div className="by-tabs-content">
                {itmeChild.map((itme:any,key:number)=>{
                    let navClass =  itme?.props?.keys ===activeKey?'active':'';
                   return  <div key={key} className={`by-tabs-content-itme ${navClass}`}>{itme?.props.children}</div>
                })}
            </div>
        </div>
    </div>
    )  
}

export default ByTabs
