import "./index.css"
import { ReactNode } from "react";
import ReactDOM from "react-dom";
import React from "react";
export interface IMessageProps{
    msg?:string|ReactNode,
    timer?:number
}
interface Iredner extends IMessageProps{
    type:string,
    typeIoic:string|ReactNode,
}

class ByMessage{
    protected static rootMessage:HTMLDivElement|null = null
    protected static domeArr:Array<HTMLDivElement> = []
    protected static config:IMessageProps = {
        msg:"这是一个提示",
        timer:1500   
    }
    protected static colse(dome:HTMLDivElement){
        dome.classList.remove("by-message-active")
        dome.classList.add("by-message-hide")
        setTimeout(()=>{
            this.rootMessage&&this.rootMessage.removeChild(dome)
        },600)
    }
    private static __renderIoic(typeIoic:string|ReactNode) {
        return <span className="by-message-ionic">{typeIoic}</span>
    }
    protected static __render(props:Iredner){
        let {type,typeIoic,msg,timer} = props
        if(this.rootMessage===null){
            this.rootMessage = document.createElement("div");
            this.rootMessage.classList.add("by-message-root")
            document.body.appendChild(this.rootMessage)  
        }
        let dome = document.createElement("div")
        let jsx = (
                <div className={`by-message message-${type}`}>
                    {typeIoic}
                    <div className="by-message-text">{msg}</div>
                </div>
        )
        ReactDOM.render(jsx,dome)
        this.rootMessage.appendChild(dome)  
        dome.classList.add('by-message-wrap',"by-message-active")
        if(timer!==0){
            setTimeout(()=>{
                this.colse(dome)
            },timer)
        }else{
            this.domeArr.push(dome)
        } 
    }
    
    public static setConfig(prorps:IMessageProps){
        this.config = {...this.config,...prorps}
    }

    public static info(props?:IMessageProps){
        this.__render({...this.config,...props,type:"info",typeIoic:this.__renderIoic('i')})
    }
    public static success(props?:IMessageProps){
        this.__render({...this.config,...props,type:"success",typeIoic:this.__renderIoic('√')})
    }
    public static error(props?:IMessageProps){
        this.__render({...this.config,...props,type:"error",typeIoic:this.__renderIoic('×')})
    }
    public static warning(props?:IMessageProps){
        this.__render({...this.config,...props,type:"warning",typeIoic:this.__renderIoic('!')})
    }
    public static loading(props?:IMessageProps){
        this.__render({...this.config,...props,type:"loading",typeIoic:(<div className="by-message-ionic by-message-loading"></div>)})
    }
    public static hide(){
        if(this.domeArr.length<=0) return
        this.domeArr.splice(0).forEach(itme=>this.colse(itme))
    }

    
}
export default ByMessage
