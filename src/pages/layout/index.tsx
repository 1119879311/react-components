import React from "react"
import  Sidebar from "./sidebar"
import HeaderCpt from "./Header"
import "./index.css"
const Layout:React.FC<{}>=({children})=>{
    return (
        <div className="by-layout-main">
            <div className="by-layout-header">
                <HeaderCpt />
            </div>
            <div className="by-layout-sidebar">
                 <Sidebar/>
            </div>
            <div className="by-layout-content">
                {
                    children?children:''
                }
            </div>
        </div>
    )
}

export default Layout