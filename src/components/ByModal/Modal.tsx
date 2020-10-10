import React , {Component}from "react"
import ReactDOM from "react-dom"
import {IByModal,IByModalType} from "./interface"
import "./index.css"

class ByModal extends Component<IByModal>{
    public rootDom:HTMLDivElement|null
    public static info:(props:IByModalType)=>void
    public static error:(props:IByModalType)=>void
    public static success:(props:IByModalType)=>void
    public static warning:(props:IByModalType)=>void
    public static comfirm:(props:IByModalType)=>void
    constructor(props:IByModal){
        super(props)
        this.rootDom = document.createElement("div")
    }
    onOk = ()=>{
         this.props.onOk&&this.props.onOk()
    }
    onCanle = ()=>{  
        this.props.onCanle&&this.props.onCanle()
    }
    componentDidMount(){
        document.body.appendChild(this.rootDom as HTMLDivElement)
    }

   
    __render(){
       
        let {visible,title='this is title',children} = this.props
        console.log(visible)
        return  (
            <div className={`by-modal ${visible?'by-modal-active':'by-modal-hidden'}`}>
                <div className="by-modal-mask"></div>
                <div className="by-modal-warp">
                    <div className="by-modal-main">
                        <span className="by-modal-close-x"  onClick={()=>this.onCanle()}>×</span>
                        <div className="by-modal-main-header">
                            <span>{title}</span>
                        </div>
                        <div className="by-modal-main-content">{children}</div>
                        <div className="by-modal-main-footer"> 
                            <div>
                                <button className="by-button by-button-default" onClick={()=>this.onCanle()}>取消</button>
                                <button className="by-button by-button-default by-button-primary"  onClick={()=>this.onOk()}>确认</button>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        )
    }
    render(){
        return  ReactDOM.createPortal(this.__render(),this.rootDom as HTMLDivElement)
    }
}


export default ByModal

