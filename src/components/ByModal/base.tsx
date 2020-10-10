import React from "react";
import {IByModalType} from "./interface"
import "./index.css"
import ReactDOM from "react-dom";

export function modalMothodBase(props:IByModalType){
    let {
        
        typeIoc,
        type='info',
        isColse=true,
        title="this is title",
        content="this is content",
    } =props
    const modalDom = document.createElement("div") as HTMLDivElement
    const onClose = ()=>{
        modalDom.firstElementChild?.classList.remove("by-modal-active")
        modalDom.firstElementChild?.classList.add("by-modal-hidden")
        setTimeout(()=>{
            modalDom&&modalDom.remove()
        },200)
    }
    const onOk = ()=>{
        if(isColse){
           return  onClose()
        }
        props.onOk&&props.onOk(onClose)
    }
    const onCanle = ()=>{
        onClose()
        props.onCanle&&props.onCanle()
        // comfirm
    }
    let jsx =  (
        <div className="by-modal">
            <div className="by-modal-mask"></div>
            <div className="by-modal-warp">
                <div className="by-modal-main">
                    <span className="by-modal-close-x"  onClick={()=>onCanle()}>×</span>
                    <div className="by-modal-main-header">
                        {typeIoc?<span className={`by-title-ioc by-title-${type}-ioc`}>{typeIoc}</span>:""} 
                        <span>{title}</span>
                    </div>
                    <div className="by-modal-main-content">{content}</div>
                    <div className="by-modal-main-footer"> 
                        <div>
                           {type==="comfirm"?<button className="by-button by-button-default" onClick={()=>onCanle()}>取消</button>:''} 
                            <button className="by-button by-button-default by-button-primary"  onClick={()=>onOk()}>确认</button>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    )

    ReactDOM.render(jsx,modalDom)
    document.body.appendChild(modalDom)
    setTimeout(()=>{
        modalDom.firstElementChild?.classList.add("by-modal-active")
    },0)
}
