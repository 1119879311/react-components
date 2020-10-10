import React, {  useRef, useEffect } from "react"
import "./index.css"
export interface IByScroll {
    width?:number|string
    height?:number|string
    dir?:string
    speed?:number
    enterPaused?:boolean,
    children?:any
}

const ByScroll = (props:IByScroll)=>{
    let {height="30px",width="auto",dir="top",speed=300} = props
    let scrollWarp = useRef<HTMLDivElement>(null)
    const paused =function(){
        scrollWarp.current!.style['animationPlayState']="paused"
    }
    const running = function(){
        scrollWarp.current!.style['animationPlayState']="running"
    }
    useEffect(()=>{
        if(props.enterPaused){
            scrollWarp.current?.addEventListener("mouseenter",paused,false)
            scrollWarp.current?.addEventListener("mouseleave",running,false)
        }
      
    })

   
    let warpStyle = {height:height,width:width}
    let count = Array.isArray(props.children)?props.children.length*2:4
    console.log(count)
    let listStyle:object = { animation: `scroll${dir} ${speed*count}ms linear  infinite normal` }
    if(dir==="left"||dir==="right"){
        listStyle = {...listStyle,display:"inline-flex"}
    }
    return (
        <div className="by-scroll-warp" style={warpStyle} >
            <div className="by-srcoll-list" style={listStyle} ref={scrollWarp}>
                {props.children}
                {props.children}
            </div>
        </div>
    )
}
export default ByScroll